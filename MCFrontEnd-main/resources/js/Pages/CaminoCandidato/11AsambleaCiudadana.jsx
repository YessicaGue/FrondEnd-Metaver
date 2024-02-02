import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
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


function AsambleaCiudadana(props) {
    const {
        isDemo = false,
        auth: { user }
    } = props;

    const [nombre, setNombre] = useState('');
	const [apellidoPaterno, setApellidoPaterno] = useState('');
	const [apellidoMaterno, setApellidoMaterno] = useState('');
	const [seudonimo, setSeudonimo] = useState('');
	const [fechaNacimiento, setFechaNacimiento] = useState(dayjs(new Date()));
	const [lugarNacimiento, setLugarNacimiento] = useState('');
	const [genero, setGenero] = useState('');
	const [correoElectronico, setCorreoElectronico] = useState('');
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

	const [validoFechaNacimiento, setValidoFechaNacimiento] = useState(false);
	const [validoCorreoElectronico, setValidoCorreoElectronico] = useState(false);

    const [formSubmitted , setFormSubmitted] = useState(false);

	const enviarDatos = async () => {
		setFormSubmitted(true);
		
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
			"personaRequest": {
				"nombre": nombre,
				"apellidoPaterno": apellidoPaterno,
				"apellidoMaterno": apellidoMaterno,
				"seudonimo": seudonimo,
				"fechaNacimiento": fechaNacimiento.toISOString(),
				"entidadFederativaID": lugarNacimiento,
				"generoId": genero,
				"correoElectronico": correoElectronico,
				"tiempoResidencia": parseInt(tiempoResidencia),
				"telefonoParticular": telefonoParticular,
				"firmaElectronica": null,
				"curp": null,
				"rfc": null,
				"activo":true
			},
			"direccionRequest": {
				"direccionCompleta": direccion,
				"numeroCalle": numeroCalle,
				"nombreCalle": calle,
				"colonia": direccionObjeto.structured_formatting.secondary_text,
				"ciudad": direccionObjeto.structured_formatting.secondary_text,
				"entidadFederativaId": idEncontrado,
				"codigoPostal": codigoPostal,
				"pais": pais,
				"latitud": lat.toString(),
				"longitud": lng.toString(),
				"activo": true
			},
			"personaPerfilRequest": {
				"activo": true
			},
			"candidatosCHCRequest": {
				"CaminoId": null,
				"CargoPostulacionId": null,
				"activo": true
			},
			"candidatoEtapaRegistroCHCRequest":{
				"RegistroId":1,
				"activo":true
			}
		};

		try{
			const response = await axios.post(route('post.ciudadano.primer.registro'), data);

			if (!response.data.success) {
				const errorMessage = response.data.message;
				const jsonStartIndex = errorMessage.indexOf('{');
				const jsonEndIndex = errorMessage.lastIndexOf('}') + 1;
				const jsonSubstring = errorMessage.substring(jsonStartIndex, jsonEndIndex);

				const errorObject = JSON.parse(jsonSubstring);
				const extractedMessage = errorObject.message;

				return Swal.fire({
					title: `Algo salió mal Intentar mas tarde.` + extractedMessage,
					icon: 'info',
					confirmButtonText: 'Aceptar',
				});
			}

			if (response.data.success === true) {
				await Swal.fire({
					title: response.data.message,
					icon: 'success',
					confirmButtonText: 'Aceptar',
				});

				location.replace(route('camino.candidato.page'))
			}
		} catch(error) {
			if (err?.response?.status === 419)
                return Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

			return Swal.fire({
				title: `Algo salió mal!. Intentar mas tarde.`+ error,
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
		}
	};

	const panels = [{
		title: 'Información Personal',
		content:
		<form>
			<div className="">
				<div className="pb-6">
					{/* <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">Información Personal</h2> */}
					{/* <p className="mt-1 text-sm leading-6 text-gray-600 text-center">Termina de llenar tus datos.</p> */}

					<div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
						<div className='sm:col-start-1'>
							<TextField
								required
								fullWidth
								id="nombre"
								name="nombre"
								label="Nombre(s)"
								value={ nombre }
								onChange={(event) => setNombre(event.target.value)}
								helperText={ formSubmitted && nombre.length <= 0 ? 'El campo es obligatorio' : '' }
								error={ formSubmitted && nombre.length <= 0 }
							/>
						</div>

						<div className='sm:col-span-2 sm:col-start-2'>
							<TextField
								required
								fullWidth
								id="apellidoPaterno"
								name="apellidoPaterno"
								label="Apellido Paterno"
								value={ apellidoPaterno }
								onChange={(event) => setApellidoPaterno(event.target.value)}
								helperText={ formSubmitted && apellidoPaterno.length <= 0 ? 'El campo es obligatorio' : '' }
								error={ formSubmitted && apellidoPaterno.length <= 0 }
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-1'>
							<TextField
								fullWidth
								id="apellidoMaterno"
								name="apellidoMaterno"
								label="Apellido Materno"
								value={ apellidoMaterno }
								onChange={(event) => setApellidoMaterno(event.target.value)}
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-2'>
							<TextField
								fullWidth
								id="seudonimo"
								name="seudonimo"
								label="Seudonimo"
								value={ seudonimo }
								onChange={(event) => setSeudonimo(event.target.value)}
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-1'>
							<CustomDatePicker
								className="w-full"
								label="Fecha de nacimiento"
								id="fechaNacimiento"
								name="fechaNacimiento"
								inputFormat="DD/MM/YYYY"
								value={ fechaNacimiento }
								onChange={(value) => {
									setFechaNacimiento(value);

									const fechaNacimiento = dayjs(value, 'DD/MM/YYYY');
									const currentDate = dayjs(new Date());
									const minDate = currentDate.subtract(18, "years");
									const isValidDate = (
										fechaNacimiento.isValid() &&
										fechaNacimiento.isBefore(currentDate) &&
										fechaNacimiento.isAfter(dayjs('01/01/1900','DD/MM/YYYY')) &&
										fechaNacimiento.isBefore(minDate)
									)

									setValidoFechaNacimiento(isValidDate);
								}}
							/>

							{
								formSubmitted && !validoFechaNacimiento
								?	<p className="error-text">
										La fecha no es válida. Debes ser de 18 años o mayor y debes ingresar una fecha válida
									</p>
								:	null
							}
						</div>

						<div className='sm:col-span-1 sm:col-start-2'>
							<CustomSelect
								fullWidth
								id="lugarNacimiento"
								name="lugarNacimiento"
								label="Lugar de Nacimiento"
								value={ lugarNacimiento }
								list={ estados }
								onChange={(event) => setLugarNacimiento(event.target.value)}
								helperText={ formSubmitted && !lugarNacimiento ? 'Selecciona un lugar de nacimiento' : '' }
								error={ formSubmitted && !lugarNacimiento }
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-1'>
							<CustomSelect
								id="genero"
								label="Género"
								name="genero"
								value={ genero }
								list={ sexos }
								onChange={(event) => setGenero(event.target.value)}
								helperText={ formSubmitted && !genero ? 'Selecciona un género' : '' }
								error={ formSubmitted && !genero }
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-2'>
							<MuiTelInput
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

						<div className='sm:col-span-1 sm:col-start-1'>
							<TextField
								fullWidth
								id="correoElectronico"
								name="correoElectronico"
								label="Correo Electronico"
								value={ correoElectronico }
								onChange={(event) => {
									setCorreoElectronico(event.target.value);

									const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

									setValidoCorreoElectronico(emailRegex.test(event.target.value));
								}}
								helperText={ formSubmitted && !validoCorreoElectronico ? 'Ingresa un correo electrónico válido' : '' }
								error={ formSubmitted && !validoCorreoElectronico }
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-2'>
							<TextField
								fullWidth
								name='ocupacion'
								id="ocupacion"
								label="Ocupación"
								value={ ocupacion }
								onChange={(event) => setOcupacion(event.target.value)}
								helperText={ formSubmitted && ocupacion.length <= 0 ? 'Ingresa una ocupación' : '' }
								error={ formSubmitted && !ocupacion.length <= 0 }
							/>
						</div>

						<div className='sm:col-span-1 sm:col-start-1'>
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

						<div className='sm:col-span-1 sm:col-start-2'>
							<TextField
								fullWidth
								type='number'
								id="tiempoResidencia"
								name="tiempoResidencia"
								label="Tiempo de residencia"
								value={ tiempoResidencia }
								onChange={(event) => setTiempoResidencia(event.target.value)}
								error={ formSubmitted && tiempoResidencia <= 0 }
								helperText={ formSubmitted && tiempoResidencia <= 0 ? 'Ingresa un valor mayor a cero' : '' }
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="m-6 flex justify-center gap-x-6">
				<button type="button" className="rounded-md text-sm font-bold text-white bg-red-500 py-2 px-4">
					Cancelar
				</button>

				<button
					type="button"
					className="rounded-md bg-gradient-to-r from-red-500 to-orange-400 px-6 py-2 text-sm font-semibold text-white shadow-sm"
					onClick={ enviarDatos }
				>
					Guardar
				</button>
			</div>
		</form>
	}]

  return (
    <CustomLayout user={ user } visible={ true } >
            <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid lg:grid-cols-7 md:grid-cols-1 gap-2 w-full px-20 py-10 mt-10'>
                <div className='lg:col-span-5 md:col-span-1 lg:text-4xl md:text-4xl sm:text-3xl text-white font-bold lg:pl-20 md:pl-10 sm:pl-10 pt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold lg:text-4xl sm:text-3xl mt-1 pb-5 text-white'>
                        Debate
                    </h1>
                </div>
                <div className='lg:cols-span-2 md-cols-span-2 sm:cols-span-1 justify-center flex'>
                    <div className='sm:mx-2 md:mx-2'>
                        <button className='justify-end'>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center px-4 text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil Multiverso
                            </a>
                        </button>
                    </div>
                    <div className='justify-end '>
                        <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center  px-4  text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil de Héroe Ciudadan@
                            </a>
                        </button>
                    </div>
                </div>
            </header>
            <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <section className='grid lg:grid-cols-3 sm:grid-cols-1 pb-20' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            <div className='bg-gray-200 mx-10 mt-20 p-10 shadow-xl relative h-full'>
                {/* <h1>Texto</h1> */}
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, perspiciatis consequatur culpa rerum vel doloribus officia dicta quas, eveniet iusto sint adipisci inventore ratione impedit facere hic, repellendus veritatis blanditiis?</p> */}
                {/* <p>Facere autem nulla ex exercitationem rem, eveniet cupiditate porro sequi.</p> */}
                </div>
               <div className='col-span-2 my-10 mb-20 lg:max-w-6xl md:max-w-5xl m-auto w-full h-full'>
			   		<h2 className="text-base font-semibold leading-7 text-gray-900 text-center text-xl py-10">Inscribe al nuevo miembro de tu equipo</h2>
                    <Accordion panels={panels} />
                </div>
            </section>
            <div className='justify-start pl-10'>
                {/* <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-3 mt-10 flex justify-center mb-10' onClick={() => { location.replace(route('causa.page')) }}>
                    Continuar Camino del Héroe Ciudadan@
                </button> */}
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('crea.equipo.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>

    </CustomLayout>
  );
}

export default AsambleaCiudadana;
