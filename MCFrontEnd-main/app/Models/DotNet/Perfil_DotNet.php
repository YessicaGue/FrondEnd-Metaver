<?php

namespace App\Models\DotNet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil_DotNet extends Model
{
    use HasFactory;

    protected $connection = 'dotnet';
    protected $table = 'perfil';

    protected $fillable = [
        'guid',
        'alias',
        'descripcion',
        'activo',
        'url',
        'custom_url',
        'es_publico'
    ];

    protected $casts = [
        'activo' => 'boolean',
        'es_publico' => 'boolean'
    ];

    public static function buscarPorAlias($parametro)
    {
        $parametroFormateado = str_replace(' ', '', strtolower($parametro));

        return self::whereRaw("REPLACE(LOWER(alias), ' ', '') = ?", [$parametroFormateado])
            ->first();
    }
}
