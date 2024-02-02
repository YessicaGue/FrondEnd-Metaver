<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CaminoHeroeCiudadanoController extends Controller
{
    //
    public function postPrimerRegistro(Request $request){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify'=>false]);
        $fechaCreacion = Carbon::now();
        $fechaModificacion = Carbon::now();
        $PerfilId = $user->perfil_data->id;

        $requestData = $request->json()->all();
        $personaRequest = $requestData['personaRequest'];
        $direccionRequest = $requestData['direccionRequest'];
        $personaPerfilRequest = $requestData['personaPerfilRequest'];
        $candidatosCHCRequest = $requestData['candidatosCHCRequest'];
        $candidatoEtapaRegistroCHCRequest = $requestData['candidatoEtapaRegistroCHCRequest'];

        try{

            $personaRequest['fechaCreacion'] = $fechaCreacion;
            $personaRequest['fechaModificacion'] = $fechaModificacion;

            $direccionRequest['fechaCreacion'] = $fechaCreacion;
            $direccionRequest['fechaModificacion'] = $fechaModificacion;

            $personaPerfilRequest['perfilId'] = $PerfilId;
            $personaPerfilRequest['fechaAlta'] = $fechaCreacion;

            $candidatosCHCRequest['fechaInicio'] = $fechaCreacion;
            $candidatosCHCRequest['fechaAlta'] = $fechaCreacion;
            $candidatosCHCRequest['PerfilId'] = $PerfilId;

            $candidatoEtapaRegistroCHCRequest['fechaAlta']=$fechaCreacion;

            $responseJson = [
                'personaRequest' => $personaRequest,
                'direccionRequest' => $direccionRequest,
                'personaPerfilRequest' => $personaPerfilRequest,
                'candidatosCHCRequest' => $candidatosCHCRequest,
                'candidatoEtapaRegistroCHCRequest'=>$candidatoEtapaRegistroCHCRequest,
                // Otros resultados o datos que desees enviar
            ];
            $body = [
                'json'=>$responseJson,
            ];
            $request = $client->request('POST', env('API_BASE')."/api/heroeCiudadano/primerRegistro", $body);
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
    public function postSegundaRonda(Request $request){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;

        $client = new Client(['verify'=>false]);
        $PerfilId = $user->perfil_data->id;

        $requestData = $request->json()->all();
        try{
            $direccionViewModel = [
                "direccionCompleta" => $requestData["direccionCompleta"],
                "numeroCalle" => $requestData["numeroCalle"],
                "nombreCalle" => $requestData["nombreCalle"],
                "colonia" => $requestData["colonia"],
                "ciudad" => $requestData["ciudad"],
                "entidadFederativaId" => $requestData["entidadFederativaId"],
                "codigoPostal" => $requestData["codigoPostal"],
                "pais" => $requestData["pais"],
                "latitud" => $requestData["latitud"],
                "longitud" => $requestData["longitud"]
            ];
            $resultado = [
                "caminoId" => (int) $requestData["caminoId"],
                "perfilId" => $PerfilId,
                "cargoPostulacion" => $requestData["cargoPostulacion"],
                "fechaIngresoMC" => $requestData["fechaIngresoMC"],
                "puestoEleccionPopularAnteriores" => $requestData["puestoEleccionPopularAnteriores"],
                "cargosDesempeniadosDentroMC" => $requestData["cargosDesempeniadosDentroMC"],
                "comentarios" => $requestData["comentarios"],
                "curp" => $requestData["curp"],
                "rfc" => $requestData["rfc"],
                "claveElector" => $requestData["claveElector"],
                "direccionViewModel" => $direccionViewModel,
            ];

            $body = [
                'json'=>$resultado,
            ];
            $request = $client->request('POST', env('API_BASE')."/api/heroeCiudadano/segundoRegistro", $body);
            $requestEstatus = $request->getStatusCode();
            return response()->json([
                'message'=>'Datos enviados Corrrectamente',
                'response'=>json_decode($request->getBody()->getContents(),true)
            ]);
            //return $resultado;
        } catch (ClientException $e) {
            return response()->json([
                'error' => 'Error en la solicitud',
                'message' => json_decode($e->getResponse()->getBody()->getContents(),true),
                'body' => $body
            ],400);
        } catch (\Exception $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], $th->getCode());
        }
    }
    public function postSegundaEtapaRegistro(Request $request){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;
        $client = new Client(['verify'=>false]);
        $fechaCreacion = Carbon::now();
        $PerfilId = $user->perfil_data->id;
        try{
        $requestData = $request->json()->all();
        $requestData['candidatoId']=0;
        $requestData['perfilId']=$PerfilId;
        $requestData['fechaAlta']=$fechaCreacion;
        $requestData['registroId']=2;
        $body = [
            'json'=>$requestData
        ];
        $request = $client->request('POST', env('API_BASE')."/api/heroeCiudadano/segundoPasoRegistro/{$PerfilId}", $body);
        $response = json_decode($request->getBody()->getContents());
        return $response;
        }catch(RequestException $ex){
            $responseMessage = $ex->getResponse() ? $ex->getResponse()->getBody()->getContents() : $ex->getMessage();
            return response()->json([
                'success' => false,
                'message' => $responseMessage
            ],$ex->getCode()??500);
        }
        catch(\Exception $ex){
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ],500);
        }
    }
    public function postTerceraEtapaRegistro(Request $request){
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([ 'message' => 'unauthorized' ], 419);

        $user = (object) $user;
        $client = new Client(['verify'=>false]);
        $fechaCreacion = Carbon::now();
        $PerfilId = $user->perfil_data->id;
        try{
            $requestData = $request->json()->all();
            $requestData['candidatoId']=0;
            $requestData['perfilId']=$PerfilId;
            $requestData['fechaAlta']=$fechaCreacion;
            $requestData['registroId']=3;
            $body = [
                'json'=>$requestData
            ];
            $request = $client->request('POST', env('API_BASE')."/api/heroeCiudadano/tercerPasoRegistro/{$PerfilId}", $body);
            $response = json_decode($request->getBody()->getContents());
            return $response;
        }catch(RequestException $ex){
            $responseMessage = $ex->getResponse() ? $ex->getResponse()->getBody()->getContents() : $ex->getMessage();
            return response()->json([
                'success' => false,
                'message' => $responseMessage
            ],$ex->getCode()??500);
        }
        catch(\Exception $ex){
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ],500);
        }
    }

}
