<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use stdClass;
use App\Http\Controllers\UtilsController;

class PerfilesController extends Controller
{
    public function readOne(Request $request, $nombre = null) {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        $perfil = null;
        $client = new Client(['verify' => false]);

        $uuid = $request->query('id') ?? null;
        $customUrl = $nombre;

        if (is_null($uuid) && is_null($customUrl)) {
            return Inertia::render('Error/Error404', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        if (is_null($uuid)) {
            try {
                $request = $client->request('GET', env('API_BASE')."/api/perfil/x/{$customUrl}");
                $perfil = json_decode($request->getBody()->getContents());
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
                $request = $client->request('GET', env('API_BASE')."/api/perfil/{$uuid}");
                $perfil = json_decode($request->getBody()->getContents());
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

        if (is_null($perfil) || $perfil->success == false) {
            return Inertia::render('Error/Error404', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        /** JG - 20230906 - Actualizacion de activacion de publicaciones */
        try {
            $client->request('GET', env('API_BASE') . "/api/publicacion/cron/dues?uuid={$uuid}");
        } finally {

        }

        $esPublico = $perfil->response->perfil->esPublico;

        return Inertia::render('Perfiles/index', [
            "auth" => [
                "user" => $user,
            ],
            "perfil" => $perfil->response,
            "isVisible" => $esPublico || ($esPublico == false && !is_null($user)),
        ]);
    }

    public function readAll(): \Illuminate\Http\JsonResponse
    {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfiles");
            $listaPerfiles = json_decode($request->getBody()->getContents());
            return response()->json([
                'success' => true,
                'message' => 'Perfiles obtenidos correctamente.',
                'data' => $listaPerfiles->response
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function create(): \Inertia\Response {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        return Inertia::render('Auth/CrearPerfil', [ "auth" => [ "user" => $user ] ]);
    }

    public function init() {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'id' => $user->id,
                        'alias' => $user->username,
                        'url' => str_replace(' ', '-', $user->username)
                    ])
                ],
            ];
            $request = $client->request('POST', env('API_BASE')."/api/perfil/init", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
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
            ], $th->getCode());
        }
    }

    public function readSessionOne($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/perfil/sesion/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function update(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        try {
            $body = [
                'json' => [
                    'name' => $decodedRequest->name,
                    'username' => $decodedRequest->username,
                    'puesto' => $decodedRequest->puesto,
                    'area' => 'undefined',
                    'estado' => 'undefined'
                ],
                'headers' => is_null(session("mc_publico_not_dashboard_profile"))
                ?   [
                        'Content-Type' => 'application/json',
                        'Authorization' => "Bearer " . $user->bearer
                    ]
                :   [],
            ];

            if (is_null(session("mc_publico_not_dashboard_profile")))
                $request = $client->request('POST', env('API_BASE')."/api/admin/sesiones/user/update", $body);
            else
                $request = $client->request('PUT', env('API_BASE')."/api/perfil/{$user->perfil_data->id}", $body);
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

    public function updateRsss(Request $request) {
        $client = new Client(['verify' => false]);

        $decodedRequest = json_decode($request->data);

        try {
            $body = [
                'json' => [
                    // 'data' => json_encode([
                    //     'seguidorId' => $decodedRequest->seguidorId,
                    //     'seguidoId' => $decodedRequest->seguidoId,
                    // ])
                    'data' => json_encode($decodedRequest)
                ]
            ];
            $request = $client->request('POST', env('API_BASE')."/api/perfil/updateRrss", $body);
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

        if (is_null($user))
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
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/following", $body);
            } else {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/grupal/following", $body);
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
            $path = storage_path() . "/" . "app" . "/" . $file->store('profile_pictures/' . $file->getClientOriginalName());

            $body = [
                'multipart' => [
                    [
                        'name'     => 'profile_image',
                        'contents' => fopen($path, 'r'),
                    ]
                ],
                'headers' => is_null(session("mc_publico_not_dashboard_profile"))
                    ?   [ 'Authorization' => "Bearer " . $user->bearer ]
                    :   [],
            ];

            if (is_null(session("mc_publico_not_dashboard_profile")))
                $request = $client->request('POST', env('API_BASE')."/api/perfil/user/profile-image", $body);
            else
                $request = $client->request('POST', env('API_BASE')."/api/perfil/foto/{$user->perfil_data->id}", $body);

            $response = json_decode($request->getBody()->getContents());

            File::delete($path);

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function giveFollow(Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
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
                        'addToCircle' => $decodedRequest->addToCircle,
                    ])
                ]
            ];

            if (is_null($perfilGrupalId)) {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/follow", $body);
            } else {
                $request = $client->request('POST', env('API_BASE') . "/api/perfil/grupal/follow", $body);
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

    public function getProfilePhoto ($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE') . "/api/perfil/usuario-perfil/{$id}");
            $response = json_decode($request->getBody()->getContents());

            $usuario = $response[0];

            $request = $client->request('GET', env('API_BASE') . "/api/perfil/user/profile-image/{$usuario->usuarioId}");
            $response = $request->getBody()->getContents();

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {

            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents());

            if ($e->getCode() != 404)
                return response()->json([
                    "success" => false,
                    "message" => $message
                ], $e->getCode());

            try {
                $request = $client->request('GET', env('API_BASE') . "/api/perfil/foto/{$id}");
                $response = $request->getBody()->getContents();

                return $response;
            } catch (\GuzzleHttp\Exception\BadResponseException $e) {
                $response = $e->getResponse();
                $message = json_decode($response->getBody()->getContents());

                return response()->json([
                    "success" => false,
                    "message" => $message
                ], $e->getCode());
            }

        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], 500);
        }
    }

    public function initFromDashboard(Request $request) {
        $token = $request->query('token') ?? null;

        if (is_null($token) || !Auth::attempt(["token" => $token]))
            return redirect('/');

        $response = $this->init();

        return redirect(route('perfil.page', [ "id" => $response->response->guid ]));
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

        if (is_null($user)) {
            return Inertia::render('Error/Error419', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        $user = (object) $user;

        $client = new Client(["verify" => false]);

        $perfilId = $user->perfil_data->id;

        try {
            $httpRequest = $client->request('GET', env('API_BASE') . "/api/perfil/for-settings/{$perfilId}");
            $response = json_decode($httpRequest->getBody()->getContents());
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return Inertia::render('Error/Error419', [
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

        return Inertia::render('Perfiles/ConfiguracionPerfil', [
            "auth" => [
                "user" => $user,
                "perfil" => $response->response,
            ],
        ]);
    }

    public function updateV2(Request $request): JsonResponse
    {
        $user = Auth::user()->id ?? null;

        if (is_null($user)) {
            return response()->json([
                'message' => 'unauthorized',
            ], 419);
        }

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $body = [
            'json' => [
                'name' => $request->nombre,
                'username' => $request->username,
                'puesto' => $request->puesto,
                'area' => 'undefined',
                'estado' => 'undefined'
            ],
            'headers' => is_null(session("mc_publico_not_dashboard_profile"))
            ?   [
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer " . $user->bearer
                ]
            :   [],
        ];

        try {
            if (is_null(session("mc_publico_not_dashboard_profile"))) {
                $httpRequest = $client->request('POST', env('API_BASE') . "/api/admin/sesiones/user/update", $body);
            } else {
                $httpRequest = $client->request('PUT', env('API_BASE') . "/api/perfil/{$user->perfil_data->id}", $body);
            }

            $response = json_decode($httpRequest->getBody()->getContents());
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

        $customUrl = UtilsController::hyphenize($request->customUrl);

        $body = [
            'json' => [
                'alias' => $request->nombre,
                'descripcion' => $request->descripcion,
                'customUrl' => $customUrl,
                'esPublico' => $request->esPublico,
                'url' => $request->url,
            ],
        ];

        if (strlen($request->urlFacebook) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 1,
                "url" => $request->urlFacebook,
            ];
        }

        if (strlen($request->urlInstagram) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 2,
                "url" => $request->urlInstagram,
            ];
        }

        if (strlen($request->urlTwitter) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 3,
                "url" => $request->urlTwitter,
            ];
        }

        if (strlen($request->urlTiktok) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 4,
                "url" => $request->urlTiktok,
            ];
        }

        if (strlen($request->urlWhatsApp) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 5,
                "url" => $request->urlWhatsapp,
            ];
        }

        if (strlen($request->urlLinkedin) > 0) {
            $body['json']['redesSociales'][] = [
                "perfilId" => $user->perfil_data->id,
                "catalogoRedesSocialesId" => 6,
                "url" => $request->urlLinkedin,
            ];
        }

        try {
            $httpRequest = $client->request('PUT', env('API_BASE') . "/api/perfil/extra-info/{$user->perfil_data->id}", $body);
            $response = json_decode($httpRequest->getBody()->getContents());
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
                'message' => $th->getCode(),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'response' => $response,
        ]);
    }

    public function readOneV2(string $customUrl = null, Request $request): \Inertia\Response
    {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        $client = new Client([
            "verify" => false,
        ]);

        $uuid = $request->query('id') ?? null;

        if (is_null($uuid) && is_null($customUrl)) {
            return Inertia::render('Error/Error404', [
                "auth" => [
                    "user" => $user,
                ],
            ]);
        }

        $params = [
            "query" => [
                "custom_url" => $customUrl,
                "guid" => $uuid,
            ],
        ];

        try {
            $httpRequest = $client->get(
                env('API_BASE') . "/api/perfil/v2",
                $params
            );
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message
                ?? $e->getMessage();

            return Inertia::render('Error/Error404', [
                "auth" => [
                    "user" => $user,
                    'message' => $message,
                ],
            ]);
        }

        $response = json_decode($httpRequest->getBody()->getContents());


        /** JG - 20230906 - Actualizacion de activacion de publicaciones */
        try {
            $client->request('GET', env('API_BASE') . "/api/publicacion/cron/dues?uuid={$uuid}");
        } finally {

        }

        return Inertia::render('Perfiles/index', [
            "auth" => [
                "user" => $user,
            ],
            "perfil" => $response->response,
        ]);
    }
}
