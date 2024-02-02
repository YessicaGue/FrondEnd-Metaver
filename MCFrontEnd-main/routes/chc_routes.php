<?php

use App\Http\Controllers\CHC\ContenidoPantallasEtapasCHCController;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::middleware('web')->group(function () {
    $user = Auth::user()->id ?? null;

    if (!is_null($user) && isset($user->expired) && $user->expired == true)
        Auth::logout();

    Route::get('/etapa', [ContenidoPantallasEtapasCHCController::class, 'showOne'])->name('etapa.page');
});

Route::prefix('api')->middleware('web')->group(function () {
    $user = Auth::user()->id ?? null;

    if (!is_null($user) && isset($user->expired) && $user->expired == true)
        Auth::logout();

});