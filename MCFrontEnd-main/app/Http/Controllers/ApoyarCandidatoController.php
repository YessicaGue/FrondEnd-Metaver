<?php

namespace App\Http\Controllers;

use App\Models\DotNet\Perfil_DotNet;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PropsInertiaBuilderController;
use Inertia\Response;

class ApoyarCandidatoController extends Controller
{
    public function index($candidato): Response
    {
        /**
         * JG - 20231024
         *
         * Se sustituyen guiones por espacios para comparar con nombres en bd
         */
        $candidato = strtolower($candidato);
        // $candidato = str_replace("-", " ", $candidato);

        $guzzleClient = new Client(['verify' => false]);

        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        if (!is_null($user)) {
            $user = (object) $user;
        }

        $isDemo = $candidato == "demo1" || $candidato == "demo2" || $candidato == "demo3";

        if (is_null($user) && $isDemo) {
            $credentials = [
                "email" => "prueba@mail.com",
                "password" => 123456789,
            ];

            Auth::attempt($credentials);
        }

        try {
            $guzzleRequest = $guzzleClient->request(
                'GET',
                env('API_BASE') . "/api/precandidaturas/perfil-precandidatura/perfil?alias={$candidato}"
            );
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return Inertia::render('Error/Error404', [
                "errorCode" => $e->getCode(),
                "errorMessage" => $message,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('Error/Error404', [
                "errorCode" => $th->getCode(),
                "errorMessage" => $th->getMessage(),
            ]);
        }

        $response = json_decode($guzzleRequest->getBody()->getContents());

        return Inertia::render('CaminoCandidato/ApoyoPrecandidatura/ApoyarCandidato', [
            "auth" => [ "user" => $user ],
            "precandidatura" => $response->response,
        ]);
    }

    public function apoyosCandidatoView($candidato) : Response
    {
        $user = Auth::user()->id ?? null;
        $perfilTmp = Perfil_DotNet::buscarPorAlias($candidato);

        if (is_null($perfilTmp)) {
            return Inertia::render('Error/Error404', [
                "errorCode" => 404,
                "errorMessage" => "No se encontró el perfil",
            ]);
        }

        $isOwner = $user['perfil_data']->guid == $perfilTmp->guid;

        return Inertia::render('CaminoCandidato/firmas/ScreenFirmas', [
            "auth" => [ "user" => $user ],
            "precandidatura" => [ "perfil" => $perfilTmp ],
            "isOwner" => $isOwner,
        ]);
    }

    public function getApoyosPrecandidato($id): JsonResponse
    {
        $guzzleClient = new Client(['verify' => false]);
        try {
            $guzzleRequest = $guzzleClient->request(
                'GET',
                env('API_BASE') . "/api/precandidaturas/apoyo-precandidatura/{$id}"
            );
            $response = json_decode($guzzleRequest->getBody()->getContents());
            return response()->json([
                "success" => true,
                "response" => $response,
            ]);
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

    public function create(Request $request): JsonResponse
    {
        $guzzleClient = new Client(['verify' => false]);

        $perfil = $request->perfilPrecandidatura ?? null;
        $tipoPrecandidatura = $request->tipoPrecandidatura ?? null;

        //JJ Se agrega para tomar el correo Electronico y nombre par enviar el mailing
        $emailUsuario =  $request->email??null;
        $nombreUsuario = $request->nombre??null;

        if (is_null($perfil) || is_null($tipoPrecandidatura)) {
            return response()->json([
                "success" => false,
                "message" => "400 Bad Request",
            ], 400);
        }

        $perfil = (object) $perfil;
        $tipoPrecandidatura = (object) $tipoPrecandidatura;

        /**
         * JG - 20231010
         *
         * WIP: Cerrar el formato para enviar solo lo que este relacionado a la
         * informacion que necesite cada tipo de precandidatura
         */

        $body = [
            "json" => [
                "perfilId" => $perfil->id,
                "tipoPrecandidaturaId" => $tipoPrecandidatura->id,
                "email" => $request->email,
                "numeroTelefono" => $request->numero,
                "claveElector" => $request->clave,
                "formularioRellenadoJSON" => json_encode($request->all()),
                "estaInteresadoInformacionAdicional" => $request->informacionAdicionalAceptado,
            ],
        ];

        try {
            $guzzleRequest = $guzzleClient->request('POST', env('API_BASE') . "/api/precandidaturas/apoyo-precandidatura", $body);
            $response = json_decode($guzzleRequest->getBody()->getContents());
            //JJ - 01112023 Brevo
            $responseEmail = $this-> sendEmail($emailUsuario,$nombreUsuario);
            return response()->json($response);
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

    //JJ - 01112023  BREVO
    public function sendEmail ($emailUsuario, $nombreUsuario){
        $sendBrevo = env('BREVO_KEY');
        $apiUrl = 'https://api.brevo.com/v3/smtp/email';

        $data = [
            "to"=>[[
                "name"=>$nombreUsuario,
                "email"=> $emailUsuario
            ]],
            "sender"=>[
                "name"=>"Lab MC",
                "email"=>"labmc@ciudadanosenmovimiento.org"
            ],
            "templateId" => 210
        ];

        $headers = [
            'api-key' => $sendBrevo,
            'Content-Type' => 'application/json',
        ];
        $client = new Client(['verify'=>false]);

        try{
            $response = $client->request('POST', $apiUrl,[
                'headers' => $headers,
                'json' => $data
            ]);
            $statusCode = $response->getStatusCode();
            $responseData = json_decode($response->getBody(), true);
            if($statusCode == 201){
                return true;
            }else{
                return false;
            }
        }catch(\Exception $e){
            return 'Error al enviar el correo: '.$e->getMessage();
        }
    }
}
