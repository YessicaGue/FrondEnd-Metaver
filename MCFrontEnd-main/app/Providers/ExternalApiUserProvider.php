<?php

namespace App\Providers;

use Illuminate\Auth\GenericUser;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Auth\UserProvider;
use GuzzleHttp\Client;

class ExternalApiUserProvider implements UserProvider
{

    public function retrieveById($identifier) {
        $client = new Client(['verify' => false]);

        $payload["id"] = $identifier;
        $payload["remember_token"] = "";

        if (!is_null(session("mc_publico_not_dashboard_profile"))) {
            if (!is_null(session("mc_publico_group_profile_guid"))) {
                $payload["id"]["perfil_grupal_tagged_in"] = session("mc_publico_group_profile_guid");
            }

            return new GenericUser($payload);
        }

        if (!is_null(session("mc_publico_group_profile_guid"))) {
            $payload["id"]["perfil_grupal_tagged_in"] = session("mc_publico_group_profile_guid");
        }

        $headers = [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $payload["id"]["bearer"],
            ],
        ];

        try {
            $request = $client->request('GET', env('API_BASE') . "/api/check-session", $headers);
            $response = json_decode($request->getBody()->getContents());
        } catch (\Throwable) {
            return new GenericUser([
                "id" => null,
                "remember_token" => null,
                "expired" => true,
            ]);
        }

        if (count((array) $response) <= 0) {
            return new GenericUser([
                "id" => null,
                "remember_token" => null,
                "expired" => true,
            ]);
        }

        /** Perfil data */
        // if (count((array) $payload["id"]["perfil_data"]) <= 0)
        // try {
        //     $request = $client->request('GET', env('API_BASE') . "/api/perfil/sesion/{$payload["id"]["id"]}");
        //     $response = json_decode($request->getBody()->getContents());

        //     if ($response->success === false) {
        //         $payload["id"]["perfil_data"] = (object) [];
        //         $payload["id"]["perfiles_grupales_data"] = [];
        //         $payload["remember_token"] = '';

        //         return new GenericUser($payload);
        //     }

        //     $perfil = $response->response;

        //     try {
        //         $payload["id"]["perfil_data"] = (object) [
        //             "id" => $perfil->perfil->id,
        //             "guid" => $perfil->perfil->guid,
        //             "activo" => $perfil->perfil->activo,
        //             "url" => $perfil->perfil->url,
        //             "fechaCreacion" => $perfil->perfil->fechaCreacion,
        //             "programas" => $perfil->programas,
        //             "seguidores" => $perfil->seguidores,
        //             "siguiendo" => $perfil->siguiendo,
        //             "tokens" => $perfil->tokens,
        //             "voluntarios" => $perfil->voluntarios,
        //         ];
        //         $payload["id"]["perfiles_grupales_data"] = $perfil->perfilesGrupales;
        //     } catch (\Throwable $th) {
        //         $payload["id"]["perfil_data"] = (object) ["estable" => false];
        //         $payload["id"]["perfiles_grupales_data"] = [];
        //     }
        // } catch (\Throwable $th) {
        //     $payload["id"]["perfil_data"] = (object) ["estable" => false];
        //     $payload["id"]["perfiles_grupales_data"] = [];
        // }

        if (!is_null(session("mc_publico_group_profile_guid"))) {
            $payload["id"]["perfil_grupal_tagged_in"] = session("mc_publico_group_profile_guid");
        }

        $session = $payload;

        return new GenericUser($session);
    }

    public function retrieveByToken($identifier, $token) {
        return null;
    }

    public function updateRememberToken(Authenticatable $user, $token) {
    }

    /**
     * JG - 20231013
     * 
     * Este metodo es para permitir login
     * 
     * El retorno nulo indica que no se puede permitir login
     * y puede ser por credenciales incorrectas, o por no alcanzar algun ep necesario
     * o este ep no genero la respuesta correcta
     * 
     * El retorno de new GenericUser indica que se permite login y el array que contenga
     * son los datos que se guardan en sesion
     */
    public function retrieveByCredentials(array $credentials) {
        $isAnyCredentialMissed = !isset($credentials["email"]) || !isset($credentials["password"]);
        $isFromLogin = !isset($credentials["token"]);

        if ($isAnyCredentialMissed && $isFromLogin) {
            return null;
        }

        $client = new Client(['verify' => false]);

        // JG - 20231013 - Se habla de un inicio de sesion ordinario
        if (!isset($credentials["token"])) {

            // JG - 20231013 - Se verifica la existencia de credenciales en la tabla para perfiles ajenos a dashboard
            $onlyPublicUser = $this->onlyPublicUserAttempt($credentials);

            if (count($onlyPublicUser) > 0) {
                session([ "mc_publico_not_dashboard_profile" => true ]);
                return new GenericUser($onlyPublicUser);
            }

            $body = [
                'json' => [
                    'grant_type' => 'password',
                    'client_id' => env('DASHBOARD_CLIENT_ID'),
                    'client_secret' => env('DASHBOARD_CLIENT_SECRET'),
                    'username' => $credentials['email'],
                    'password' => $credentials['password'],
                    'scope' => '',
                ],
            ];

            try {
                $request = $client->request('POST', env('API_BASE') . "/oauth/token", $body);
                $token = json_decode($request->getBody()->getContents())->access_token;
            } catch (\Throwable) {
                return null;
            }
        } else {
            /**
             * JG - 20231013
             * 
             * Este token contiene las credenciales de identificacion y
             * estas credenciales indican que es un usuario de dashboard
             * 
             * Cuando se recibe este token, entonces se habla de uuna liga desde dashboard
             * que requiere un inicio de sesion automatico de un solo clic
             * saltandose la ventana de login
             * 
             */
            $token = $credentials['token'];
        }

        // JG - 20231013 - Se intenta inicio de sesion de usuario dashboard y captura datos de usuario
        $headers = [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
            ],
        ];

        try {
            $request = $client->request('GET', env('API_BASE') . "/api/check-session", $headers);
            $response = json_decode($request->getBody()->getContents());
        } catch (\Throwable) {
            return null;
        }

        if (count((array) $response) <= 0) {
            return null;
        }

        // JG - 20231013 - Se comienza a formar la sesion con los primeros datos
        $payload = (array) $response->user;
        $payload['bearer'] = $token;
        $id = $payload['id'];

        // JG - 20231013 - Se obtiene informacion del perfil y se termina de dar formato
        try {
            $request = $client->request('GET', env('API_BASE') . "/api/perfil/sesion/{$id}");
            $response = json_decode($request->getBody()->getContents());
        } catch (\Throwable) {
            return null;
        }

        if (!isset($response->response)) {
            return null;
        }

        $perfil = $response->response;

        $perfilData = [
            "id" => $perfil->perfil->id,
            "guid" => $perfil->perfil->guid,
            "activo" => $perfil->perfil->activo,
            "url" => $perfil->perfil->url,
            "fechaCreacion" => $perfil->perfil->fechaCreacion,
            "customUrl" => $perfil->perfil->customUrl,
            "esPublico" => $perfil->perfil->esPublico,
            "programas" => $perfil->programas,
            "seguidores" => $perfil->seguidores,
            "siguiendo" => $perfil->siguiendo,
            "tokens" => $perfil->tokens,
            "voluntarios" => $perfil->voluntarios,
        ];

        $payload['perfil_data'] = (object) $perfilData;
        $payload["perfiles_grupales_data"] = $perfil->perfilesGrupales;
        $payload['id'] = $payload;
        $payload['remember_token'] = '';

        return new GenericUser($payload);
    }

    public function validateCredentials(Authenticatable $user, array $credentials) {
        return true;
    }

    private function onlyPublicUserAttempt(array $credentials) {
        $client = new Client(['verify' => false]);

        $usuario = null;

        try {
            $request = $client->request('GET', env('API_BASE') . "/api/perfil/usuario/email/{$credentials["email"]}");
            $usuario = json_decode($request->getBody()->getContents())->response;
        } catch (\Throwable) {
            return [];
        }

        if (is_null($usuario)) {
            return [];
        }

        if (!is_null($usuario) && !Hash::check($credentials["password"], $usuario->password)) {
            return [];
        } 
        
        $payload = (array) $usuario;

        try {
            $request = $client->request('GET', env('API_BASE') . "/api/perfil/sesion/not/dashboard/{$usuario->id}");
            $response = json_decode($request->getBody()->getContents());
        } catch (\Throwable) {
            return [];
        }

        if ($response->success === false) {
            return [];
        }

        $perfil = $response->response;
        $perfilData = [
            "id" => $perfil->perfil->id,
            "guid" => $perfil->perfil->guid,
            "activo" => $perfil->perfil->activo,
            "url" => $perfil->perfil->url,
            "fechaCreacion" => $perfil->perfil->fechaCreacion,
            "customUrl" => $perfil->perfil->customUrl,
            "esPublico" => $perfil->perfil->esPublico,
            "programas" => $perfil->programas ?? [],
            "seguidores" => $perfil->seguidores,
            "siguiendo" => $perfil->siguiendo,
            "tokens" => $perfil->tokens,
            "voluntarios" => $perfil->voluntarios ?? [],
        ];

        $payload['perfil_data'] = (object) $perfilData;
        $payload["perfiles_grupales_data"] = $perfil->perfilesGrupales ?? [];
        $payload['id'] = $payload;
        $payload['remember_token'] = '';

        return $payload;
    }
}
