<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use GuzzleHttp\Client;
use App\Rules\Recaptcha;
use Carbon\Carbon;

class PerfilesUsuariosController extends Controller
{
    public function index() {
        $user = Auth::user()->id ?? null;

        if (!is_null($user))
            return redirect()->intended(RouteServiceProvider::HOME);

        return Inertia::render('Auth/Register', [
            'recaptcha_site_key' => config('services.google_recaptcha.site_key')
        ]);
    }

    public function registro(Request $request) {
        $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255",
            "password" => ["required", "confirmed", Rules\Password::defaults()],
            "captcha_token" => new Recaptcha()
        ]);

        $client = new Client(["verify" => false]);

        $body = [
            "json" => [
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "esCHC" => $request->query('acceso') == "camino-heroe-ciudadano"
            ]
        ];

        try {
            $call = $client->request('POST', env('API_BASE') . "/api/perfil/usuario", $body);
            $response = json_decode($call->getBody()->getContents());
        } catch (\Throwable $th) {
            return back()->withErrors(["email" => "Hubo un problema. Por favor, inténtalo más tarde"]);
        }

        $emailAlreadyExists = $response->emailAlreadyExists ?? false;

        if ($emailAlreadyExists)
            return back()->withErrors(["email" => "El correo ya existe"]);

        $credentials = [
            "email" => $request->email,
            "password" => $request->password,
        ];

        Auth::attempt($credentials);

        $user = Auth::user()->id ?? null;

        if (is_null($user)) {
            return redirect()->intended(route("login"));
        }

        $user = (object) $user;

        if ($request->query('acceso') == "camino-heroe-ciudadano") {
            return redirect(route("camino.candidato.page"));
        }

        if (!isset($request->code) || is_null($request->code))
            return redirect(route("bienvenida.page"));

        $body = [
            "json" => [
                "perfilUsuarioId" => $response->response->id,
                "codigoInvitacionId" => json_decode($request->code)->id,
                "fechaCreacion" => Carbon::now(),
            ],
        ];

        try {
            $call = $client->request('POST', env('API_BASE') . "/api/codigo/invitacion/perfil/publico", $body);
            $response = json_decode($call->getBody()->getContents());
        } finally {
            return redirect(route("bienvenida.page"));
        }
    }

    public function indexCHC()
    {
        $user = Auth::user()->id ?? null;

        if (!is_null($user))
            return redirect()->intended(RouteServiceProvider::HOME);

        return Inertia::render('Auth/RegisterCHC', [
            'recaptcha_site_key' => config('services.google_recaptcha.site_key')
        ]);
    }

    public function createUserFromPublicDomain()
    {
        $user = Auth::user()->id ?? null;

        if (is_null($user)) {
            return response()->json([
                "success" => false,
                "message" => "unauthorized"
            ], 419);
        }

        $client = new Client([
            'verify' => false,
        ]);

        $body = [
            'json' => $user,
        ];

        try {
            $client->request('POST', env('API_BASE') . "/api/usuario/eject-to-dashboard", $body);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() == 405) {
                session()->forget("mc_dashboard_session");

                return response()->json([
                    "success" => true,
                ], 201);
            }

            $response = $e->getResponse();
            $message = json_decode($response->getBody()->getContents())->message ?? $e->getMessage();

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

        session()->forget("mc_dashboard_session");
        session()->forget("mc_publico_group_profile_guid");
        Auth::logout();

        return response()->json([
            "success" => true,
        ]);
    }
}
