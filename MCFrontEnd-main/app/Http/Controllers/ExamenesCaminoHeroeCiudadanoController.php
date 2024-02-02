<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class ExamenesCaminoHeroeCiudadanoController extends Controller
{
    public function readOne($id) {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/examenesCaminoCanditado/{$id}");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
    }
    public function postRegistroExamen(Request $request){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify'=>false]);
        $fechaCreacion = Carbon::now();
        $fechaModificacion = Carbon::now();
        $PerfilId = $user->perfil_data->id;

        $requestData = $request->json()->all();
        $detalleExamenesCandidatosViewModel = $requestData['detalleExamenesCandidatosViewModel'];
        $examenesCandidatosViewModel = $requestData['examenesCandidatosViewModel'];

        foreach ($detalleExamenesCandidatosViewModel as &$detalle) {
            $detalle['fechaAlta'] = $fechaCreacion;
        }

        $examenesCandidatosViewModel['fechaAlta']=$fechaCreacion;
        $examenesCandidatosViewModel['fechaUltimoIntento']=$fechaModificacion;
        $examenesCandidatosViewModel['candidatoCHCId']=0;

        try{
            $responseJson = [
                'perfilId'=>$PerfilId,
                'detalleExamenesCandidatosViewModel' => $detalleExamenesCandidatosViewModel,
                'examenesCandidatosViewModel' => $examenesCandidatosViewModel,
                // Otros resultados o datos que desees enviar
            ];
            $body = [
                'json'=>$responseJson,
            ];
            $request = $client->request('POST', env('API_BASE')."/api/examenes/postRegistroExamen", $body);
            $requestEstatus = $request->getStatusCode();
            if($requestEstatus==200){
                return response()->json([
                    'message'=>'Datos enviados Corrrectamente',
                    'response'=>json_decode($request->getBody(),true)
                ]);
            }
        }
        catch (ClientException $e){
            return response()->json([
                'error' => 'Error en la solicitud',
                'message' => json_decode($e->getResponse()->getBody()->getContents(),true),
                'body' => $body
            ],400);
        }
        catch(\Exception $ex){
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ],500);
        }
    }
}
