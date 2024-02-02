<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/**
 * JG - 20230828 - Se han agregado instrucciones para evitar el proceso de validaciones en usuario demo
 *
 * Se encuentra en las lineas marcadas con el siguiente comentario:
 * ------> // JG - 20230828 - Salto de validaciones <-------
 */

class ContratoController extends Controller
{
    public function index(): \Inertia\Response {
        $user=Auth::user()->id??null;
        if(is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);
        $user=(object) $user;
        $perfilId = $user->perfil_data->id;

        if ($perfilId != 400) { // JG - 20230828 - Salto de validaciones
        $client = new Client(['verify' => false]);
        $request = $client->request('GET', env('API_BASE')."/api/candidatosCHC/validarEtapaRegistro/{$perfilId}/etapa/3");
        $estatusEtapa = json_decode($request->getBody()->getContents());
        } else { // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/Contrato', [ // JG - 20230828 - Salto de validaciones
                'estatusEtapa' => (object) [], // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones
        } // JG - 20230828 - Salto de validaciones

        $etapaPendiente = $estatusEtapa->response?->etapasPendiente??true;

        if($etapaPendiente){
            return Inertia::render('Inicio', ["auth" => ["user" => $user]]);
        }

        return Inertia::render('CaminoCandidato/Contrato',
            [
                "estatusEtapa"=>$estatusEtapa->response,
                "auth" => [ "user" => $user ], //JJ 20230912
            ]);
    }

    public function editPDFContrato(Request $request)
    {
        $user = Auth::user()->id??null; //obtener el usuario Autenticado

        if(is_null($user)){
            return response() -> json(['message' => 'Unauthorized'],419);
        }
        $user = (object) $user;
        $uuid = $user->perfil_data->guid;
//        if(!is_null($uuid))
//            return($uuid);

        $client = new Client(['verify' => false]);

        $archivo = $request -> file('pdf');
        if(!$archivo){
            return response() -> json(['error' => 'Archivo no seleccionado'],400);
        }

        $maxTamanio = 2 * 1024 * 1024;
        if($archivo->getSize()>$maxTamanio)
            return response() -> json(['error' => 'El archivo es demasiado grande'],400);

        $nombreArchivo = $archivo -> getClientOriginalName();
        $extension = $archivo -> getClientOriginalExtension();

        if($extension != 'pdf'){
            return response() -> json(['error' => 'El archivo no es un PDF'],400);
        }

        $result = $request->file('pdf')->store('candidatos_chc/'.$uuid);

        $path = storage_path("app/".$result);
        $existeELPath = file_exists($path);

        if(!$existeELPath){
            return response() -> json(['error' => 'El path no Existe'],400);
        }

        $body = [
            'multipart' => [
                [
                    'name' => 'carta_compromiso',
                    'contents' => fopen($path, 'r'),
                ],
                [
                    'name' => 'perfil_guid',
                    'contents' => $uuid,
                ]
            ],
        ];
        try {
            $request = $client->request('POST', env('API_BASE') . "/api/cartaCompromiso/post-carta-compromiso", $body);
            $requestEstatus = $request->getStatusCode();
            if($requestEstatus==200){
                return response()->json([
                    'message' => 'Archivo recibido con exito',
                    'response' => json_decode($request->getBody(),true)
                ]);
            }
        }
        catch(ClientException $e){
            return response()->json([
                'error'=> 'Error en la solicitud',
                'message' => json_decode($e->getResponse()->getBody()->getContents(),true)
            ],400) ;
        }
        catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()],500);
        } finally {
            File::delete($path);
        }

    }
}
