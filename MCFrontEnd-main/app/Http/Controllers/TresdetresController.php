<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TresdetresController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('CaminoCandidato/Tresdetres', []);
    }
}