<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Client;

class EscuchasController extends Controller
{

    public function index(): \Inertia\Response {
        // Construir un objeto que ya tenga los response de los formularios

        return Inertia::render('Escuchas/index', []);
    }

    public function readAll() {
        $client = new Client(['verify' => false]);

        try {
            $request = $client->request('GET', env('API_BASE')."/api/escuchas");
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e->getResponse()->getBody()->getContents())
            ]);
        }
    }

    public function create(Request $request) {
        $client = new Client(['verify' => false]);

        $parsedReq = json_decode($request->data);

        try {
            $body = [
                'json' => [
                    'data' => json_encode([
                        'respuesta' => $parsedReq->respuesta,
                        'esAnonimo' => $parsedReq->esAnonimo,
                        'fechaCreacion' => Carbon::now(),
                    ])
                ]
            ];

            $request = $client->request('POST', env('API_BASE')."/api/escucha", $body);
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
