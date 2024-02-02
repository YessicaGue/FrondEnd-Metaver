<?php

use App\Http\Controllers\Brevo\CorreoBrevoController;
use App\Http\Controllers\CallbacksController;
use App\Http\Controllers\CandidatoCHCController;
use App\Http\Controllers\EventosController;
use App\Http\Controllers\ExamenesCaminoHeroeCiudadanoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PerfilesController;
use App\Http\Controllers\PerfilesGrupalesController;
use App\Http\Controllers\CaminoCandidatoController;
use App\Http\Controllers\ElegirCaminoController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\CaminoInsigniasController;
use App\Http\Controllers\CaminoComunicacionController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\FormularioDosController;
use App\Http\Controllers\ElegibilidadController;
use App\Http\Controllers\CapacitacionController;
use App\Http\Controllers\CausaController;
use App\Http\Controllers\TresdetresController;
use App\Http\Controllers\AgendaCiudadanaController;
use App\Http\Controllers\CreaEquipoController;
use App\Http\Controllers\InicioCCController;
use App\Http\Controllers\FichaTerritorialController;
use App\Http\Controllers\MiCandidaturaController;
use App\Http\Controllers\HeroeCiudadanoController;
use App\Http\Controllers\PerfilCandidatoController;
use App\Http\Controllers\MultiversoTutorialController;
use App\Http\Controllers\ListaPerfilesController;
use App\Http\Controllers\VoluntariosController;
use App\Http\Controllers\CausasController;
use App\Http\Controllers\CodigosInvitacionController;
use App\Http\Controllers\EscuchasController;
use App\Http\Controllers\FunnelController;
use App\Http\Controllers\OchoAccionesController;
use App\Http\Controllers\PublicacionesController;
use App\Http\Controllers\PublicacionesPerfilesGrupalesController;
use App\Http\Controllers\ExternalLoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuPerfilesController;
use App\Http\Controllers\PerfilesUsuariosController;
use App\Http\Controllers\UsuarioPerfilGrupalController;
use App\Http\Controllers\TokensController;
use App\Http\Controllers\ListaDirectorioInternoController;
use App\Http\Controllers\CaminoHeroeCiudadanoController;
use App\Http\Controllers\BienvenidaController;
use App\Http\Controllers\CartaEvidenciaController;
use App\Http\Controllers\ApoyarCandidatoController;
use App\Http\Controllers\RegistroAsistenciaController;
use App\Http\Controllers\PerfilPrecandidaturaController;
use App\Http\Controllers\PropsInertiaBuilderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\SoporteController;
use App\Http\Controllers\MercaditoNaranjaController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('web')->group(function () {
    $user = Auth::user()->id ?? null;

    if (!is_null($user) && isset($user->expired) && $user->expired == true)
        Auth::logout();

    Route::get('/', [HomeController::class, 'index'])->name('/');

    Route::get('/perfil/init/remote', [PerfilesController::class, 'initFromDashboard'])->name('perfil.init.page');

    Route::get('/registro', [PerfilesUsuariosController::class, 'index'])->name('registro');
    Route::post('/crear-registro-perfil', [PerfilesUsuariosController::class, 'registro'])->name('crear.registro.perfil');
    Route::get('/registro-chc', [PerfilesUsuariosController::class, 'indexCHC'])->name('registro.chc');

    // Eventos
    Route::get('/eventos', [EventosController::class, 'index'])->name('eventos.page');
    Route::get('/evento/{id}', [EventosController::class, 'showOne'])->name('evento.page');

    // Voluntarios
    Route::get('/voluntarios', [VoluntariosController::class, 'index'])->name('voluntarios.page');

    // Causas
    Route::get('/causas', [CausasController::class, 'index'])->name('causas.page');

    // Agenda Ciudadana
    Route::get('/agenda-ciudadana', [AgendaCiudadanaController::class, 'index'])->name('agenda.ciudadana.page');

    // Ficha Territorial
    Route::get('/ficha-territorial', [FichaTerritorialController::class, 'index'])->name('ficha.territorial.page');

    // Causas
    Route::get('/tres-de-tres', [TresdetresController::class, 'index'])->name('tres.de.tres.page');

    // Ocho Acciones
    Route::get('/ocho-acciones', [OchoAccionesController::class, 'index'])->name('ocho.acciones.page');

    // Publicaciones
    Route::get('/publicacion/{url}', [PublicacionesController::class, 'showOne'])->name('publicacion.page');
    Route::get('/publicacion/grupal/{url}', [PublicacionesPerfilesGrupalesController::class, 'showOne'])->name('publicacion.grupal.page');

    // MenuPerfiles
    Route::get('/menu-perfiles', [MenuPerfilesController::class, 'index'])->name('menu.perfiles.page');
    Route::get('/tag-perfil-grupal', [MenuPerfilesController::class, 'setGrupal'])->name('tag.perfil.grupal');
    Route::get('/untag-perfil-grupal', [MenuPerfilesController::class, 'unsetGrupal'])->name('untag.perfil.grupal');

    // Perfil
    Route::get('/perfil/v2', [PerfilesController::class, function () {
        $user = PropsInertiaBuilderController::make(Auth::user()->id ?? null);
        return Inertia::render("Perfiles/indexnew", [
            "auth" => [
                "user" => $user,
            ]
        ]);
    }])->name('perfil.page');
    Route::get('/perfil', [PerfilesController::class, 'readOne'])->name('perfil.page');
    Route::get('/perfiles', [PerfilesController::class, 'readAll'])->name('perfiles.page');
    Route::get('/perfil/crear', [PerfilesController::class, 'create'])->name('perfil.crear.page');
    Route::get('/perfil/settings', [PerfilesController::class, 'showSettings'])->name('perfil.settings.page');
    Route::get('/perfil/{nombre}', [PerfilesController::class, 'readOne'])->name('perfil.page.custom');

    // PerfilGrupal
    Route::get('/perfil-grupal', [PerfilesGrupalesController::class, 'readOne'])->name('perfil.grupal.page');
    Route::get('/perfiles-grupales', [PerfilesGrupalesController::class, 'readAll'])->name('perfiles.grupales.page');
    Route::get('/perfil-grupal/crear', [PerfilesGrupalesController::class, 'create'])->name('perfil.grupal.crear.page');
    Route::get('/perfil-grupal/settings', [PerfilesGrupalesController::class, 'showSettings'])->name('perfil.grupal.settings.page');
    Route::get('/perfil-grupal/{nombre}', [PerfilesGrupalesController::class, 'readOne'])->name('perfil.grupal.page.custom');

    // Callbacks
    Route::get('/instagram/auth', [CallbacksController::class, 'instagram'])->name('instagram.auth');

    // ExternalLoginController
    Route::post('/iniciar-sesion', [ExternalLoginController::class, 'login'])->name('post.iniciar.sesion');

    // Camino al candidato
    Route::get('/camino-del-heroe-ciudadano', [CaminoCandidatoController::class, 'index'])->name('camino.candidato.page');

    // Escuchas
    Route::get('/movimiento-escucha', [EscuchasController::class, 'index'])->name('movimiento.escucha.registro.page');

    // Contrato
    Route::get('/carta-compromiso', [ContratoController::class, 'index'])->name('carta.compromiso.page');

    // Camino Insignias
    Route::get('/camino-insignias', [CaminoInsigniasController::class, 'index'])->name('camino.insignias.page');

    // Camino Comunicacion
    Route::get('/camino-comunicacion', [CaminoComunicacionController::class, 'index'])->name('camino.comunicacion.page');

    // Mi Candidatura
    Route::get('/mi-camino', [MiCandidaturaController::class, 'index'])->name('candidatura.page');

    // Heroe ciudadano
    Route::get('/heroe-ciudadano', [HeroeCiudadanoController::class, 'index'])->name('heroe.ciudadano.page');

    // Elegibilidad
    Route::get('/valores-principios', [ElegibilidadController::class, 'index'])->name('elegibilidad.page');

    // Capacitacion
    Route::get('/capacitacion', [CapacitacionController::class, 'index'])->name('capacitacion.page');

    // Causa
    Route::get('/causa', [CausaController::class, 'index'])->name('causa.page');

    // Crea tu equipo
    Route::get('/crea-tu-equipo', [CreaEquipoController::class, 'index'])->name('crea.equipo.page');

    // Bienvenid@ al camino del heroe ciudadano
    Route::get('/bienvenida-camino-heroe-ciudadano', [InicioCCController::class, 'index'])->name('iniciocc.page');

    // Perfil del Heroe Ciudadano
    Route::get('/perfil-del-heroe-ciudadano', [PerfilCandidatoController::class, 'index'])->name('perfil.candidato.page');

    // Formulario
    Route::get('/formulario', [FormularioController::class, 'index'])->name('formulario.page');

    // Formulario2
    Route::get('/formulario2', [FormularioDosController::class, 'index'])->name('formulario2.page');

    // Funnel
    Route::get('/participar-me', [FunnelController::class, 'index'])->name('participar.me.page');

    // ListaPerfiles
    Route::get('/lista-perfiles', [ListaPerfilesController::class, 'index'])->name('lista.perfiles.page');
    Route::get('/lista-perfiles-grupales', [ListaPerfilesController::class, 'indexGrupales'])->name('lista.perfiles.grupales.page');

    //ListaInternos
    Route::get('/lista-directorio-interno', [ListaDirectorioInternoController::class, 'index'])->name('lista.directorio.interno.page');

    // Camino Naranja
    Route::get('/camino-naranja', [ElegirCaminoController::class, 'naranja'])->name('camino.naranja.page');

    // Camino Violeta
    Route::get('/camino-violeta', [ElegirCaminoController::class, 'violeta'])->name('camino.violeta.page');

    // Camino Fosfo
    Route::get('/camino-fosfo', [ElegirCaminoController::class, 'fosfo'])->name('camino.fosfo.page');

    // Camino Blanco
    Route::get('/camino-blanco', [ElegirCaminoController::class, 'blanco'])->name('camino.blanco.page');

    // Camino electrico
    Route::get('/camino-electrico', [ElegirCaminoController::class, 'electrico'])->name('camino.electrico.page');

    // Camino Celeste
    Route::get('/camino-celeste', [ElegirCaminoController::class, 'celeste'])->name('camino.celeste.page');

    // Camino Limon
    Route::get('/camino-limon', [ElegirCaminoController::class, 'limon'])->name('camino.limon.page');

    // Camino arcoiris
    Route::get('/camino-arcoiris', [ElegirCaminoController::class, 'arcoiris'])->name('camino.arcoiris.page');

    // Camino Tornasol
    Route::get('/camino-tornasol', [ElegirCaminoController::class, 'tornasol'])->name('camino.tornasol.page');

    // Herramientas
    Route::get('/herramientas', function () {
        return Inertia::render('CaminoCandidato/Herramientas', []);
    })->name('herramientas.page');

    // Coordinador de Campaña
    Route::get('/cordinador-de-campana', [CreaEquipoController::class, 'coordinador'])->name('1cordinador.page');

    // Agenda
    Route::get('/agenda', [CreaEquipoController::class, 'agenda'])->name('2agenda.page');

    // Juridico
    Route::get('/juridico', [CreaEquipoController::class, 'juridico'])->name('3juridico.page');

    // Presupuesto
    Route::get('/presupuesto', [CreaEquipoController::class, 'presupuesto'])->name('4presupuesto.page');

    // Estrategia Politica
    Route::get('/estrategia-politica', [CreaEquipoController::class, 'estrategiaPolitica'])->name('5estrategia.politica.page');

    // Estrategia Territorial
    Route::get('/estrategia-territorial', [CreaEquipoController::class, 'estrategiaTerritorial'])->name('6estrategia.territorial.page');

    // Analisis Territorial
    Route::get('/analisis-territorial', [CreaEquipoController::class, 'analisisTerritorial'])->name('7analisis.territorial.page');

    // Estrategia de Aire
    Route::get('/estrategias-de-aire', [CreaEquipoController::class, 'estrategiaAire'])->name('8estrategia.aire.page');

    // Redes sociales
    Route::get('/redes-sociales', [CreaEquipoController::class, 'redesSociales'])->name('9redes.sociales.page');

    // Causa Social
    Route::get('/causa-social', [CreaEquipoController::class, 'causaSocial'])->name('10causa.social.page');

    // Causa Social
    Route::get('/asamblea-ciudadana', [CreaEquipoController::class, 'asambleaCiudadana'])->name('11asamblea.ciudadana.page');
    // RG
    Route::get('/rg', [CreaEquipoController::class, 'rg'])->name('12RG.page');

    // RC
    Route::get('/rc', [CreaEquipoController::class, 'rc'])->name('13RC.page');

    // Activistas
    Route::get('/activista(s)', [CreaEquipoController::class, 'activista'])->name('14activista.page');

    // CartasEvidencias
    Route::get('/cartas-evidencias', [CartaEvidenciaController::class, 'index'])->name('cartas.evidencias.page');
    Route::post('/cartas-evidencias/post', [CartaEvidenciaController::class, 'editPDFCartaEvidencia'])->name('post.cartas.evidencias.page');

    // Multiverso Tutorial
    Route::get('/multiverso-tutorial', [MultiversoTutorialController::class, 'index'])->name('multiverso.tutorial.page');

    // TableroJuegos
    Route::get('/juegos', function () {
        return Inertia::render('Juegos/Juegos', []);
    })->name('juegos.page');

    Route::get('/juegos/memorama', function () {
        return Inertia::render('Juegos/MemoryGame', []);
    })->name('juegos.memory.game');

    Route::get('/juegos/airplane', function () {
        return Inertia::render('Juegos/AirplaneGame', []);
    })->name('juegos.airplane.game');

    Route::get('/invitado', [CodigosInvitacionController::class, 'index'])->name('invitado.page');

    // Bienvenida
    Route::get('/bienvenida', [BienvenidaController::class, 'index'])->name('bienvenida.page');

    Route::get('/apoyar-precandidatura/{candidato}', [ApoyarCandidatoController::class, 'index'])
        ->name('apoyar.candidato.page');

    Route::get('/registro-asistencia', [RegistroAsistenciaController::class, 'index'])->name('registro.asistencia.page');

    Route::get('/soporte', [SoporteController::class, 'index'])->name('soporte');

    //Mercadito Naranja
    Route::get('/mercadito-naranja', [MercaditoNaranjaController::class, 'index'])->name('mercadito-naranja.page');
    Route::get('/mercadito-naranja-bebidas', [MercaditoNaranjaController::class, 'indexbebidas'])->name('mercadito-naranja-bebidas.page');
    Route::get('/mercadito-naranja-gadgets', [MercaditoNaranjaController::class, 'indexgadgets'])->name('mercadito-naranja-gadgets.page');
    Route::get('/mercadito-naranja-oficinas', [MercaditoNaranjaController::class, 'indexoficina'])->name('mercadito-naranja-oficinas.page');
    Route::get('/mercadito-naranja-textiles', [MercaditoNaranjaController::class, 'indextextiles'])->name('mercadito-naranja-textiles.page');
    Route::get('/mercadito-naranja-nivel', [MercaditoNaranjaController::class, 'indexnivel'])->name('mercadito-naranja-nivel.page');


});

Route::middleware(['auth'])->group(function () {
    Route::get('/apoyar-precandidatura/firmas/{candidato}', [ApoyarCandidatoController::class, 'apoyosCandidatoView'])
        ->name('apoyar.candidato.firmas.page');
});

// API workaround
Route::prefix('api')->middleware('web')->group(function () {
    $user = Auth::user()->id ?? null;

    if (!is_null($user) && isset($user->expired) && $user->expired == true)
        Auth::logout();

    // Rutas para inicializacion de perfiles
    Route::get('/perfil/init', [PerfilesController::class, 'init'])->name('perfil.init');

    // PublicacionesController
    Route::get('/publicaciones/{id}', [PublicacionesController::class, 'readAll'])->name('get.publicaciones');
    Route::post('/publicacion', [PublicacionesController::class, 'create'])->name('post.publicacion');
    Route::put('/publicacion/{id}', [PublicacionesController::class, 'update'])->name('put.publicacion');
    Route::delete('/publicacion/{id}', [PublicacionesController::class, 'delete'])->name('delete.publicacion');
    Route::get('/publicacion/imagen/{path}', [PublicacionesController::class, 'readOneImage'])->name('get.publicacion.imagen');
    Route::post('/publicacion/imagen', [PublicacionesController::class, 'createImage'])->name('post.publicacion.imagen');
    Route::get('/publicacion/imagen/{path?}', [PublicacionesController::class, 'readImage'])->name('get.publicacion.imagen')->where('path', '.*');
    Route::post('/publicacion/portada/imagen', [PublicacionesController::class, 'createPublicacionImage'])->name('post.publicacion.portada.imagen');
    Route::post('/publicacion-apoyo-precandidatura', [PublicacionesController::class, 'createForApoyoPrecandidatura'])->name('post.apoyo-candidatura.evento');

    // PublicacionesPerfilesGrupalesController
    Route::get('/publicaciones/grupal/{id}', [PublicacionesPerfilesGrupalesController::class, 'readAll'])->name('get.publicaciones.grupal');
    Route::post('/publicacion/grupal', [PublicacionesPerfilesGrupalesController::class, 'create'])->name('post.publicacion.grupal');
    Route::put('/publicacion/grupal/{id}', [PublicacionesPerfilesGrupalesController::class, 'update'])->name('put.publicacion.grupal');
    Route::delete('/publicacion/grupal/{id}', [PublicacionesPerfilesGrupalesController::class, 'delete'])->name('delete.publicacion.grupal');
    Route::post('/publicacion/grupal/imagen', [PublicacionesPerfilesGrupalesController::class, 'createImage'])->name('post.publicacion.grupal.imagen');
    Route::get('/publicacion/grupal/imagen/{path?}', [PublicacionesPerfilesGrupalesController::class, 'readImage'])->name('get.publicacion.grupal.imagen')->where('path', '.*');
    Route::post('/publicacion/grupal/portada/imagen', [PublicacionesPerfilesGrupalesController::class, 'createPublicacionImage'])->name('post.publicacion.grupal.portada.imagen');
    Route::get('/publicaciones/grupal/leer/todos/{id}', [PublicacionesPerfilesGrupalesController::class, 'leerTodos'])->name('get.publicaciones.grupales');

    // EventosController
    Route::get('/eventos', [EventosController::class, 'readAll'])->name('get.eventos');

    // PerfilesController
    Route::get('/perfil/usuario/{id}', [PerfilesController::class, 'readSessionOne'])->name('get.perfil.usuario');
    Route::get('/perfil/foto/{id}', [PerfilesController::class, 'getProfilePhoto'])->name('get.perfil.foto');
    Route::post('/perfil', [PerfilesController::class, 'update'])->name('post.perfil');
    Route::post('/perfil/updateRrss', [PerfilesController::class, 'updateRsss'])->name('post.rrss.perfil');
    Route::post('/perfil/followage', [PerfilesController::class, 'getFollow'])->name('post.perfil.followage');
    Route::post('/perfil/follow', [PerfilesController::class, 'giveFollow'])->name('post.perfil.follow');
    Route::post('/perfil/foto', [PerfilesController::class, 'editProfilePhoto'])->name('post.perfil.foto');
    Route::put('/perfil', [PerfilesController::class, 'updateV2'])->name('put.perfil');

    // PerfilesGrupalesController
    Route::get('/perfil/grupal/usuario/{id}', [PerfilesGrupalesController::class, 'readSessionOne'])->name('get.perfil.grupal.usuario');
    Route::get('/perfil/grupal/foto/{id}', [PerfilesGrupalesController::class, 'getProfilePhoto'])->name('get.perfil.grupal.foto');
    Route::post('/perfil/grupal/init', [PerfilesGrupalesController::class, 'init'])->name('post.perfil.grupal.init');
    Route::post('/perfil/grupal/updateRrss', [PerfilesGrupalesController::class, 'updateRsss'])->name('post.rrss.perfil.grupal');
    Route::post('/perfil/grupal/followage', [PerfilesGrupalesController::class, 'getFollow'])->name('post.perfil.grupal.followage');
    Route::post('/perfil/grupal/follow', [PerfilesGrupalesController::class, 'giveFollow'])->name('post.perfil.grupal.follow');
    Route::post('/perfil/grupal/foto', [PerfilesGrupalesController::class, 'editProfilePhoto'])->name('post.perfil.grupal.foto');
    Route::put('/perfil/grupal/editar', [PerfilesGrupalesController::class, 'update'])->name('put.perfil.grupal.editar');
    Route::put('/perfil-grupal', [PerfilesGrupalesController::class, 'updateV2'])->name('put.perfil-grupal');
    Route::put('/perfil/grupal/editar/urlvideo', [PerfilesGrupalesController::class, 'updateUrlVideo'])->name('put.editar.urlvideo');
    Route::post('/perfil/grupal/foto/portada', [PerfilesGrupalesController::class, 'editCoverPhoto'])->name('post.perfil.grupal.foto.portada');
    Route::get('/perfil/grupal/foto/portada/{id}', [PerfilesGrupalesController::class, 'getCoverPhoto'])->name('get.perfil.grupal.foto.portada');

    //CaminoHeroeCiudadano
    Route::post('/heroeCiudadano/primerRegistro', [CaminoHeroeCiudadanoController::class, 'postPrimerRegistro'])->name('post.ciudadano.primer.registro');
    Route::post('/heroeCiudadano/segundaRonda', [CaminoHeroeCiudadanoController::class, 'postSegundaRonda'])->name('post.ciudadano.segunda.ronda');
    Route::post('/heroeCiudadano/segundaEtapaRegistro', [CaminoHeroeCiudadanoController::class, 'postSegundaEtapaRegistro'])->name('post.segunda.etapa.registro');
    Route::post('/heroeCiudadano/terceraEtapaRegistro', [CaminoHeroeCiudadanoController::class, 'postTerceraEtapaRegistro'])->name('post.tercer.etapa.registro');

    //CandidatoCHC
    Route::put('/candidatosCHC/actualizarCamino/{camino}', [CandidatoCHCController::class, 'putActualizarCamino'])->name('put.actualizar.camino');

    //ExamenesCaminoAlCandidato
    Route::get('/examenes/caminoCanditado/{id}', [ExamenesCaminoHeroeCiudadanoController::class, 'readOne'])->name('get.examen');
    Route::post('/examenes/postRegistroExamen', [ExamenesCaminoHeroeCiudadanoController::class, 'postRegistroExamen'])->name('post.registro.examen');
    //CartaCompromisoCHC
    Route::post('/cartaCompromiso/post-carta-compromiso', [ContratoController::class, 'editPDFContrato'])->name('edit.pdf.contrato');

    // VoluntariosController
    Route::get('/voluntarios/catalogos', [VoluntariosController::class, 'getCatalogos'])->name('get.voluntarios.catalogos');
    Route::post('/voluntario', [VoluntariosController::class, 'create'])->name('post.voluntario');
    Route::get('/entidad/{nombre}', [VoluntariosController::class, 'getEntidad'])->name('get.entidad');
    Route::get('/intereses/{id}', [VoluntariosController::class, 'getInteresGrupoInteresesByGrupo'])->name('get.intereses.by.grupo');

    // CausasController
    Route::get('/causas/catalogos', [CausasController::class, 'getCatalogos'])->name('get.causas.catalogos');
    Route::post('/causa', [CausasController::class, 'create'])->name('post.causa');
    Route::get('/entidad/{nombre}', [CausasController::class, 'getEntidad'])->name('get.entidad');

    // OchoAccionesController
    Route::get('/ochoAcciones/catalogos', [OchoAccionesController::class, 'getCatalogos'])->name('get.ocho.acciones.catalogos');
    Route::post('/ochoAcciones', [OchoAccionesController::class, 'create'])->name('post.ocho.acciones');
    Route::get('/entidad/{nombre}', [OchoAccionesController::class, 'getEntidad'])->name('get.entidad');

    // EscuchasController
    Route::post('/movimiento-escucha', [EscuchasController::class, 'create'])->name('post.movimiento.escucha');

    // TokensController
    Route::get('/token/{id}', [TokensController::class, 'readOne'])->name('get.token.external');
    Route::get('/token', [TokensController::class, 'read'])->name('get.token');
    /** acepta queries user y tokentype */
    Route::post('/token', [TokensController::class, 'create'])->name('post.token.external');
    Route::get('/tokens/refresh', [TokensController::class, 'refresh'])->name('get.tokens.refresh');

    // CodigosInvitacionController
    Route::post('/check-codigo-invitacion', [CodigosInvitacionController::class, 'check'])->name('check.codigo.invitacion');
    Route::post('/codigo-invitacion', [CodigosInvitacionController::class, 'create'])->name('post.codigo.invitacion');

    Route::get('/eject-to-dashboard', [PerfilesUsuariosController::class, 'createUserFromPublicDomain'])->name('eject.to.dashboard');

    Route::get('/apoyar-precandidatura/{id}', [ApoyarCandidatoController::class, 'getApoyosPrecandidato'])->name('get.apoyar.candidato.data');
    Route::post('/apoyar-precandidatura', [ApoyarCandidatoController::class, 'create'])->name('post.apoyar-precandidatura');

    //Registro Asistncia
    Route::post('/registro-asistencia/post', [RegistroAsistenciaController::class, 'postRegistroParticipacion'])->name('registro.asistencia.post');

    Route::put('/perfil-precandidatura/{id}', [PerfilPrecandidaturaController::class, 'update'])->name('put.perfil-precandidatura');
    Route::post('/perfil-precandidatura/imagen-perfil', [PerfilPrecandidaturaController::class, 'uploadPhoto'])->name('post.perfil-precandidatura.imagen-perfil');

    //EnvioMailBrevo
    Route::post('/envio-mail-brevo-firmas/post', [CorreoBrevoController::class, 'sendEmail'])->name('correo.registro.asistencia');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/cerrar-sesion', [ExternalLoginController::class, 'logout'])->name('get.cerrar.sesion');

Route::get('/prueba', function () {
    return Inertia::render('Prueba/index', []);
})->name('prueba.page');

require __DIR__ . '/auth.php';
require __DIR__ . '/change_org_front.php';
require __DIR__ . '/chc_routes.php';
require __DIR__ . '/registro_distritos.php';
