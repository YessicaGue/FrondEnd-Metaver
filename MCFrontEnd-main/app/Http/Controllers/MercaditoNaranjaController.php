<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class MercaditoNaranjaController extends Controller
{
    
    public function index(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/MercaditoNaranja', []);
    }

    public function indexbebidas(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/Bebidas', []);
    }

    public function indexgadgets(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/Gadgets', []);
    }
    
    public function indexoficina(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/Oficina', []);
    }

    public function indextextiles(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/Textiles', []);
    }

    public function indexnivel(): \Inertia\Response {
        //return Inertia::render('CaminoCandidato/MultiversoTutorial', []);
        return Inertia::render('MercaditoNaranja/Niveles', []);
    }
    
}
