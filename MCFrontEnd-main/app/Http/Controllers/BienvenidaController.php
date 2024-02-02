<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BienvenidaController extends Controller
{
    public function index(): \Inertia\Response {
        $user=Auth::user()->id??null;
        if(is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);
        $user=(object) $user;
        $perfilId = $user->perfil_data->id;

        if ($perfilId != 400) { // JG - 20230828 - Salto de validaciones
            $client = new Client(['verify' => false]);
        } else { // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/Contrato', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones
        } // JG - 20230828 - Salto de validaciones
        return Inertia::render('CaminoCandidato/Bienvenida',
            [
                "auth" => [ "user" => $user ] //JJ 20230912
            ]);
    }
}
