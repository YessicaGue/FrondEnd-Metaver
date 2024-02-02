<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class OchoAccionesController extends Controller
{
    public function index(): \Inertia\Response {
        try {
            $user = Auth::user()->id;
        } catch (\Throwable $th) {
            $user = null;
        }

        return Inertia::render('OchoAcciones/index', [ "auth" => [ "user" => $user ] ]);
    }

    public function getCatalogos() {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/registroOchoAcciones/get/catalogos");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function create(Request $request) {
        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'nombre' => $decodedRequest->nombre,
                        'apellidoPaterno' => $decodedRequest->apellidoPaterno,
                        'apellidoMaterno' => $decodedRequest->apellidoMaterno,
                        'direccion' => $decodedRequest->direccion,
                        'fechaNacimiento' => $decodedRequest->fechaNacimiento,
                        'generoId' => $decodedRequest->generoId,
                        'escolaridadId' => $decodedRequest->escolaridadId,
                        'motivoId' => $decodedRequest->motivoId,
                        'accionIds' => $decodedRequest->accionIds,
                        'habilidadIds' => $decodedRequest->habilidadIds,
                        'interesIds' => $decodedRequest->interesIds,
                        'entidadFederativaId' => $decodedRequest->entidadFederativaId,
                        'preguntas' => $decodedRequest->preguntas,
                    ])
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/registroOchoAcciones", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function getEntidad($estado) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/entidadFederativa/by/name/{$estado}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }
}
