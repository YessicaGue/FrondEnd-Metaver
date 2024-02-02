<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ListaPerfilesController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('ListaPerfiles/index', []);
    }

    public function indexGrupales(): \Inertia\Response {
        return Inertia::render('ListaPerfiles/Grupales/index', []);
    }
}
