<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use GuzzleHttp\Client;
use App\Http\Controllers\UtilsController;
use Illuminate\Http\JsonResponse;

class PublicacionesController extends Controller
{
    public function showOne($url) {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        $publicacion = $this->readOneByUrl($url);

        if (isset($publicacion->original) || !isset($publicacion->response)) 
            return Inertia::render('Inicio', []);

        $perfil = $publicacion->response->perfil ?? (object) [];
        $usuario = $publicacion->response->usuario ?? (object) [];
        $perfil->eventos = $publicacion->response->eventos ?? [];

        unset($publicacion->response->perfil);
        unset($publicacion->response->usuario);

        return Inertia::render('Publicaciones/index', [
            'publicacion' => $publicacion->response,
            'perfil' => $perfil,
            'usuario' => $usuario,
            "auth" => [ "user" => $user ]
        ]);
    }

    public function readAll($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/publicaciones/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function readOne($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/publicacion/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function readOneByUrl($url) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/publicacion/by/url/{$url}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'data' => null,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function create(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        if (strlen(trim($decodedRequest->titulo)) <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Titulo no puede estar vacío'
            ], 400);
        }

        $body = [
            'json' => [
                'data' => json_encode([
                    'usuarioId' => $user->id,
                    'perfilId' => $user->perfil_data->id,
                    'catalogoPublicacionId' => $decodedRequest->catalogoPublicacionId,
                    'titulo' => $decodedRequest->titulo,
                    'descripcion' => $decodedRequest->descripcion,
                    'contenido' => $decodedRequest->contenido,
                    'activo' => true,
                    'url' => UtilsController::hyphenize($decodedRequest->titulo),
                    'fechaInicio' => $decodedRequest->fechaInicio,
                    'fechaFin' => $decodedRequest->fechaFin,
                    'fechaCreacion' => Carbon::now('UTC'),
                    'imagenPublicacion' => $decodedRequest->imagenPublicacion
                ])
            ]
        ];

        try {
            $request = $client->request('POST', env('API_BASE')."/api/publicacion", $body);
            $response = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $id) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $retrievedRow = $this->readOne($id)->response;

        $decodedRequest = json_decode($request->data);

        if (strlen(trim($decodedRequest->titulo)) <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Titulo no puede estar vacío'
            ], 400);
        }

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'usuarioId' => $user->id,
                        'perfilId' => $user->perfil_data->id,
                        'catalogoPublicacionId' => $retrievedRow->catalogoPublicacion->id,
                        'titulo' => $decodedRequest->titulo,
                        'descripcion' => $decodedRequest->descripcion,
                        'contenido' => $decodedRequest->contenido,
                        'activo' => $retrievedRow->activo,
                        'url' => UtilsController::hyphenize($decodedRequest->titulo),
                        'fechaInicio' => $decodedRequest->fechaInicio,
                        'fechaFin' => $decodedRequest->fechaFin,
                        'fechaCreacion' => $retrievedRow->fechaCreacion,
                        'imagenPublicacion' => isset($decodedRequest->imagenPublicacion) ? $decodedRequest->imagenPublicacion : $retrievedRow->imagenPublicacion
                    ])
                ]
            ];
            $request = $client->request('PUT', env('API_BASE')."/api/publicacion/{$id}", $body);
            $response = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);
            
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function delete($id) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('DELETE', env('API_BASE')."/api/publicacion/{$id}");
            $response = json_decode($request->getBody()->getContents());
            return response()->json([
                'success' => true,
                'response' => $response,
            ]);
            
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function createImage(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

        if (!isset($request->file)) {
            return response()->json([
                'success' => false,
                'message' => 'Archivo no válido'
            ]);
        }

        $file = $request->file;
        $path = storage_path() . "/" . "app" . "/" . $file->store("/" . "temp" . "/" . $file->getClientOriginalName());

        try {
            $body = [
                'multipart' => [
                    [
                        'name'     => 'publicacion_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ]
            ];

            $request = $client->request('POST', env('API_BASE') . "/api/publicacion/imagen", $body);
            $response = json_decode($request->getBody()->getContents());

            File::delete($path);

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function readImage($path) {
        return env('API_BASE') . "/api/publicacion/imagen/" . $path;
    }

    public function createPublicacionImage(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

        if (!isset($request->file)) {
            return response()->json([
                'success' => false,
                'message' => 'Archivo no válido'
            ]);
        }

        $file = $request->file;
        $path = storage_path() . "/" . "app" . "/" . $file->store("/" . "temp" . "/" . $file->getClientOriginalName());

        try {
            $body = [
                'multipart' => [
                    [
                        'name'     => 'publicacion_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/publicacion/portada/imagen", $body);
            $response = json_decode($request->getBody()->getContents());

            // File::delete($path);

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                'success' => false,
                'message' => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function createForApoyoPrecandidatura(Request $request): JsonResponse
    {
        $user = Auth::user()->id ?? null;

        if (is_null($user)) {
            return response()->json([
                'message' => 'unauthorized',
            ], 419);
        }

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        if (strlen(trim($request->titulo)) <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Titulo no puede estar vacío'
            ], 400);
        }

        $body = [
            'json' => [
                'data' => json_encode([
                    'usuarioId' => $user->id,
                    'perfilId' => $user->perfil_data->id,
                    'catalogoPublicacionId' => 4,
                    'titulo' => $request->titulo,
                    'descripcion' => $request->descripcionTarjeta,
                    'contenido' => "",
                    'activo' => true,
                    'url' => UtilsController::hyphenize($request->titulo),
                    'fechaInicio' => Carbon::now('UTC'),
                    'fechaFin' => Carbon::now('UTC'),
                    'fechaCreacion' => Carbon::now('UTC'),
                    'imagenPublicacion' => $request->imagenEvento
                ])
            ]
        ];

        try {
            $request = $client->request('POST', env('API_BASE') . "/api/publicacion", $body);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                'success' => false,
                'message' => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }

        $response = json_decode($request->getBody()->getContents());

        return response()->json([
            'success' => true,
            'response' => $response,
        ]);
    }
}
