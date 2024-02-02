<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Client;
use App\Http\Controllers\UtilsController;

class PublicacionesPerfilesGrupalesController extends Controller
{
    public function showOne($url) {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        $publicacion = $this->readOneByUrl($url);

        if (isset($publicacion->original) || !isset($publicacion->response))
            return Inertia::render('Inicio', []);

        $perfil = $publicacion->response->perfilGrupal;
        $usuario = $publicacion->response->usuario;

        if (!is_null($perfil)) {
            $perfil->eventos = $publicacion->response->eventos;
        }

        unset($publicacion->response->perfilGrupal);
        unset($publicacion->response->usuario);

        return Inertia::render('PublicacionesGrupales/index', [
            'publicacion' => $publicacion->response,
            'perfil' => $perfil,
            'usuario' => $usuario,
            "auth" => [ "user" => $user ]
        ]);
    }

    public function readAll($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/publicaciones/grupal/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function leerTodos($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/publicaciones/grupal/leer/todos/{$id}");
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
            $request = $client->request('GET', env('API_BASE')."/api/publicacion/grupal/{$id}");
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
            $request = $client->request('GET', env('API_BASE')."/api/publicacion/grupal/by/url/{$url}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function create(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

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
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $perfilGrupal = $perfilGrupal[0];

        $client = new Client(['verify' => false]);

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
                        'usuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? $user->id : null,
                        'perfilUsuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? null : $user->id,
                        'perfilGrupalId' => $newPerfilGrupal->id,
                        'catalogoPublicacionPerfilGrupalId' => $decodedRequest->catalogoPublicacionPerfilGrupalId,
                        'titulo' => $decodedRequest->titulo,
                        'descripcion' => $decodedRequest->descripcion,
                        'contenido' => $decodedRequest->contenido,
                        'activo' => true,
                        'url' => UtilsController::hyphenize($decodedRequest->titulo),
                        'fechaInicio' => $decodedRequest->fechaInicio,
                        'fechaFin' => $decodedRequest->fechaFin,
                        'urlMovimientoSocial' => !empty($decodedRequest->urlMovimientoSocial) ? $decodedRequest->urlMovimientoSocial : null,
                        'fechaCreacion' => Carbon::now('UTC'),
                        'imagenPublicacion' => isset($decodedRequest->imagenPublicacion) ? $decodedRequest->imagenPublicacion : ''
                    ])
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/publicacion/grupal", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage(),
            ], 500);
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
                        'usuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? $user->id : null,
                        'perfilUsuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? null : $user->id,
                        'perfilGrupalId' => $retrievedRow->perfilGrupal->id,
                        'catalogoPublicacionPerfilGrupalId' => $retrievedRow->catalogoPublicacionPerfilGrupal->id,
                        'titulo' => $decodedRequest->titulo,
                        'descripcion' => $decodedRequest->descripcion,
                        'contenido' => $decodedRequest->contenido,
                        'activo' => $retrievedRow->activo,
                        'url' => UtilsController::hyphenize($decodedRequest->titulo),
                        'fechaInicio' => $decodedRequest->fechaInicio,
                        'fechaFin' => $decodedRequest->fechaFin,
                        'urlMovimientoSocial' => !empty($decodedRequest->urlMovimientoSocial) ? $decodedRequest->urlMovimientoSocial : $retrievedRow->urlMovimientoSocial,
                        'fechaCreacion' => $retrievedRow->fechaCreacion,
                        'imagenPublicacion' => isset($decodedRequest->imagenPublicacion) ? $decodedRequest->imagenPublicacion : $retrievedRow->imagenPublicacion
                    ])
                ]
            ];

            $request = $client->request('PUT', env('API_BASE')."/api/publicacion/grupal/{$id}", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage(),
            ], 500);
        }
    }

    public function delete($id) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $retrievedRow = $this->readOne($id)->response;

        try {
            $body = [
                'json' => [
                    'usuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? $user->id : null,
                    'perfilUsuarioId' => is_null(session("mc_publico_not_dashboard_profile")) ? null : $user->id,
                    'perfilGrupalId' => $retrievedRow->perfilGrupal->id,
                    'catalogoPublicacionPerfilGrupalId' => $retrievedRow->catalogoPublicacionPerfilGrupal->id,
                    'titulo' => $retrievedRow->titulo,
                    'descripcion' => $retrievedRow->descripcion,
                    'contenido' => $retrievedRow->contenido,
                    'activo' => false,
                    'fechaInicio' => $retrievedRow->fechaInicio,
                    'fechaFin' => $retrievedRow->fechaFin,
                    'fechaCreacion' => $retrievedRow->fechaCreacion,
                    'urlMovimientoSocial' => $retrievedRow->urlMovimientoSocial,
                    'imagenPublicacion' => $retrievedRow->imagenPublicacion
                ]
            ];

            $request = $client->request('DELETE', env('API_BASE')."/api/publicacion/grupal/{$id}", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
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

        try {

            if (!isset($request->file))
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no válido'
                ]);

            $file = $request->file;
            $path = storage_path() . "/" . "app" . "/" . $file->store("/" . "temp" . "/" . $file->getClientOriginalName());

            $body = [
                'multipart' => [
                    [
                        'name'     => 'publicacion_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/publicacion/grupal/imagen", $body);
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
        return env('API_BASE') . "/api/publicacion/grupal/imagen/" . $path;
    }

    public function createPublicacionImage(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

        try {

            if (!isset($request->file))
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no válido'
                ]);

            $file = $request->file;
            $path = storage_path() . "/" . "app" . "/" . $file->store("/" . "temp" . "/" . $file->getClientOriginalName());

            $body = [
                'multipart' => [
                    [
                        'name'     => 'publicacion_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/publicacion/grupal/portada/imagen", $body);
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
}
