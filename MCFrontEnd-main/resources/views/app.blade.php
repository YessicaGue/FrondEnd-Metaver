<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0YYK02PWDR"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0YYK02PWDR');
        </script>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Movimiento Ciudadano') }}</title>


        <!-- HTML Meta Tags -->
        <title>Ciudadanos en Movimiento</title>
        <meta name="description" content="Sitio de Ciudadanos en Movimiento por Lab MC">

        <!-- Facebook Meta Tags -->
        <meta property="og:url" content="https://public.ciudadanosenmovimiento.org/">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Ciudadanos en Movimiento">
        <meta property="og:description" content="Sitio de Ciudadanos en Movimiento por Lab MC">
        <meta property="og:image" content="https://dashboard.ciudadanosenmovimiento.org/opengraph.png">

        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta property="twitter:domain" content="public.ciudadanosenmovimiento.org">
        <meta property="twitter:url" content="https://public.ciudadanosenmovimiento.org/">
        <meta name="twitter:title" content="Ciudadanos en Movimiento">
        <meta name="twitter:description" content="Sitio de Ciudadanos en Movimiento por Lab MC">
        <meta name="twitter:image" content="https://dashboard.ciudadanosenmovimiento.org/opengraph.png">


        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://fonts.bunny.net/css?family=abeezee:400,500,600,800,900&display=swap" rel="stylesheet" />
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <!-- Google Maps & Places -->
        <script id="google-maps" src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAPS_API_KEY') }}&libraries=geometry,places"></script>
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
