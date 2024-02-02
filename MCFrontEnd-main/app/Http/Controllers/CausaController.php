<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * JG - 20230828 - Se han agregado instrucciones para evitar el proceso de validaciones en usuario demo
 * 
 * Se encuentra en las lineas marcadas con el siguiente comentario:
 * ------> // JG - 20230828 - Salto de validaciones <-------
 */

class CausaController extends Controller
{
    public function index(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/Causa', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/Causa',
            [
                "auth" => [ "user" => $user ] //JJ 20230912
            ]
        );
    }
}