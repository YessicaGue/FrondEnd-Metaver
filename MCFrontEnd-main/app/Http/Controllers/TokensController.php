<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TokensController extends Controller
{
    public function read(Request $request) {
        $client  = new Client(['verify' => false]);

        $usuarioId = $request->query('perfil');
        $catalogoTokenId = $request->query('tokentype');

        if ($catalogoTokenId != 1 && $catalogoTokenId != 3)
            return response()->json([
                'message' => 'not valid'
            ]);

        try {
            if ($catalogoTokenId == 1)
                $request = $client->request('GET', env('API_BASE')."/api/token/by/{$usuarioId}/{$catalogoTokenId}");
            else
                $request = $client->request('GET', env('API_BASE')."/api/token/grupal/by/{$usuarioId}/{$catalogoTokenId}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents()) ?? $e->getMessage();

            return response()->json([
                'success' => false,
                'message' => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getCode(),
            ], 500);
        }
    }

    public function create(Request $request) {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        if (is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ], "errors" => [ "message" => "unauthorized" ]]);

        $user = (object) $user;

        if (!is_null(session("mc_publico_group_profile_guid"))) {
            $perfilesGrupales = $user->perfiles_grupales_data;

            $perfilGrupal = array_map(function ($perfilGrupalRow) {
                if ($perfilGrupalRow->guid == session("mc_publico_group_profile_guid"))
                    return $perfilGrupalRow;
                else
                    unset($perfilGrupalRow);
            }, $perfilesGrupales);

            $newPerfilGrupal = $perfilGrupal;

            foreach ($perfilGrupal as $perfilGrupalRow)
                if (is_null($perfilGrupalRow))
                    unset($perfilGrupalRow);
                else
                    $newPerfilGrupal = $perfilGrupalRow;

            if (count($perfilGrupal) <= 0)
                return Inertia::render('Inicio', [ "auth" => [ "user" => $user ], "errors" => [ "message" => "unauthorized" ]]);

        }

        $client  = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        try {
            $body = [
                'json' => [
                    'data' => [
                        'catalogoTokenId' => is_null(session("mc_publico_group_profile_guid")) ? $decodedRequest->tokenId : 3,
                        'stringifiedToken' => $decodedRequest->token,
                        'fechaCreacion' => Carbon::now(),
                        'fechaActualizacion' => Carbon::now(),
                    ]
                ]
            ];

            if (isset($decodedRequest->expiration)) {
                $body['json']['data']['expirable'] = true;
                $body['json']['data']['segundosExpira'] = $decodedRequest->expiration;
            }

            $body['json']['data'] = json_encode($body['json']['data']);
            
            if (is_null(session("mc_publico_group_profile_guid")))
                $request = $client->request('POST', env('API_BASE')."/api/token/store/{$user->perfil_data->id}", $body);
            else
                $request = $client->request('POST', env('API_BASE')."/api/token/perfil-grupal/store/{$newPerfilGrupal->id}", $body);

            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function refresh(): void
    {
        $client = new Client([ 'verify' => false ]);

        try {
            $call = $client->request('GET', env('API_BASE') . "/api/tokens/expired");
            $response = json_decode($call->getBody()->getContents())->response;
        } catch (\Throwable $th) {
            $my_file = storage_path() . '/logs/file.txt';
            $handle = fopen($my_file, 'a');
            fwrite($handle, "cannot get list: " . $th->getMessage());

            return;
        }

        foreach ($response as $token) {
            $rawToken = json_decode($token->stringifiedToken);
            $longLivedToken = $rawToken->longLivedToken;

            $params = [
                'query' => [
                    'access_token' => $longLivedToken->access_token,
                    'grant_type' => 'ig_refresh_token',
                ],
            ];

            try {
                $call = $client->request('GET', "https://graph.instagram.com/refresh_access_token", $params);
                $response = json_decode($call->getBody()->getContents());
            } catch (\Throwable $th) {
                $my_file = storage_path() . '/logs/file.txt';
                $handle = fopen($my_file, 'a');
                fwrite($handle, $th->getMessage());

                continue;
            }

            $rawToken->longLivedToken = $response;
            $token->stringifiedToken = json_encode($rawToken);
            $token->segundosExpira = $response->expires_in;

            $body = [
                "json" => [
                    "data" => json_encode($token),
                ],
            ];

            try {
                $call = $client->request('PUT', env('API_BASE') . "/api/token/{$token->id}", $body);
                
                $my_file = storage_path() . '/logs/file.txt';
                $handle = fopen($my_file, 'a');
                fwrite($handle, "updated: " . json_encode($call->getBody()->getContents()));
                return;
            } catch (\Throwable $th) {
                $my_file = storage_path() . '/logs/file.txt';
                $handle = fopen($my_file, 'a');
                fwrite($handle, $th->getMessage());

                continue;
            }
        }
    }
}
