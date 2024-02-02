<?php

namespace App\Http\Controllers\CHC;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContenidoPantallasEtapasCHCController extends Controller
{
    public function showOne (Request $request) {
        $id = $request->query('id');

        if (is_null($id))
            return Inertia::render('Error/Error404', []);

        $client = new Client([ 'verify' => false ]);

        try {
            $call = $client->request('GET', env('API_BASE') . "/api/contenido-pantalla/related/{$id}");
            $response = json_decode($call->getBody()->getContents());

            return Inertia::render('CHC/PantallasDinamicas/index', [ "pantalla" => $response->response[0] ]);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

            return Inertia::render('Error/Error404', [ 'errors' => $message ]);
        }
    }
}
