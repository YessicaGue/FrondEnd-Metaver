import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import logoMC from './logo_mc_blco.png';
import TextField from '@mui/material/TextField'
import {Typography, Button, FormControlLabel, Checkbox, Link, CircularProgress} from '@mui/material';
import {CustomGeocoder} from "@/Pages/CaminoCandidato/CustomGeocoder";
import {MuiTelInput} from "mui-tel-input";
import { estados } from '@/data/estados';
import {sexos} from "@/data/sexos";
import {CustomSelect} from "@/Components/Customized/CustomComponents/CustomSelect";
import axios from "axios";
import Swal from "sweetalert2";
import {CustomDatePicker} from "@/Pages/Voluntarios/CustomDatePicker";
import dayjs from "dayjs";

const RegistroAsistencia = () => {

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [edad, setEdad] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [direccionCompleto, setDireccionCompleto] = useState('');
    const [avisoAceptado, setAvisoAceptado] = useState(false);
    const [informacionAdicionalAceptado, setInformacionAdicionalAceptado] = useState(false);

    const [participarEnActividades, setParticiparEnActividades] = useState(false)
    const [movimientoEnColonia, setMovimientoEnColonia] = useState(false)
    const [representanteDeCasilla, setRepresentanteDeCasilla] = useState(false)
    const [experienciaPrevia, setExperienciaPrevia] = useState(false)
    const [afiliarseAMovimientoCiudadano, setAfiliarseAMovimientoCiudadano] = useState(false)
    const [colocarPublicidadEnDomicilio, setColocarPublicidadEnDomicilio] = useState(false)
    const [nombreEvento, setNombreEvento] = useState('')
    const [organizadorEvento, setOrganizadorEvento] = useState('')
    const [lugarEvento, setLugarEvento] = useState('')
    const [folioEvento, setFolioEvento] = useState('')
    const [fechasEvento, setFechaEvento] = useState(dayjs().startOf('day'));
    const [loading, setLoading ] = useState(false)
    const [loadingBoton, setLoadingBoton ] = useState(false)
    const [estado, setEstado] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccionObjeto, setDireccionObjeto] = useState(null);
    const [telefonoParticular, setTelefonoParticular] = useState('');
    const [infoTelefono, setInfoTelefono] = useState('')

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [numeroCalle, setNumeroCalle] = useState('');
    const [calle, setCalle] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

    const [validoCorreoElectronico, setValidoCorreoElectronico] = useState(false);

    const handleEnviarClick = async () =>{
        setFormSubmitted(true);
        setLoadingBoton(true);
        const nombreABuscar = estado;
        let idEncontrado = 0;
        const entidadEncontrada = estados.find(entidad => entidad.nombre === nombreABuscar)

        if (entidadEncontrada) {
            idEncontrado = entidadEncontrada.id
            console.log(`La entidad "${nombreABuscar}" tiene el ID ${idEncontrado}`);
        } else {
            console.log(`No se encontró la entidad "${nombreABuscar}"`)
        }

        const data = {
            nombre,
            apellidos,
            edad,
            generoId,
            correoElectronico,
            telefonoParticular,
            participarEnActividades,
            movimientoEnColonia,
            representanteDeCasilla,
            experienciaPrevia,
            afiliarseAMovimientoCiudadano,
            colocarPublicidadEnDomicilio,
            informacionAdicionalAceptado,
            nombreEvento,
            organizadorEvento,
            lugarEvento,
            fechasEvento,
            folioEvento,
            direccion,
            numeroCalle,
            calle,
            ciudad,
            idEncontrado,
            codigoPostal,
            pais,
            lat,
            lng,
        }
        console.log(data);
        try{
            const response = await axios.post(route('registro.asistencia.post'), data);
            if (response.status===200) {
                await Swal.fire('¡Felicidades!', 'Datos enviados correctamente', 'success')
                window.location.reload();
            }
        } catch (error) {
            if (error?.response?.status === 419)
                return Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            let msg = error.response?.data?.message?.message?.message??'Hubo un error al guardar';
            return Swal.fire({
                title: msg,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }finally
        {
            setLoadingBoton(false);
        }
    }

  return (
    <>
        <CustomLayout>
            <header className='w-full bg-orange-400 gap-2 px-2 md:px-10 lg:px-20 py-20 flex'>
                <div class="flex flex-1 items-center justify-end sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-start justify-start">
                        {/* <img class="h-8 w-auto" src="" alt=""> */}
                        <img src={logoMC} alt="Logo MC" className="h-12 md:h-28 lg:h-30 justify-start" />
                    </div>
                </div>
                <div class='flex flex-col font-bold uppercase tracking-wide font-medium'>
                    <div class='flex space-x-2 sm:text-3xl md:text-3xl lg:text-6xl justify-end mr-4 tracking-wide text-center font-semibold font-[Poppins]'>
                        <p class='uppercase tracking-wide text-center text-white font-bold font-[Poppins]'>
                            registro de
                        </p>
                    </div>
                    <div class='flex justify-center text-center bg-orange-600 p-4 rounded-xl'>
                        <p class='md:text-xl lg:text-4xl xl:text-6xl uppercase text-white font-extra-small tracking-widest text-center font-bold font-[Poppins]'>
                            asistencia a eventos
                        </p>
                    </div>
                </div>
            </header>

            <body>
            <div className='bg_naranja max-w-7xl mx-auto px-2 mt-10 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                <h1 className='uppercase font-bold text-xl md:text-3xl lg:text-4xl tracking-widest text-center font-[Poppins]'>queremos escucharte y hacerte llegar más información</h1>
                <h1 className='font-bold text-xl md:text-2xl lg:text-3xl text-center'>sobre Movimiento Ciudadano y nuestras próximas actividades</h1>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 p-10 lg:m-10 bg_naranja2'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-center font-[Poppins]'>Nombre:</h1>
                    <TextField
                        className='grid col-span-2 border-b-2 border-orange-200 text-center text-orange'
                        label="Nombre(s)"
                        variant="outlined"
                        id="nombre"
                        name="nombre"
                        value={ nombre }
                        onChange={(event) => setNombre(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && nombre.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && nombre.length <= 0 }
                    />
                    <TextField
                        className='grid col-span-2'
                        label="Apellidos"
                        variant="outlined"
                        required
                        fullWidth
                        id="apellidos"
                        name="apellidos"
                        value={ apellidos }
                        onChange={(event) => setApellidos(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && apellidos.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && apellidos.length <= 0 }
                    />
                </div>
                <div className='p-10 lg:m-10 bg_naranja2'>
                <div className='grid grid-cols-1 lg:grid-cols-6'>
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] pb-2'>Edad:</h1>
                    <TextField
                        className='grid col-span-2'
                        label="Edad"
                        variant="outlined"
                        required
                        fullWidth
                        id="edad"
                        name="edad"
                        value={ edad }
                        onChange={(event) => {
                            const inputValue = event.target.value;
                            if (/^\d*$/.test(inputValue)) {
                                setEdad(inputValue)
                            }else {
                                setEdad(''); // Borra el valor si no es un número
                            }
                        }
                        }
                        helperText={ formSubmitted && !/^\d*$/.test(edad) ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && !/^\d*$/.test(edad) }
                    />
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] py-2'>Género:</h1>
                    <div className='grid col-span-2'>
                        <CustomSelect
                            id="genero"
                            label="Género"
                            name="genero"
                            value={ generoId }
                            list={ sexos }
                            onChange={(event) => setGeneroId(event.target.value)}
                            helperText={ formSubmitted && !generoId ? 'Selecciona un género' : '' }
                            error={ formSubmitted && !generoId }
                        />
                    </div>
                </div>
                    <div className='grid col-span-6 mt-6'>
                        <h1 className='text-2xl font-semibold text-center font-[Poppins] pb-2'>Lugar donde vives:</h1>
                        <CustomGeocoder
                            label="Dirección"
                            name="direccion"
                            value={ direccion }
                            object={ direccionObjeto }
                            onChange={(value) => {
                                setDireccionObjeto(value);

                                const geocoder = new window.google.maps.Geocoder();

                                geocoder
                                    .geocode({ placeId: value?.place_id ?? '' })
                                    .then(({results}) => {
                                        const [{ address_components, geometry }] = results;
                                        const lat = geometry.location.lat();
                                        const lng = geometry.location.lng();

                                        const [{ long_name: numeroCalle } = { long_name: '' }] = address_components.filter((element) => element.types.includes('street_number'));
                                        const [{ long_name: calle } = { long_name: '' }] = address_components.filter((element) => element.types.includes('route'));
                                        const [{ long_name: estado } = { long_name: '' }] = address_components.filter((element) => element.types.includes('administrative_area_level_1'));
                                        const [{ long_name: pais } = { long_name: '' }] = address_components.filter((element) => element.types.includes('country'));
                                        const [{ long_name: codigoPostal } = { long_name: '' }] = address_components.filter((element) => element.types.includes('postal_code'));

                                        // if (estado.length <= 0 || pais.length <= 0 || pais !== 'México')

                                        setLat(lat);
                                        setLng(lng);
                                        setCalle(calle);
                                        setNumeroCalle(numeroCalle);
                                        setCodigoPostal(codigoPostal);
                                        setEstado(estado);
                                        setPais(pais);
                                        setDireccion(results[0].formatted_address);
                                    })
                            }}
                            onInputChange={(value) => {
                                setDireccion(value)
                            }}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-6 p-10 lg:m-10 bg_naranja2'>
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] pb-2'>Email:</h1>
                    <TextField
                        className='grid col-span-2'
                        label="Correo Electrónico"
                        type="email"
                        variant="outlined"
                        fullWidth
                        id="correoElectronico"
                        name="correoElectronico"
                        value={ correoElectronico }
                        onChange={(event) => {
                            setCorreoElectronico(event.target.value);
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            setValidoCorreoElectronico(emailRegex.test(event.target.value));
                        }}
                        helperText={ formSubmitted && !validoCorreoElectronico ? 'Ingresa un correo electrónico válido' : '' }
                        error={ formSubmitted && !validoCorreoElectronico }
                    />
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] py-2'>Celular:</h1>
                    <MuiTelInput
                        className='grid col-span-2'
                        fullWidth
                        label="Teléfono Particular"
                        id="telefonoParticular"
                        name="telefonoParticular"
                        defaultCountry='MX'
                        value={ telefonoParticular }
                        onChange={(value, info) => {
                            setTelefonoParticular(value);
                            setInfoTelefono(info);
                        }}
                    />
                </div>
            </div>

            <div className='bg_naranja max-w-7xl mx-auto mt-10 px-2 mt-10 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                <h1 className='uppercase font-bold text-xl md:text-3xl lg:text-4xl tracking-widest text-center font-[Poppins]'>hay muchas formas de sumar en nuestro movimiento</h1>
                <h1 className='font-semibold text-xl md:text-2xl lg:text-3xl text-center font-[Poppins] px-10'>Elije de qué manera quieres hacerlo y nos pondremos en contacto contigo</h1>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-20 mt-10'>
                    <div className=''>
                        <h1 className='bg-orange-400 text-3xl font-semibold uppercase py-3 text-center text-white rounded-lg font-[Poppins]'>Participa</h1>
                        <div className="check mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 py-4 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={participarEnActividades}
                                onChange={(e) => {
                                    setParticiparEnActividades(e.target.checked)
                                }}
                            />
                            Deseo participar en las actividades y eventos que se realicen en mi municipio.
                        </div>
                        <div className="check mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={movimientoEnColonia}
                                onChange={(e) => {
                                    setMovimientoEnColonia(e.target.checked)
                                    console.log(e.target.checked);
                                }}
                            />
                            Quiero que el Movimiento llegue a mi colonia y escuche nuestras necesidades.
                        </div>
                    </div>
                    <div>
                        <h1 className='bg-orange-400 text-3xl font-semibold uppercase py-3 text-center text-white rounded-lg font-[Poppins]'>Ayuda</h1>
                        <div className="check mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 py-4 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={ representanteDeCasilla }
                                onChange={(e) => {
                                    setRepresentanteDeCasilla(e.target.checked)
                                }}
                            />
                            Quiero ser representante de casilla y cuidar los votos de Movimiento Ciudadano.
                        </div>
                        <label className="mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 py-4 text-start">¿Lo has hecho antes?</label>
                        <div className="flex m-2 font-bold md:text-xl text-gray-600 px-8 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={ experienciaPrevia }
                                onChange={() => {
                                    setExperienciaPrevia(true);
                                }}
                            /> Si
                            <input
                                type="checkbox"
                                className="ml-4 mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={ !experienciaPrevia }
                                onChange={() => {
                                    setExperienciaPrevia(false);
                                }}
                            /> No
                        </div>
                    </div>
                    <div>
                        <h1 className='bg-orange-400 text-3xl font-semibold uppercase py-3 text-center text-white rounded-lg font-[Poppins]'>Súmate</h1>
                        <div className="check mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 py-4 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={ afiliarseAMovimientoCiudadano }
                                onChange={(e) => {
                                    setAfiliarseAMovimientoCiudadano(e.target.checked)
                                }}
                            />
                            Deseo afiliarme a Movimiento Ciudadano.
                        </div>
                        <div className="check mb-2 ml-2 font-bold md:text-xl text-gray-600 px-8 py-4 text-start">
                            <input
                                type="checkbox"
                                className="mr-2 bg_naranja2 p-2 border-red-200 border-4 rounded"
                                checked={ colocarPublicidadEnDomicilio }
                                onChange={(e) => {
                                    setColocarPublicidadEnDomicilio(e.target.checked)
                                    console.log(e.target.checked);
                                }}
                            />
                            Deseo colocar publicidad de Movimiento Ciudadano en mi domicilio.
                        </div>

                    </div>
                </div>
            </div>

            <div className='bg_naranja max-w-7xl mx-auto px-2 mt-10 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                <div className=' grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-10 lg:mx-10 pb-6'>
                    <h1 className='text-2xl md:text-4xl font-semibold font-[Poppins] uppercase pb-6'>Aviso de privacidad:</h1>
                    <div className='col-span-3 md:text-lg'>
                        <p className='text-gray-600 font-semibold leading-tight'>
                            Los datos personales requeridos en el formato de actividades partidistas, se hace en cumplimiento a lo establecido en el artículo 12 numeral 6 de los Estatutos de Movimiento Ciudadano,
                            publicados en el DOF el día 28 de febrero de 2017. Los datos recabados, los utilizaremos para las siguientes finalidades: Posterior invitación a eventos de Movimiento Ciudadano mediante el dato de contacto proporcionado.
                            Envío de información.
                        </p>
                        <div className='flex flex-col'>
                            <a className='text-gray-900 font-bold text-xs md:text-base overflow-hidden' href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales">https://transparencia.movimientociudadano.mx/protecciondedatospersonales</a>
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={ informacionAdicionalAceptado }
                                    onChange={(event) => {
                                        setInformacionAdicionalAceptado(event.target.checked)
                                        console.log(event.target.checked)
                                    }}
                                />
                            }
                            label={
                                <div className="flex-col sm:flex-row items-start">
                                    <Typography
                                        variant="body1"
                                        display="inline"
                                    >
                                            Acepto mantenerme informado
                                    </Typography>
                                </div>
                            }
                        />
                    </div>
                </div>
                <div className=' grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 p-10 lg:m-10 bg_naranja2'>
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] pb-2'>Nombre del evento:</h1>
                    <TextField
                        className='grid col-span-2'
                        label="Nombre del evento"
                        variant="outlined"
                        required
                        fullWidth
                        id="nombreEvento"
                        name="nombreEvento"
                        value={ nombreEvento }
                        onChange={(event) => setNombreEvento(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && nombreEvento.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && nombreEvento.length <= 0 }
                    />
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] py-2'>Fecha:</h1>
                    <div className={'grid col-span-2'}>
                        <CustomDatePicker
                            className=""
                            label="Fecha"
                            id="fechaEvento"
                            name="fechaEvento"
                            inputFormat="DD/MM/YYYY"
                            value={ fechasEvento }
                            onChange={(value) => {
                                setFechaEvento(value);
                            }}
                        />
                        {
                            formSubmitted && fechasEvento.length===0
                                ?	<p className="error-text">
                                    La fecha es campo obligatorio
                                </p>
                                :	null
                        }
                    </div>
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] my-4'>Lugar:</h1>
                    <TextField
                        className='grid col-span-2'
                        label="Lugar"
                        variant="outlined"
                        required
                        fullWidth
                        id="lugarEvento"
                        name="lugarEvento"
                        value={ lugarEvento }
                        onChange={(event) => setLugarEvento(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && lugarEvento.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && lugarEvento.length <= 0 }
                    />
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] py-2'>Folio:</h1>
                    <TextField
                        className='grid col-span-2'
                        label="Folio"
                        variant="outlined"
                        required
                        fullWidth
                        id="folioEvento"
                        name="folioEvento"
                        value={ folioEvento }
                        onChange={(event) => setFolioEvento(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && folioEvento.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && folioEvento.length <= 0 }
                    />
                    <h1 className='text-2xl font-semibold text-center font-[Poppins] my-2'>Organizado por:</h1>
                    <TextField
                        className='grid col-span-2 my-2'
                        label="Organizado por"
                        variant="outlined"
                        required
                        fullWidth
                        id="organizadorEvento"
                        name="organizadorEvento"
                        value={ organizadorEvento }
                        onChange={(event) => setOrganizadorEvento(event.target.value.toUpperCase())}
                        helperText={ formSubmitted && organizadorEvento.length <= 0 ? 'El campo es obligatorio' : '' }
                        error={ formSubmitted && organizadorEvento.length <= 0 }
                    />
                </div>
                <div className='justify-center flex'>
                    <button
                        disabled={loadingBoton}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-10 rounded"
                        onClick={handleEnviarClick}
                    >
                    {
                        loadingBoton? 'Enviando': 'Enviar'
                    }
                    </button>
                </div>
            </div>

            <div className='mb-80'></div>
            </body>
        </CustomLayout>
    </>
    );
};

export default RegistroAsistencia;
