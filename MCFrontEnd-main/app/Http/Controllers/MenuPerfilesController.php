<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuPerfilesController extends Controller
{
    public function index () {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        if (is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);

        return Inertia::render('MenuPerfiles/index', [ "auth" => [ "user" => $user ] ]);
    }

    public function setGrupal (Request $request) {
        $user = Auth::user()->id ?? null;

        if (is_null($user))
            return response()->json([
                "message" => "unauthorized"
            ], 419);

        $user = (object) $user;

        $guid = $request->query("guid");

        $perfilesGrupales = $user->perfiles_grupales_data;

        if (count($perfilesGrupales) <= 0)
            return response()->json([
                "message" => "unauthorizeda"
            ], 419);

        $guidLista = array_map(function ($perfilGrupal) {
            return $perfilGrupal->guid ?? "";
        }, $perfilesGrupales);
        
        if (!in_array($guid, $guidLista))
            return response()->json([
                "message" => "unauthorizeds",
            ], 419);

        session([ "mc_publico_group_profile_guid" => $guid ]);
            return response()->json([
                "success" => true
            ]);
    }

    public function unsetGrupal () {
        session()->forget("mc_publico_group_profile_guid");
    }
}
