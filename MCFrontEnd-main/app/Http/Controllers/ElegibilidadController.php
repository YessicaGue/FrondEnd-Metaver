<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

/**
 * JG - 20230828 - Se han agregado instrucciones para evitar el proceso de validaciones en usuario demo
 *
 * Se encuentra en las lineas marcadas con el siguiente comentario:
 * ------> // JG - 20230828 - Salto de validaciones <-------
 */

class ElegibilidadController extends Controller
{
    public function index(): \Inertia\Response {
        $user=Auth::user()->id??null;
        if(is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);
        $user=(object) $user;
        $perfilId = $user->perfil_data->id;
        $client = new Client(['verify' => false]);
        $request = $client->request('GET', env('API_BASE')."/api/examenesCaminoCanditado/3");
        $examen = json_decode($request->getBody()->getContents());
        if ($perfilId != 400) { // JG - 20230828 - Salto de validaciones
        $requestEtapa = $client->request('GET', env('API_BASE')."/api/candidatosCHC/validarEtapaRegistro/{$perfilId}/etapa/4");
        $estatusEtapa = json_decode($requestEtapa->getBody()->getContents());
        } else { // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/Elegibilidad', [ // JG - 20230828 - Salto de validaciones
                'datosExamen' => $examen->response, // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ],
                "estatusEtapa" => (object)[]
            ]); // JG - 20230828 - Salto de validaciones
        } // JG - 20230828 - Salto de validaciones

        $realizoEtapaAnterior = $estatusEtapa->response?->realizoEtapaAnterior??false;
        if(!$realizoEtapaAnterior){
                return Inertia::render('Inicio', ["auth" => ["user" => $user]]);
        }

        return Inertia::render('CaminoCandidato/Elegibilidad', [
            "datosExamen"=>$examen->response,
            "auth" => [ "user" => $user ],
            "estatusEtapa" => $estatusEtapa->response
        ]);
    }
}
