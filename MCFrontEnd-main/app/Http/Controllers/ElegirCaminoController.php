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

class ElegirCaminoController extends Controller
{
    public function naranja(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/ElegirCamino', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ]
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/ElegirCamino', [
            "auth" => [ "user" => $user ]
        ]);
    }

    public function violeta(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoVioleta', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoVioleta', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function fosfo(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoFosfoFosfo', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoFosfoFosfo', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function blanco(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoBlanco', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoBlanco', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function electrico(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoElectrico', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoElectrico', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function celeste(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoCeleste', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoCeleste', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function limon(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoLimon', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoLimon', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function arcoiris(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoArcoiris', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoArcoiris', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function tornasol(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CaminoTornasol', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CaminoTornasol', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function putActualizarCamino(int $caminoId){

    }
}
