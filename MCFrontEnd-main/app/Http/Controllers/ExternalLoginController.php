<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Inertia\Inertia;
use GuzzleHttp\Client;

class ExternalLoginController extends Controller
{
    public function login(LoginRequest $request) {
        if (Auth::attempt(request()->only('email', 'password'))) {
            $request->session()->regenerate();
            $user = (object) Auth::user()->id;

            if (!is_null($user->perfil_data->customUrl) || strlen($user->perfil_data->customUrl) > 0) {
                return redirect(route("perfil.page.custom", $user->perfil_data->customUrl));
            }

            if (isset($user->perfil_data->guid)) {
                return redirect(route("perfil.page", [ "id" => $user->perfil_data->guid ]));
            }

            return redirect()->intended(RouteServiceProvider::HOME);
        }

        return back()->withErrors([
            'email' => 'Datos incorrectos',
            'password' => 'Datos incorrectos',
        ]);
    }

    public function logout() {
        session()->forget("mc_publico_group_profile_guid");
        session()->forget("mc_publico_not_dashboard_profile");

        $user = Auth::user()->id ?? null;

        $client = new Client(['verify' => false]);

        if (is_null($user)) {
            Auth::logout();
            return redirect(route("/"));
        }

        try {
            $body = [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer " . $user->bearer
                ]
            ];

            $client->request('GET', env('API_BASE') . "/api/session/logout", $body);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => json_decode($e)
            ]);
        } finally {
            Auth::logout();

            return redirect(route("/"));
        }
    }
}
