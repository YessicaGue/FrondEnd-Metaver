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

class CreaEquipoController extends Controller
{
    public function index(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/CreaEquipo', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/CreaEquipo',
            [
                "auth" => [ "user" => $user ] //JJ 20230912
            ]);
    }

    public function coordinador(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/1Cordinador', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/1Cordinador', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function agenda(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/2Agenda', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/2Agenda', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function juridico(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/3Juridico', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/3Juridico', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function presupuesto(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/4Presupuesto', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/4Presupuesto', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function estrategiaPolitica(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/5EstrategiaPolitica', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ]
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/5EstrategiaPolitica', [
            "auth" => [ "user" => $user ]
        ]);
    }

    public function estrategiaTerritorial(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/6EstrategiaTerritorial', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/6EstrategiaTerritorial', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function analisisTerritorial(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/7AnalisisTerritorial', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/7AnalisisTerritorial', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function estrategiaAire(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/8EstrategiadeAire', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/8EstrategiadeAire', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function redesSociales(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/9RedesSociales', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/9RedesSociales', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function causaSocial(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/10CausaSocial', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/10CausaSocial', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function asambleaCiudadana(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/11AsambleaCiudadana', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/11AsambleaCiudadana', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function rg(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/12RG', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/12RG', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function rc(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/13RC', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/13RC', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }

    public function activista(): \Inertia\Response {
        $user = Auth::user()->id ?? null; // JG - 20230828 - Salto de validaciones
        
        if (!is_null($user)) // JG - 20230828 - Salto de validaciones
            $user = (object) $user; // JG - 20230828 - Salto de validaciones

        $perfilId = $user->perfil_data->id ?? null; // JG - 20230828 - Salto de validaciones

        if (!is_null($perfilId) && $perfilId == 400) // JG - 20230828 - Salto de validaciones
            return Inertia::render('CaminoCandidato/14Activista', [ // JG - 20230828 - Salto de validaciones
                'isDemo' => true, // JG - 20230828 - Salto de validaciones
                "auth" => [ "user" => $user ] //JJ 20230912
            ]); // JG - 20230828 - Salto de validaciones

        return Inertia::render('CaminoCandidato/14Activista', [
            "auth" => [ "user" => $user ] //JJ 20230912
        ]);
    }
}