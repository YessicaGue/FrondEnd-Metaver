<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CaminoComunicacionController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('CaminoCandidato/CaminoComunicacion', []);
    }
}
