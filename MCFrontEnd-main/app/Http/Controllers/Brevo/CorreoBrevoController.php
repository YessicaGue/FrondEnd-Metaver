<?php

namespace App\Http\Controllers\Brevo;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class CorreoBrevoController extends Controller
{
    //
    //JJ - 01112023  se comenta es para enviar los correos con brevo
//    public function sendEmail (Request $request){
//        $sendBrevo = env('BREVO_KEY');
//        $apiUrl = 'https://api.brevo.com/v3/smtp/email';
//
//        $data = [
//            "sender"=>[
//                "name"=>"Julio Cesar",
//                "email"=>"julio.jimenez.mc@gmai.com"
//            ],
//            "to"=>[[
//                "name"=>"Julio Cesar Jimenez",
//                "email"=>"fabiolajim.mc@gmail.com"
//            ]],
//            "subject"=>"Hola",
//            "htmlContent"=>"<html><head></head><body><p>Hola,</p>Esto se envia desde brevo.</p></body></html>"
//        ];
//
//        $headers = [
//            'api-key' => $sendBrevo,
//            'Content-Type' => 'application/json',
//        ];
//        $client = new Client(['verify'=>false]);
//
//        try{
//            $response = $client->request('POST', $apiUrl,[
//                'headers' => $headers,
//                'json' => $data
//            ]);
//            $statusCode = $response->getStatusCode();
//            $responseData = json_decode($response->getBody(), true);
//            if($statusCode == 201){
//                return 'Correo enviado exitosamente';
//            }else{
//                return 'Error al enviar el correo. Código de respuesta' . $statusCode;
//            }
//        }catch(\Exception $e){
//            return 'Error al enviar el correo: '.$e->getMessage();
//        }
//    }
}
