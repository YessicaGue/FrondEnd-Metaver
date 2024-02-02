<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/vocesdelfuturo', function () {
    return Inertia::render('ChangeOrg/index', [
        'urlApi' => env('API_BASE'),
    ]);
})->name('change.index');

Route::middleware('auth')->group(function () {
    Route::get('/vocesdelfuturo/crear', function () {
        return Inertia::render('ChangeOrg/ChangeCreate', [
            'urlApi' => env('API_BASE'),
        ]);
    })->name('change.create');
});

Route::get('/vocesdelfuturo/detalles', function () {
    return Inertia::render('ChangeOrg/ChangeDetails', [
        'urlApi' => env('API_BASE'),
    ]);
})->name('change.details');
