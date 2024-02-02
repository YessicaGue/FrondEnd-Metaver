<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index () {
        try {
            $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

            if (count((array) $user["perfil_data"]) <= 0)
                return Inertia::render('Auth/CrearPerfil', [ "auth" => [ "user" => $user ] ]);
                
        } catch (\Throwable $th) {
            $user = null;
        }
        
        return Inertia::render('Inicio', [ "auth" => [ "user" => $user ] ]);
    }
}
