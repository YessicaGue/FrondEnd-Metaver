import React, {useState} from "react";
import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {OverlayMenu} from "@/Pages/CaminoCandidato/ApoyoPrecandidatura/UtilsApoyoPrecandidatura";
import Swal from "sweetalert2";
import axios from "axios";

const RegistrarFirmaPrecandidato = (props) => {

    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [seccion, setSeccion] = useState("");
    const [estado, setEstado] = useState("");
    const [distrito, setDistrito] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [errorNombre, setErrorNombre] = useState(true);
    const [errorNumero, setErrorNumero] = useState(true);
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorClave, setErrorClave] = useState(true);
    const [errorSeccion, setErrorSeccion] = useState(true);

    const tiposModal = new Set([2, 4, 5, 6, 7, 8, 9]);

    const [avisoAceptado, setAvisoAceptado] = useState(false);
    const [informacionAdicionalAceptado, setInformacionAdicionalAceptado] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const precandidatura = props?.['precandidatura']?.[0] ?? props['precandidatura'];
    const perfilPrecandidatura = precandidatura.perfil;
    const tipoPrecandidatura = precandidatura.tipoPrecandidatura;

    const handleSubmit = async () => {
        setSubmitted(true);

        if (tiposModal.has(props['typeModal']) && (errorNombre || errorSeccion || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (!avisoAceptado) {
            return Swal.fire({
                title: `Debes aceptar el aviso de privacidad`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        setIsLoading(true);

        const body = {
            nombre,
            numero,
            email,
            clave,
            seccion,
            estado,
            distrito,
            avisoAceptado,
            informacionAdicionalAceptado,
            tipoPrecandidatura,
            perfilPrecandidatura,
        };

        try {
            await axios.post(route("post.apoyar-precandidatura"), body);
        } catch (error) {
            setIsLoading(false);

            return Swal.fire({
                title: `Datos no enviados. Por favor, intenta de nuevo más tarde`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setIsLoading(false);
        }

        await Swal.fire({
            title: `Datos enviados correctamente`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });

        props['setOpeningModal'](false);
        setIsLoading(false);
    };

    return (
        <OverlayMenu
            className='overlay appear max-md:px-0 px-4'
        >
            <div
                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                <div className="top-2 right-2 absolute flex items-center"
                >
                    <button
                        onClick={props['handleModalClose']}
                        className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                    >
                        <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                className='inline-flex'
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                    <Container
                        className='p-[20px] ml-auto mr-auto'
                        maxWidth={'lg'}
                    >
                        <div className='subtitles w-full text-center'>
                            Movimiento Ciudadano - Apoyo a la comunidad
                        </div>

                        <div
                            className='titles w-full text-center break-words text-mc text-black'
                        >
                            <span
                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}
                            >
                                Mis datos
                            </span>
                        </div>
                    </Container>

                    <div className='flex flex-col gap-4'>
                        <TextField
                            required={true}
                            fullWidth
                            label="Nombre completo de la persona que respalda la precandidatura"
                            color="primary"
                            value={nombre}
                            onChange={(event) => {
                                const value = event.target.value.toUpperCase();
                                setNombre(value);
                                const esValido = value.length > 5
                                setErrorNombre(!esValido);
                            }
                            }
                            error={submitted && errorNombre}
                            helperText={submitted && errorNombre ? 'Campo Obligatorio o no válida, Nombre Completo' : ''}
                        />

                        <TextField
                            required={true}
                            fullWidth
                            id="Sección"
                            name="Sección"
                            label="Sección electoral"
                            value={seccion}
                            onChange={(event) => {
                                const seccionValue = event.target.value;
                                setSeccion(seccionValue);
                                const esValido = seccionValue.length > 0;
                                setErrorSeccion(!esValido);
                            }
                            }
                            error={submitted && errorSeccion}
                            helperText={submitted && errorSeccion ? 'Campo Obligatorio o no válida' : ''}
                        />

                        <TextField
                            required={true}
                            fullWidth
                            id="clave"
                            name="clave"
                            label="Clave de elector de la Credencial para votar"
                            value={clave}
                            onChange={(event) => {
                                const claveValue = event.target.value.toUpperCase();
                                setClave(claveValue);
                                const esValido = claveValue.length >= 10
                                setErrorClave(!esValido);
                            }
                            }
                            error={submitted && errorClave}
                            helperText={submitted && errorClave ? 'Campo Obligatorio o no válida' : ''}
                        />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <TextField
                            required={true}
                            label="Teléfono"
                            value={numero}
                            fullWidth
                            onChange={(event) => {
                                const regexTelefonoMexico = /^[0-9]{10}$/;
                                const telefonoValue = event.target.value;
                                setNumero(telefonoValue);
                                const fomatoValido = regexTelefonoMexico.test(telefonoValue)
                                const esValido = fomatoValido && !/(\d)\1{9}/.test(telefonoValue);
                                setErrorNumero(!esValido);
                            }
                            }
                            error={submitted && errorNumero}
                            helperText={submitted && errorNumero ? 'Campo Obligatorio o no válida (10 digitos númericos)' : ''}
                        />

                        <TextField
                            required={true}
                            fullWidth
                            label="Correo electrónico"
                            color="primary"
                            value={email}
                            onChange={(event) => {
                                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                const emailValue = event.target.value;
                                setEmail(emailValue);
                                const esValido = emailRegex.test(emailValue);
                                setErrorEmail(!esValido)
                            }}
                            error={submitted && errorEmail}
                            helperText={submitted && errorEmail ? 'Campo Obligatorio o no válida Ejemplo: example@correo.com' : ''}
                        />
                    </div>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={informacionAdicionalAceptado}
                                onChange={() => setInformacionAdicionalAceptado((valor) => !valor)}
                            />
                        }
                        label={
                            <div className="flex-col sm:flex-row items-start">
                                <Typography
                                    variant="body1"
                                    display="inline"
                                >
                                    Acepta envío de información
                                </Typography>
                            </div>
                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={avisoAceptado}
                                onChange={() => setAvisoAceptado((valor) => !valor)}
                            />
                        }
                        label={
                            <div className="flex-col sm:flex-row items-start my-0">
                                <Typography
                                    variant="body1"
                                    display="inline"
                                >
                                    Acepto

                                    {' '}

                                    <span className='font-bold'>
                                                            aviso de Privacidad
                                                        </span>
                                </Typography>

                                {' '}

                                <Link
                                    href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Ver
                                </Link>
                            </div>
                        }
                    />

                    <p className='text-xs text-justify'>
                        <h2 className='font-bold uppercase'>
                            COMISIÓN NACIONAL DE CONVENCIONES
                            Y PROCESOS INTERNOS
                        </h2>
                        <h2 className='font-bold'>Aviso de privacidad simplificado </h2>
                        Movimiento Ciudadano, con domicilio en Louisiana No 113, Colonia Nápoles,
                        Alcaldía Benito Juárez, C.P. 03810, Ciudad de México, es responsable del
                        tratamiento de los datos personales que nos proporcione, los cuales serán
                        protegidos conforme a lo dispuesto por la Ley General de Protección de Datos
                        Personales en Posesión de Sujetos Obligados y demás normatividad que resulte
                        aplicable.

                        Los datos recabados en el formato de respaldo de la precandidatura, los
                        utilizaremos para las siguientes finalidades:
                        • Verificar y confirmar su identidad, así como la autenticidad de la información
                        que nos proporciona.
                        • Integrar expedientes y bases de datos necesarias para registrar, concentrar y
                        consultar a las y los ciudadanos que respaldan las precandidaturas en Movimiento
                        Ciudadano.
                        • Tener un medio de comunicación con las personas que respaldan las
                        precandidaturas de Movimiento Ciudadano para proporcionarles información de
                        nuestras actividades y propuestas.
                        Adicionalmente, se utilizarán única y exclusivamente para fines estadísticos e
                        informes, la información no estará asociada con la persona titular
                        de los datos personales, por tanto, no será posible asociarlo con ella y en
                        consecuencia
                        no será posible identificarle. Se informa además que, los datos personales
                        recabados
                        no serán transferidos por Movimiento Ciudadano a menos que una autoridad o
                        institución competente
                        lo solicite, ésta debe estar debidamente fundada y motivada. Para llevar a cabo
                        las finalidades descritas en el presente aviso de privacidad, utilizaremos datos
                        personales de identificación y contacto. Si desea mayor información sobre los
                        términos
                        y condiciones en que éstos serán tratados, puede consultar el aviso de
                        privacidad
                        integral del Sistema de Personas Ciudadanas que Respaldan las Precandidaturas
                        en:
                        <br/>
                        <a
                            href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                            target="_blank" rel="noopener noreferrer"
                            className='font-bold'
                        >
                            https://transparencia.movimientociudadano.mx/protecciondedatospersonales
                        </a>
                    </p>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {
                            isLoading
                                ? <CircularProgress size={24} color="inherit"/>
                                : "Enviar"
                        }
                    </Button>
                </div>
            </div>
        </OverlayMenu>
    )
}

export default RegistrarFirmaPrecandidato;
