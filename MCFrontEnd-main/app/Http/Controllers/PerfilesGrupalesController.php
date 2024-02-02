<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use stdClass;

class PerfilesGrupalesController extends Controller
{
    public function readOne(Request $request, $nombre = null) {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        $perfilGrupal = null;
        $client = new Client(['verify' => false]);

        $uuid = $request->query('id');
        $customUrl = $nombre;

        if (strlen($uuid) <= 0 && is_null($customUrl)) {
            return Inertia::render('Error/Error404', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        if (is_null($uuid)) {
            try {
                $request = $client->request('GET', env('API_BASE')."/api/perfil/grupal/x/{$customUrl}");
                $perfilGrupal = json_decode($request->getBody()->getContents());
            } catch (\GuzzleHttp\Exception\BadResponseException $e) {
                $response = $e->getResponse();
                $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();
    
                return Inertia::render('Error/Error404', [
                    "auth" => [
                        "user" => $user,
                        'message' => $message,
                    ],
                ]);
            } catch (\Throwable $th) {
                return Inertia::render('Error/Error404', [
                    "auth" => [
                        "user" => $user,
                        'message' => $th->getMessage(),
                    ],
                ]);
            }
        } else {
            try {
                $request = $client->request('GET', env('API_BASE')."/api/perfil/grupal/{$uuid}");
                $perfilGrupal = json_decode($request->getBody()->getContents());
            } catch (\GuzzleHttp\Exception\BadResponseException $e) {
                $response = $e->getResponse();
                $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

                return Inertia::render('Error/Error404', [
                    "auth" => [
                        "user" => $user,
                        'message' => $message,
                    ],
                ]);
            } catch (\Throwable $th) {
                return Inertia::render('Error/Error404', [
                    "auth" => [
                        "user" => $user,
                        'message' => $th->getMessage(),
                    ],
                ]);
            }
        }

        if (is_null($perfilGrupal) || $perfilGrupal->success == false)
            return Inertia::render('Error/Error404', [ "auth" => [ "user" => $user, "response" => $perfilGrupal ] ]);

        return Inertia::render('PerfilesGrupales/index', [ "auth" => [ "user" => $user ], 'perfilGrupal' => $perfilGrupal->response]);
    }

    public function readAll(): \Illuminate\Http\JsonResponse
    {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfiles/grupales");
            $perfilGrupal = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $perfilGrupal,
                'message' => 'Perfiles grupales obtenidos correctamente.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function readSessionOne($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfil/grupal/sesion/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function getFollow(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) && is_null(session("mc_publico_group_profile_guid")))
            return response()->json([
                'success' => true,
                'response' => false
            ]);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        $perfilGrupalId = $this->getPerfilPublico($user->perfiles_grupales_data)->id ?? null;

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'seguidorId' => is_null($perfilGrupalId) ? $user->perfil_data->id : $perfilGrupalId,
                        'seguidoId' => $decodedRequest->seguidoId,
                    ])
                ]
            ];

            if (is_null($perfilGrupalId)) {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/following/grupal", $body);
            } else {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/grupal/following/grupal", $body);
            }

            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message;

            return response()->json([
                "success" => false,
                "message" => $message,
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], $th->getCode());
        }
    }

    public function giveFollow(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) && is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        $perfilGrupalId = $this->getPerfilPublico($user->perfiles_grupales_data)->id ?? null;

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'seguidorId' => is_null($perfilGrupalId) ? $user->perfil_data->id : $perfilGrupalId,
                        'seguidoId' => $decodedRequest->seguidoId,
                    ])
                ]
            ];
            
            if (is_null($perfilGrupalId)) {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/follow/grupal", $body);
            } else {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/grupal/follow/grupal", $body);
            }

            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? "";

            return response()->json([
                "success" => false,
                "message" => $message
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], $th->getCode());
        }
    }

    public function editProfilePhoto(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) || is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

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

        try {

            if (!isset($request->file))
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no válido'
                ]);

            $file = $request->file;
            $path = storage_path() . "/" . "app" . "/" . $file->store('group_profile_pictures/' . $file->getClientOriginalName());

            $body = [
                'multipart' => [
                    [
                        'name'     => 'profile_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ],
            ];

            $request = $client->request('POST', env('API_BASE')."/api/perfil/grupal/foto/{$newPerfilGrupal->id}", $body);
            $response = json_decode($request->getBody()->getContents());

            File::delete($path);

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la imagen de perfil',
                'data' => null,
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function getProfilePhoto($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfil/grupal/foto/{$id}");
            $response = $request->getBody()->getContents();

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    /*EDICION DATOS GENERALES*/
    public function update(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) || is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;
        $uuid = session("mc_publico_group_profile_guid");

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);
        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'guid' => $uuid,
                        'alias' => $decodedRequest->alias,
                        'frase' => $decodedRequest -> frase,
                        'activo' => true,
                        'url' => $decodedRequest->url,
                        'esPublico' => true
                    ])
                ]
            ];
            $request = $client->request('PUT', env('API_BASE')."/api/perfil/grupal/editar/{$uuid}", $body);
            $response = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }
    /*EDICION URL VIDEO GENERAL*/
    public function updateUrlVideo(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) || is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;
        $uuid = session("mc_publico_group_profile_guid");

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);
        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'guid' => $uuid,
                        'urlVideoPrincipal' => $decodedRequest->urlVideoPrincipal
                    ])
                ]
            ];
            $request = $client->request('PUT', env('API_BASE')."/api/perfil/grupal/editar/urlvideo/{$uuid}", $body);
            $response = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }
    /*EDICION URL VIDEO GENERAL*/
    /*ACTUALIZACION REDES SOCIALES*/
    public function updateRsss(Request $request) {

        $user = Auth::user()->id ?? null;

        if (is_null($user) || is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

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

        $perfilGrupalId =  $newPerfilGrupal->id;
        $decodedRequest = json_decode($request->data);
        foreach ($decodedRequest as &$item) {
             $item->perfilGrupalId = $perfilGrupalId;
         }
        try {
            $body = [
                'json' => [
                    'data' => json_encode($decodedRequest)
                ]
            ];
            $request = $client->request('POST', env('API_BASE')."/api/perfil/grupal/updateRrssGrupal", $body);
            $response = json_decode($request->getBody()->getContents());
            return $response;
            //return $body;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    /*FIN ACTUALIZACION REDES SOCIALES*/

    public function editCoverPhoto (Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user) || is_null(session("mc_publico_group_profile_guid")))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $file = $request->file('file');

        $perfilesGrupales = $user->perfiles_grupales_data;

        /**  */
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

        try {

            if (!isset($request->file))
                return response()->json([
                    'success' => false,
                    'message' => 'Archivo no válido'
                ]);

            $file = $request->file;
            $path = storage_path() . "/" . "app" . "/" . $file->store('group_profile_pictures/' . $file->getClientOriginalName());

            $body = [
                'multipart' => [
                    [
                        'name'     => 'profile_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ],
            ];

            $request = $client->request('POST', env('API_BASE')."/api/perfil/grupal/foto/portada/{$newPerfilGrupal->id}", $body);
            $response = json_decode($request->getBody()->getContents());

            File::delete($path);

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la imagen de portada',
                'data' => null,
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function getCoverPhoto($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfil/grupal/foto/portada/{$id}");
            $response = $request->getBody()->getContents();

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    protected function getPerfilPublico($perfilesGrupales): stdClass
    {
        if (is_null(session("mc_publico_group_profile_guid")) || count($perfilesGrupales) <= 0) {
            return (object) [];
        }

        $perfilGrupal = array_map(function ($perfilGrupalRow) {
            if ($perfilGrupalRow->guid == session("mc_publico_group_profile_guid"))
                return $perfilGrupalRow;
            else
                unset($perfilGrupalRow);
        }, $perfilesGrupales);

        $newPerfilGrupal = (object) [];

        foreach ($perfilGrupal as $perfilGrupalRow)
            if (is_null($perfilGrupalRow))
                unset($perfilGrupalRow);
            else
                $newPerfilGrupal = $perfilGrupalRow;

        return $newPerfilGrupal;
    }

    public function showSettings(): \Inertia\Response
    {
        $user = Auth::user()->id ?? null;

        if (is_null($user) && is_null(session("mc_publico_group_profile_guid"))) {
            return Inertia::render('Error/Error419', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        $user = (object) $user;

        $client = new Client(["verify" => false]);

        $perfilGrupalId = $this->getPerfilPublico($user->perfiles_grupales_data)->id ?? null;

        if (is_null($perfilGrupalId)) {
            return Inertia::render('Error/Error419', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        try {
            $httpRequest = $client->request('GET', env('API_BASE') . "/api/perfil-grupal/for-settings/{$perfilGrupalId}");
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return Inertia::render('Error/Error404', [
                "auth" => [
                    "message" => $message,
                ],
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('Error/Error419', [
                "auth" => [
                    "message" => $th->getMessage(),
                ],
            ]);
        }

        $response = json_decode($httpRequest->getBody()->getContents());

        return Inertia::render('PerfilesGrupales/ConfiguracionPerfil', [
            "auth" => [
                "user" => $user,
                "perfil" => $response->response,
            ],
        ]);
    }

    public function updateV2(Request $request): JsonResponse
    {
        $user = Auth::user()->id ?? null;

        $unauthorized = is_null($user)
            && is_null(session("mc_publico_group_profile_guid"));

        if ($unauthorized) {
            return response()->json([
                'message' => 'unauthorized',
            ], 419);
        }

        $user = (object) $user;

        $perfilGrupalId = $this->getPerfilPublico($user->perfiles_grupales_data)->id ?? null;

        if (is_null($perfilGrupalId)) {
            return response()->json([
                'message' => 'unauthorized',
            ], 419);
        }

        $client = new Client(['verify' => false]);
        
        $body = ['json' => (array) $request->all()];

        $customUrl = UtilsController::hyphenize($request->customUrl);
        $body['json']['customUrl'] = $customUrl;
        $body['json']['url'] = UtilsController::hyphenize($request->alias);

        if (strlen($request->urlFacebook) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 1,
                "url" => $request->urlFacebook,
            ];
        }

        if (strlen($request->urlInstagram) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 2,
                "url" => $request->urlInstagram,
            ];
        }

        if (strlen($request->urlTwitter) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 3,
                "url" => $request->urlTwitter,
            ];
        }

        if (strlen($request->urlTiktok) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 4,
                "url" => $request->urlTiktok,
            ];
        }

        if (strlen($request->urlWhatsApp) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 5,
                "url" => $request->urlWhatsapp,
            ];
        }

        if (strlen($request->urlLinkedin) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilGrupalId" => $perfilGrupalId,
                "catalogoRedesSocialesId" => 6,
                "url" => $request->urlLinkedin,
            ];
        }

        try {
            $request = $client->request('PUT', env('API_BASE') . "/api/perfil-grupal/{$perfilGrupalId}", $body);
            $response = json_decode($request->getBody()->getContents());

            return response()->json([
                'success' => true,
                'response' => $response,
            ]);
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
}
