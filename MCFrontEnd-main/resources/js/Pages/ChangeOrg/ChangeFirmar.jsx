import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputError from "@/Components/InputError";
import Grid2 from "@mui/material/Unstable_Grid2";
import {data} from "autoprefixer";

const ChangeFirmar = (props) => {

    const BASE_URL = props['urlApi'];

    const [loading, setLoading] = useState(false);

    const [dataVoluntario, setDataVoluntario] = useState(null);

    const [email, setEmail] = useState('');
    const [emailRevisado, setEmailRevisado] = useState(false);

    const [nombre, setNombre] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [mantenermeInformado, setMantenermeInformado] = useState(false);
    const [aceptoTerminos, setAceptoTerminos] = useState(false);
    const [peticionId, setPeticionId] = useState('');

    const [entidadFederativa, setEntidadFederativa] = useState(null);
    const [loadingEstados, setLoadingEstados] = useState(false);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        // Get id from url Query Params
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('idPeticion');
        setPeticionId(id);
    }, []);

    useEffect(() => {
        if (dataVoluntario !== null) {
            setNombre(dataVoluntario['nombre']);
            setComentarios(dataVoluntario['comentarios'] ? dataVoluntario['comentarios'] : '');
            setNombre(dataVoluntario['nombre']);

            if (dataVoluntario['entidad_federativa'] !== null) {
                const estado = estados.find((estado) => estado?.['id'] === dataVoluntario['entidad_federativa']);
                setEntidadFederativa(estado?.['iso_code']);
            }
        }
    }, [dataVoluntario]);

    useEffect(() => {
        setLoadingEstados(true);

        axios.get(`${BASE_URL}/api/entidades/federativas`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(async (response) => {
                if (response.status === 200) {
                    setEstados(response.data?.["response"]);
                } else {
                    toast.error('Error al obtener los estados ' + (response.data.message || 'Ha ocurrido un error al obtener los estados'));
                    setEstados([]);
                }
            })
            .catch(async (error) => {
                toast.error('Error al obtener los estados ' + (error.response.data.message || 'Ha ocurrido un error al obtener los estados'));
                setEstados([]);
            })
            .finally(() => {
                setLoadingEstados(false);
            });
    }, []);

    const verifyEmail = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('idPeticion');

        axios.post(`${BASE_URL}/api/change/checkEmail`, {
            email: email,
            peticion_id: id,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                setDataVoluntario(response.data['voluntario']);
            })
            .catch(error => {
                console.log(error);
                setDataVoluntario(null);
            })
            .finally(() => {
                setEmailRevisado(true);
            });
    }

    useEffect(() => {
        if (emailRevisado) {
            setEmailRevisado(false);
        }
    }, [email]);

    useEffect(() => {
        if (!emailRevisado) {
            verifyEmail();
        }
    }, [emailRevisado]);

    const validateForm = () => {
        if (nombre === '') {
            return false;
        }

        if (email === '') {
            return false;
        }

        if (entidadFederativa === null) {
            return false;
        }

        if (!aceptoTerminos) {
            return false;
        }

        if (loading) {
            return false;
        }

        if (dataVoluntario?.['yaRegistrado']) {
            return false;
        }

        return true;
    }

    const firmar = () => {
        setLoading(true);

        const estado = estados.find((estado) => estado?.['iso_code'] === entidadFederativa);

        const dataBody = {
            nombre: nombre,
            email: email,
            comentarios: comentarios === '' ? null : comentarios,
            mantenerme_informado: mantenermeInformado,
            acepto_terminos: aceptoTerminos,
            peticion_id: peticionId,
            entidad_federativa: estado['id'],
        };

        console.log(dataBody);

        axios.post(`${BASE_URL}/api/change/firmar`, dataBody, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                props.onFirmar();
            })
            .catch(error => {
                console.log(error);
                verifyEmail();
                toast.error(error.response.data.message + ': ' + (error.response.data.error || ''));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Box
            className={'w-full min-h-[300px] m-0 p-[20px] flex flex-col'}
        >
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                draggable
                pauseOnHover
                pauseOnFocusLoss
                hideProgressBar={false}
                theme={'light'}
                style={{
                    zIndex: 99999999,
                }}
            />

            <Card
                className={'w-full h-full p-4 border border-gray-200'}
            >
                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        fontWeight: '600',
                    }}
                >
                    1- Verifique su correo electrónico
                </Typography>

                <Typography
                    variant="body1"
                    className={'text-slate-400'}
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    Si ya se encuentra registrado en la plataforma, por favor ingrese su correo electrónico
                    y presione el botón "Verificar".
                </Typography>

                <Grid2
                    container
                    className={'h-[80px]'}
                >
                    <Grid2
                        item xs={10}
                    >
                        <TextField
                            fullWidth
                            label={'Email'}
                            variant={'outlined'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid2>

                    <Grid2
                        item xs={2}
                        className={'!flex !items-center justify-center !px-4'}
                    >
                        <Button
                            variant="contained"
                            className={'!mb-[100px] !flex !items-center justify-center !pt-2'}
                            fullWidth
                            style={{
                                backgroundColor: "#DFF8E5",
                                color: "#000000",
                                height: "50px",
                                borderRadius: "25px",
                                fontFamily: 'Mona-Sans',
                                fontWeight: "bold",
                            }}
                            onClick={() => {
                                verifyEmail();
                            }}
                        >
                            Verificar
                        </Button>
                    </Grid2>
                </Grid2>

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '30px',
                        fontWeight: '600',
                        color: dataVoluntario === null ? 'indianred' : dataVoluntario?.['yaRegistrado'] ? 'green' : 'cornflowerblue',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    {
                        dataVoluntario === null ?
                            'No se encuentra registrado en la plataforma, por favor llenar el siguiente formulario.'
                            :
                            dataVoluntario?.['yaRegistrado'] ?
                                'Ya se encuentra registrado en la plataforma'
                                :
                                'Su correo ya se encuentra registrado en la plataforma, pero no ha firmado la petición. ' +
                                'Por favor, coloque los comentarios que considere necesarios y presione el botón "Firmar Petición".'
                    }
                </Typography>

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    2- Registra tus datos
                </Typography>

                <TextField
                    fullWidth
                    label={'Nombre'}
                    variant={'outlined'}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <TextField
                    fullWidth
                    label={'Comentarios (Opcional)'}
                    variant={'outlined'}
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    multiline={true}
                    rows={4}
                    className={'!mt-[20px]'}
                />

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginTop: '20px',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    3- Selecciona tu entidad federativa
                </Typography>

                {
                    estados?.length > 0 ?
                        <div className="mt-4">
                            <InputLabel forInput="estado" value="Estado"/>

                            <Select
                                id="estado"
                                name="estado"
                                value={entidadFederativa}
                                className="mt-1 block w-full"
                                onChange={(e) => {
                                    console.log(e.target)
                                    setEntidadFederativa(e.target.value);
                                }}
                                required
                            >
                                <MenuItem value="00">Selecciona un estado</MenuItem>
                                {
                                    estados.map((estado) => (
                                        <MenuItem
                                            key={estado.id}
                                            value={estado?.['iso_code']}
                                        >
                                            {estado.nombre}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        : null
                }

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        marginTop: '30px',
                        fontWeight: '600',
                    }}
                >
                    4- ¿Aceptas que <span className={'!font-bold'}>VOCES DEL FUTURO</span> te envíe correos electrónicos
                    sobre esta campaña y otras campañas?
                </Typography>

                <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                    className={'!mt-[20px] w-full'}
                >
                    <Button
                        onClick={() => setMantenermeInformado(true)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: mantenermeInformado ? 'forestgreen' : '#FFFFFF',
                            color: mantenermeInformado ? '#FFFFFF' : '#000000',
                        }}
                    >
                        Sí
                    </Button>

                    <Button
                        onClick={() => setMantenermeInformado(false)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: !mantenermeInformado ? 'indianred' : '#FFFFFF',
                            color: !mantenermeInformado ? '#FFFFFF' : '#000000',
                        }}
                    >
                        No
                    </Button>
                </ButtonGroup>

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        marginTop: '30px',
                        fontWeight: '600',
                    }}
                >
                    5- Para finalizar, ¿Aceptas los términos y condiciones de la plataforma?
                </Typography>

                <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                    className={'!mt-[20px] w-full'}
                >
                    <Button
                        onClick={() => setAceptoTerminos(true)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: aceptoTerminos ? 'forestgreen' : '#FFFFFF',
                            color: aceptoTerminos ? '#FFFFFF' : '#000000',
                        }}
                    >
                        Sí
                    </Button>

                    <Button
                        onClick={() => setAceptoTerminos(false)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: !aceptoTerminos ? 'indianred' : '#FFFFFF',
                            color: !aceptoTerminos ? '#FFFFFF' : '#000000',
                        }}
                    >
                        No
                    </Button>
                </ButtonGroup>

                <Divider
                    className={'w-full !my-[50px] bg-slate-400'}
                />

                <Button
                    variant="contained"
                    color="info"
                    className={'!mt-[20px] w-full h-[60px]'}
                    disabled={!validateForm()}
                    onClick={() => {
                        firmar();
                    }}
                >
                    Firmar petición
                </Button>
            </Card>
        </Box>
    );
}

export default ChangeFirmar;
