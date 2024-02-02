<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class EventosController extends Controller
{
    public function index(): \Inertia\Response {
        try {
            $user = Auth::user()->id;
        } catch (\Throwable $th) {
            $user = null;
        }

        return Inertia::render('Eventos/index', [ "auth" => [ "user" => $user ] ]);
    }

    public function showOne($id): \Inertia\Response {
        try {
            $user = Auth::user()->id;
        } catch (\Throwable $th) {
            $user = null;
        }

        return Inertia::render('Eventos/VisualizarEvento', [ "auth" => [ "user" => $user ], "id" => $id ]);
    }

    public function readAll() {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('POST', env('API_BASE')."/api/eventos/publico");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }
}
