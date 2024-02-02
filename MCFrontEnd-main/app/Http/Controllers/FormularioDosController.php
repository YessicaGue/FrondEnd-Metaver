<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class FormularioDosController extends Controller
{
    public function index(): \Inertia\Response {
        $camino = request()->query('camino');
        return Inertia::render('CaminoCandidato/Formulario2',
            [
                'camino'=> $camino,
            ]
        );
    }
}
