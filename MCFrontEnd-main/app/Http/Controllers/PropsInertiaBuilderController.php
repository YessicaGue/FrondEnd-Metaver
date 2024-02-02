<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropsInertiaBuilderController extends Controller
{
    public static function make($user) {
        try {
            unset(
                $user["updated_at"],
                $user["bearer"],
                $user["password"],
            );
        } finally {
            return $user;
        }
    }
}
