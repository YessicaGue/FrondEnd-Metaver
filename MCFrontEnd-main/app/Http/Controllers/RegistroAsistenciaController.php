<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RegistroAsistenciaController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('CaminoCandidato/RegistroAsistencia', []);
    }

    public function postRegistroParticipacion(Request $request){
        $client = new Client(['verify'=>false]);
        $requestData = $request->json()->all();
        try{
            $domiclioGeneralViewModel = [
                "direccionCompleta" => $requestData["direccion"],
                "numeroCalle" => $requestData["numeroCalle"],
                "nombreCalle" => $requestData["calle"],
                "colonia" => $requestData["ciudad"],
                "ciudad" => $requestData["ciudad"],
                "entidadFederativaId" => $requestData["idEncontrado"],
                "codigoPostal" => $requestData["codigoPostal"],
                "pais" => $requestData["pais"],
                "latitud" => strval($requestData["lat"]),
                "longitud" => strval($requestData["lng"])
            ];
            $registroParticipantesEventosViewModel = [
                "nombre" => $requestData["nombre"],
                "apellidos" => $requestData["apellidos"],
                "edad" => $requestData["edad"],
                "generoId" => $requestData["generoId"],
                "correoElectronico" => $requestData["correoElectronico"],
                "celular" => $requestData["telefonoParticular"],
                "participarEnActividades" => $requestData["participarEnActividades"],
                "movimientoEnColonia" => $requestData["movimientoEnColonia"],
                "representanteDeCasilla" => $requestData["representanteDeCasilla"],
                "experienciaPrevia" => $requestData["experienciaPrevia"],
                "afiliarseAMovimientoCiudadano" => $requestData["afiliarseAMovimientoCiudadano"],
                "colocarPublicidadEnDomicilio" => $requestData["colocarPublicidadEnDomicilio"],
                "nombreEvento" => $requestData["nombreEvento"],
                "organizadorEvento" => $requestData["organizadorEvento"],
                "lugarEvento" => $requestData["lugarEvento"],
                "aceptoMantenermeInformado" => $requestData["informacionAdicionalAceptado"],
                "fechaEvento" => $request["fechasEvento"],
                "folio" => $request["folioEvento"],
            ];
            $resultado = [
                "registroParticipantesEventosViewModel" => $registroParticipantesEventosViewModel,
                "domiclioGeneralViewModel" => $domiclioGeneralViewModel
            ];

            $body = [
                'json'=>$resultado,
            ];

            $request = $client->request('POST', env('API_BASE')."/api/RegistroParticipantesEventos", $body);
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
}
