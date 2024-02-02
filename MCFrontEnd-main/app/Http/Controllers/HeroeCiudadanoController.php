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

class HeroeCiudadanoController extends Controller
{
    public function index(): \Inertia\Response {
        $user=Auth::user()->id??null;
        if(is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);
        $user=(object) $user;
        $perfilId = $user->perfil_data->id;

        if ($perfilId != 400) { // JG - 20230828 - Salto de validaciones
        $client = new Client(['verify' => false]);
        $request = $client->request('GET', env('API_BASE')."/api/candidatosCHC/validarEtapaRegistro/{$perfilId}/etapa/2");
        $estatusEtapa = json_decode($request->getBody()->getContents());
        } else { // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/HeroeCiudadano', [ // JG - 20230828 - Salto de validaciones
                'estatusEtapa' => (object) [], // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ], //JJ 20230912
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
            ]); // JG - 20230828 - Salto de validaciones
        } // JG - 20230828 - Salto de validaciones

        $inscrito = $estatusEtapa->response?->existeEnCandidatosCHC??false;
        if(!$inscrito){
            return Inertia::render('Inicio', ["auth" => ["user" => $user]]);
        }
        return Inertia::render('CaminoCandidato/HeroeCiudadano',
            [
                "estatusEtapa"=>$estatusEtapa->response, //JJ 20230912
                "auth" => [ "user" => $user ] //JJ 20230912
            ]);
    }
}
