<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CandidatoCHCController extends Controller
{
    public function getResumenCandidato($id) : JsonResponse
    {
        $client = new Client(['verify' => false]);

        try {
            $call = $client->request('GET', env('API_BASE') . "/api/candidatosCHC/DetalleCandidato/{$id}");
            $response = json_decode($call->getBody()->getContents());

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

    public function putActualizarCamino($camino){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify' => false]);
        $perfilId = $user->perfil_data->id;
        $caminoId = $camino;
        try{
            $response = $client->request('PUT',env('API_BASE')."/api/actualizaCamino/{$perfilId}/camino/{$caminoId}");
            $statusCode = $response->getStatusCode();
            if($statusCode ===200){
                return response()->json([
                    'message'=>'Datos Enviado',
                    'response'=>json_decode($response->getBody(),true)
                ]);
            }
            return response()->json([
                'codigo' => $statusCode,
                'message'=>'Error no controlado',
                'response'=>json_decode($response->getBody(),true)
            ]);
        }
        catch (ClientException $e){
            return response() -> json([
                'error' => 'Error en la solicitud, valio',
                'message' => json_decode($e->getResponse()->getBody()->getContents(),true)
            ],400);
        }
        catch(\Exception $e){
            return response()->json([
                'success'=>false,
                'statusCode'=>$e->getCode(),
                'message'=>json_encode($e->getMessage(),true)
            ],500);
        }
    }

}
