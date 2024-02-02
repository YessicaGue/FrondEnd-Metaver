<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/registro-distritos', function () {
    return Inertia::render('RegistroDistritos/index', [
        'urlApi' => env('API_BASE'),
    ]);
})->name('registro.distritos.index');
