import React from 'react';
import { useState } from 'react';
import { CustomGeocoder } from './CustomGeocoder';
import Accordion from './forms';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField'
import { CustomDatePicker } from '../Voluntarios/CustomDatePicker';
import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import { MuiTelInput } from 'mui-tel-input';
import { info } from 'autoprefixer';
import { useEffect } from 'react';
import axios from 'axios';
import { estados } from '@/data/estados';
import { sexos } from '../../data/sexos';
import Swal from 'sweetalert2';

const Formulario2 = (props) => {
    const {
        camino,
    }=props;
    const caminoId = useState(camino);
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [seudonimo, setSeudonimo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(dayjs(new Date()));
    const [lugarNacimiento, setLugarNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [infoTelefono, setInfoTelefono] = useState({});
    const [telefonoParticular, setTelefonoParticular] = useState('');
    const [telefonoOficina, setTelefonoOficina] = useState('');
    const [telefonoCasa, setTelefonoCasa] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [tiempoResidencia, setTiempoResidencia] = useState(0);
    const [estado, setEstado] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccionObjeto, setDireccionObjeto] = useState(null);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [numeroCalle, setNumeroCalle] = useState('');
    const [calle, setCalle] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [curp, setCurp] = useState('');
    const [rfc, setRfc] = useState('');
    const [clave, setClave] = useState('');
    const [cargo, setCargo] = useState('');
    const [puestosAnteriores, setPuestosAnteriores] = useState('');
    const [cargosAnteriores, setCargosAnteriores] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState(dayjs(new Date()));

    const [errorCurp, setErrorCurp] = useState(false);
    const [errorRfc, setErrorRfc] = useState(false);
    const [errorClave, setErrorClave] = useState(false);
    const [errorCargo, setErrorCargo] = useState(false);
    const [errorPuestosAnteriores, setErrorPuestosAnteriores] = useState(false);
    const [errorCargosAnteriores, setErrorCargosAnteriores] = useState(false);
    const [errorComentarios, setErrorComentarios] = useState(false);
    const [errorFechaIngreso, setErrorFechaIngreso] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    //utilidades
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const enviarDatos = async () => {
        setSubmit(true);
        setLoading(true);
        if((curp.trim()==='' || errorCurp ) || (rfc.trim()==='' || errorRfc) || (clave.trim()==='' || errorClave)
            || (cargo.trim()==='' || errorCargo) || (puestosAnteriores.trim()==='' || errorPuestosAnteriores)
            || (cargosAnteriores.trim()==='' || errorCargosAnteriores) || (comentarios.trim()==='' || errorComentarios)
            || (direccion.trim()==='' || errorDireccion)){
            await Swal.fire('¡Atencion!', 'Revisa todos los campos, todos son obligatorios y que cumplan las características requeridas', 'info')
            setLoading(false);
            return ;
        }
        const nombreABuscar = estado;
        let idEncontrado = 0;
        const entidadEncontrada = estados.find(entidad => entidad.nombre === nombreABuscar);

        if (entidadEncontrada) {
            idEncontrado = entidadEncontrada.id
            console.log(`La entidad "${nombreABuscar}" tiene el ID ${idEncontrado}`);
        } else {
            console.log(`No se encontró la entidad "${nombreABuscar}"`)
        }

        const data ={
            "caminoId": camino,
            "perfilId": 0,
            "cargoPostulacion": cargo,
            "fechaIngresoMC": fechaIngreso.toISOString(),
            "puestoEleccionPopularAnteriores": puestosAnteriores,
            "cargosDesempeniadosDentroMC": cargosAnteriores,
            "comentarios": comentarios,
            "curp": curp,
            "rfc": rfc,
            "claveElector": clave,
            "direccionCompleta":direccion,
            "numeroCalle": numeroCalle,
            "nombreCalle": calle,
            "colonia": direccionObjeto.structured_formatting.secondary_text ,
            "ciudad": direccionObjeto.structured_formatting.secondary_text,
            "entidadFederativaId": idEncontrado,
            "codigoPostal": codigoPostal,
            "pais": pais,
            "latitud": lat.toString(),
            "longitud": lng.toString(),
        };
        try{
            const response = await axios.post(route('post.ciudadano.segunda.ronda'), data);
            if (response.status===200) {
                await Swal.fire('¡Felicidades!', 'Ya pertenceces a un camino', 'success')
                location.replace(route('perfil.candidato.page'))
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
            setLoading(false);
        }
    };

    const panels = [
        {
            title: 'Clave Única de Registro de la Población (CURP)',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-5">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}
                        <div className="mt-10 mx-auto">
                            <div className="flex justify-center px-auto grid grid-cols-1 gap-x-6 gap-y-8">
                                <div className="sm:col-span-2 sm:col-start-1 shadow-xl rounded-xl bg-white">
                                    <TextField
                                        required
                                        fullWidth
                                        id="curp"
                                        name="curp"
                                        label="CURP"
                                        value={curp}
                                        onChange={(event) =>{
                                            const curpValue = event.target.value.toUpperCase();
                                            setCurp(curpValue);
                                            const regexCurp = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[0-9A-Z]\d$/;
                                            const esValido = regexCurp.test(curpValue)
                                            setErrorCurp(!esValido);
                                        }}
                                        error = {errorCurp}
                                        helperText={errorCurp ? ' Campo Obligatorio o CURP no válida (debe tener 18 caracteres)' : ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
        {
            title: 'Registro Federal de Contribuyentes (RFC)',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-5">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}

                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

                        <div className="mt-10 gap-x-6 gap-y-8 mx-auto">
                            <div className='shadow-xl rounded-xl bg-white'>
                                <TextField
                                    fullWidth
                                    id="rfc"
                                    name="rfc"
                                    label="RFC"
                                    value={ rfc }
                                    onChange={(event) => {
                                        const rfcValue = event.target.value.toUpperCase();
                                        setRfc(rfcValue);
                                        const regexRFC = /^(?:[A-Z]{4}\d{6}[A-Z\d]{3}|[A-Z]{3}\d{6}[A-Z\d]{3}|X[A-Z0-9]{11})$/
                                        const esValido = regexRFC.test(rfcValue)
                                        setErrorRfc(!esValido);
                                    }
                                    }
                                    error={errorRfc}
                                    helperText={errorRfc ? 'Campo Obligatorio o RFC no válido': ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
        {
            title: 'Clave de identificación oficial',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-6">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}

                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

                        <div className="mt-10 gap-x-6 gap-y-8">
                            <div className='shadow-xl rounded-xl bg-white'>
                                <TextField
                                    fullWidth
                                    id="clave"
                                    name="clave"
                                    label="Clave"
                                    value={ clave }
                                    onChange={(event) => {
                                        const claveValue = event.target.value.toUpperCase();
                                        setClave(claveValue);
                                        const esValido = claveValue.length>=18
                                        setErrorClave(!esValido);
                                    }
                                    }
                                    error={errorClave}
                                    helperText={errorClave ? 'Campo Obligatorio o no válida': ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
        {
            title: 'Cargo para el que se postula',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-6">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}

                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className='shadow-xl rounded-xl bg-white'>
                                <TextField
                                    fullWidth
                                    id="cargo"
                                    name="cargo"
                                    label="Cargo"
                                    value={ cargo }
                                    onChange={(event) => {
                                        const valueCargo = event.target.value;
                                        setCargo(valueCargo);
                                        const valido = valueCargo.length>0;
                                        setErrorCargo(!valido)
                                    }
                                    }
                                    error={errorCargo}
                                    helperText={errorCargo ? 'Campo obligatorio':''}
                                />
                            </div>

                            <div className='sm:col-span-1 sm:col-start-1 shadow-xl rounded-xl bg-white'>
                                <CustomDatePicker
                                    label="Fecha de ingreso a Movimiento Ciudadano"
                                    id="fechaIngreso"
                                    name="fechaIngreso"
                                    inputFormat="DD/MM/YYYY"
                                    value={ fechaIngreso }
                                    className="w-full"
                                    onChange={(newValue) => setFechaIngreso(newValue)}
                                />
                            </div>

                            <div className='sm:col-span-1 sm:col-start-1 shadow-xl rounded-xl bg-white'>
                                <TextField
                                    fullWidth
                                    id="cargo"
                                    name="cargo"
                                    label="Puestos de elección popular ocupados con anterioridad"
                                    value={ puestosAnteriores }
                                    onChange={(event) => {
                                        const valuePuesto = event.target.value;
                                        setPuestosAnteriores(valuePuesto);
                                        const valido = valuePuesto.length>='ninguno'.length;
                                        setErrorPuestosAnteriores(!valido)
                                    }
                                    }
                                    error={errorPuestosAnteriores}
                                    helperText={errorPuestosAnteriores? 'Campo obligatorio':'Ingrese "Ninguno" si no aplica'}
                                />
                            </div>

                            <div className='sm:col-span-1 sm:col-start-1 mb-4 shadow-xl rounded-xl bg-white'>
                                <TextField
                                    fullWidth
                                    id="cargo"
                                    name="cargo"
                                    label="Cargos desempeñados dentro de Movimiento Ciudadano"
                                    value={ cargosAnteriores }
                                    onChange={(event) => {
                                        const cargoDesempniado = event.target.value;
                                        setCargosAnteriores(cargoDesempniado);
                                        const valido = cargoDesempniado.length>='Ninguno'.length;
                                        setErrorCargosAnteriores(!valido)
                                    }
                                    }
                                    error={errorCargosAnteriores}
                                    helperText={errorCargosAnteriores? 'Campo obligatorio':'Ingrese "Ninguno" si no aplica'}
                                    color="primary"
                                />
                            </div>

                            <div className='sm:col-span-1 sm:col-start-1'>
                                <textarea
                                    className="shadow-xl rounded-xl border-2 border-orange-100 w-full"
                                    fullWidth
                                    // multiline
                                    rows={4}
                                    color="primary"
                                    value={ comentarios }
                                    onChange={(event) => {
                                        const comentarios = event.target.value;
                                        setComentarios(comentarios);
                                        const valido = comentarios.length>='Ninguno'.length;
                                        setErrorComentarios(!valido)
                                        setComentarios(event.target.value)}
                                    }
                                    placeholder="Escribe tus comentarios"
                                    style={{
                                        resize:'none'
                                    }}
                                >
                                </textarea>
                                <p>{errorComentarios ? 'Campo obligatorio' : 'Ingrese "Ninguno" si no aplica'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
        {
            title: 'Domicilio para oír y recibir notificaciones',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-6">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}

                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

                        <div className="mt-10 gap-x-6 gap-y-8">
                            <div className='mb-4 shadow-xl rounded-xl bg-white'>
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
                                {direccion.length === 0 && <p style={{color: '#f44336'}}>Campo obligatorio</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
        {
            title: 'Datos para identificar perfil',
            content:
            <form>
                <div className="space-y-12 m-10">
                    <div className="pb-6">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}

                        {/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

                        <div className="mt-10 gap-x-6 gap-y-8">
                            <div className='sm:col-span-1 sm:col-start-1'>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-6 flex justify-center gap-x-6 ">
                    <button
                        type="button"
                        className="rounded-md text-sm font-bold text-white bg-red-600 py-2 px-4"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        },
    ];

    return (
        <div className="bg-white min-h-screen p-4">
            <h1 className='py-10 text-center font-semibold text-2xl'> Llena tus datos personales </h1>

            <Accordion panels={panels} />

            <div className='w-full flex justify-center gap-x-6'>
                <button
                    className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-md rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => location.replace(route('iniciocc.page'))}
                >
                    &#8592; Volver
                </button>
                <button
                    className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-md rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={enviarDatos}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Guardar'}
                </button>
            </div>
        </div>
    );
};

export default Formulario2;
