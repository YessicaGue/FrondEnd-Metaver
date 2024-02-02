<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * JG - 20230828 - Se han agregado instrucciones para evitar el proceso de validaciones en usuario demo
 * 
 * Se encuentra en las lineas marcadas con el siguiente comentario:
 * ------> // JG - 20230828 - Salto de validaciones <-------
 */

class CaminoCandidatoController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $isDemoQuerySelected = $request->query('authorized');

        /** JG - 20230901 - Autenticacion automatica a usuario demo */
        if (!is_null($isDemoQuerySelected)) {
            $credentials = [
                "email" => "prueba@mail.com",
                "password" => 123456789,
            ];

            Auth::attempt($credentials);
        }
        /** JG - 20230901 - Autenticacion automatica a usuario demo */

        $user = Auth::user()->id ?? null;
        if (is_null($user))
            return Inertia::render('Inicio', ["auth" => ["user" => $user]]);
        $user = (object)$user;
        $perfilId = $user->perfil_data->id;

        if ($perfilId != 400) { // JG - 20230828 - Salto de validaciones

        $client = new Client(['verify' => false]);
        $request = $client->request('GET', env('API_BASE') . "/api/candidatosCHC/validarEtapaRegistro/{$perfilId}/etapa/1");
        // dd($request);

        $estatusEtapa = json_decode($request->getBody()->getContents());
        //dd($estatusEtapa);

        } else { // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/index', [ // JG - 20230828 - Salto de validaciones
                'estatusEtapa' => (object) [], // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones
        } // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/index',
            [
                "estatusEtapa" => $estatusEtapa->response,
                "auth" => [ "user" => $user ] //JJ 20230912
            ]);
    }
}
