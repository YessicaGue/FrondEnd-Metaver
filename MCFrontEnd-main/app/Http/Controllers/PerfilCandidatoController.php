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

class PerfilCandidatoController extends Controller
{
    public function index(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones
        $client = new Client(['verify' => false]); //JJ -20230831 --TRAER DETALLE CANDIDATOS
        //detalle
        $request = $client->request('GET', env('API_BASE')."/api/candidatosCHC/DetalleCandidato/{$perfilId}");
        $detalleCandidato = json_decode($request->getBody()->getContents());
        //foto
        $foto = route('get.perfil.foto', ['id' => $perfilId]);
        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/PerfilCandidato', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                'detalleCandidato'=>$detalleCandidato->response,
                'fotoPerfil' => $foto,
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/PerfilCandidato', [
            'detalleCandidato'=>$detalleCandidato->response,
            'fotoPerfil' => $foto,
            "auth" => [ "user" => $user ]
            ]
        );
    }
}
