<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;

class CodigosInvitacionController extends Controller
{
    public function index () {
        return Inertia::render('Auth/Invitacion', []);
    }

    public function check (Request $request) {
        $client = new Client(["verify" => false]);

        $body = [ "json" => (array) $request->all() ];

        try {
            $request = $client->request('POST', env('API_BASE') . "/api/codigo/invitacion/check", $body);
            $response = json_decode($request->getBody()->getContents());

            return $response;
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? "";

            return response()->json([
                "success" => false,
                "message" => $message
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], $th->getCode());
        }
    }

    public function create (Request $request) : JsonResponse {
        $client = new Client(["verify" => false]);

        $body = [ "json" => (array) $request->all() ];

        try {
            $request = $client->request('POST', env('API_BASE') . "/api/codigo/invitacion/perfil/publico", $body);

            return $request->getBody()->getContents();
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? "";

            return response()->json([
                "success" => false,
                "message" => $message
            ], $e->getCode());
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => $th->getMessage()
            ], $th->getCode());
        }
    }
}
