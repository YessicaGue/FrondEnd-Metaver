<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

class CallbacksController extends Controller
{
    public function instagram(Request $request): \Inertia\Response {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);

        if (is_null($user))
            return Inertia::render('Inicio', [ "auth" => [ "user" => $user ], "errors" => [ "message" => "unauthorized" ]]);

        $user = (object) $user;

        $client = new Client(['verify' => false]);

        $result = null;

        $clientId = '211161591267567';
        $clientSecret = '5835499f40b654506292e6446b9adf64';

        try {
            $formData = [
                'form_params' => [
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                    'grant_type' => 'authorization_code',
                    'redirect_uri' => route('instagram.auth'),
                    'code' => $request->query('code')
                ],
            ];

            $request = $client->request('POST', "https://api.instagram.com/oauth/access_token", $formData);
            $response = json_decode($request->getBody()->getContents());

            $result = (object) [];

            $accessToken = $response->access_token;
            $result->shortLivedToken = $response;
            
            $request = $client->request('GET', "https://graph.instagram.com/access_token?client_secret={$clientSecret}&access_token={$accessToken}&grant_type=ig_exchange_token");
            $result->longLivedToken = json_decode($request->getBody()->getContents());
            
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            return Inertia::render('Callbacks/index', ['authorization' => $result, 'error' => json_decode($e->getResponse()->getBody()->getContents()), 'auth' => [ 'user' => $user ]]);
        }

        return Inertia::render('Callbacks/index', ['authorization' => $result, 'keyname' => 'instagramToken', 'auth' => [ 'user' => $user ]]);
    }
}
