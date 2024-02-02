<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class PerfilPrecandidaturaController extends Controller
{
    /**
     * TODO:
     * 
     * Mover logica de consulta y auto mapper a dashboard
     */
    public function update(int $id, Request $request): JsonResponse
    {
        $client = new Client(["verify" => false]);

        try {
            $httpRequest = $client->request('GET', env('API_BASE') . "/api/precandidaturas/perfil-precandidatura/{$id}");
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        } catch (\Throwable $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 500);
        }

        $perfilPrecandidatura = json_decode($httpRequest->getBody()->getContents())->response;

        // Se crea auto mapper para update
        $bodyRequest = (array) $request->all();
        $body = [
            "json" => (array) $perfilPrecandidatura,
        ];

        foreach ($perfilPrecandidatura as $column => $_) {
            if (array_key_exists($column, $bodyRequest)) {
                $body["json"][$column] = $bodyRequest[$column];
            }
        }

        try {
            $httpRequest = $client->request('PUT', env('API_BASE') . "/api/precandidaturas/perfil-precandidatura/{$id}", $body);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        }

        $response = json_decode($httpRequest->getBody()->getContents())->response;

        return response()->json([
            "success" => true,
            "message" => $response,
        ]); 
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        $user = Auth::user()->id ?? null;

        if (is_null($user)) {
            return response()->json([
                'message' => 'unauthorized',
            ], 419);
        }

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        if (!isset($request->file)) {
            return response()->json([
                'success' => false,
                'message' => 'Archivo no válido'
            ]);
        }

        $file = $request->file;

        try {
            $path = storage_path() . "/" . "app" . "/" . $file->store('temp/' . $file->getClientOriginalName());
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }

        $body = [
            'multipart' => [
                [
                    'name' => 'profile_image',
                    'contents' => fopen($path, 'r'),
                ],
            ],
        ];

        try {
            $request = $client->request('POST', env('API_BASE') . "/api/precandidaturas/perfil-precandidatura/imagen-perfil", $body);

            File::delete($path);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        } catch (\Throwable $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 500);
        }

        $response = json_decode($request->getBody()->getContents());

        return response()->json([
            "success" => true,
            "response" => $response->response ?? $response,
        ]);
    }
}
