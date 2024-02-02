import React, {useState, useEffect} from "react";
import {Accordion, AccordionSummary, Box, Button, Divider, Grid, Paper, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {appColors} from "@/utils/AppColors";
import Swal from "sweetalert2";

const UserFilesView = (props) => {
    const [file, setFile] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    const BASE_URL = props['urlApi'];

    const getUserFiles = () => {
        axios.get(`${BASE_URL}/user/files`).then(res => {
            console.log(res);
            setUserFiles(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
    const uploadFile = (e) => {
        e.preventDefault();
        console.log('upload file');

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`${BASE_URL}/upload/user/file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async (res) => {
            console.log(res);
            await Swal.fire({
                title: 'Archivo subido',
                text: 'El archivo se ha subido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            getUserFiles();
        }).catch(async (err) => {
            console.log(err);
            await Swal.fire({
                title: 'Error al subir el archivo',
                text: 'Ha ocurrido un error al subir el archivo',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        });
    }

    useEffect(() => {
        getUserFiles();
    }, []);

    const onChangeFileHandler = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    return (
        <Box
            className={'w-full'}
        >
            <Accordion
                expanded={accordionExpanded}
                onChange={() => setAccordionExpanded(!accordionExpanded)}
                className={'p-6 w-full'}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel-user-files-content"
                >
                    <Typography
                        style={{
                            fontWeight: '600',
                        }}
                    >
                        Mi colección
                    </Typography>
                </AccordionSummary>
                <Box>
                    <Paper
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={uploadFile}
                        style={{
                            padding: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <Grid
                            container
                            className={'flex justify-center items-center w-fit h-fit'}
                        >
                            <Grid
                                item xs={12} md={6}
                                className={'flex justify-center items-center w-fit h-fit'}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '12px',
                                    padding: '20px',
                                }}
                            >
                                <Typography
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        marginBottom: '50px',
                                    }}
                                >
                                    Si desea agregar una imagen a su colección,
                                    para visualizarla en su evento, seleccione una imagen
                                    de su computadora.
                                </Typography>

                                <input
                                    type="file"
                                    name="file"
                                    onChange={onChangeFileHandler}
                                    className={'w-fit max-w-full'}
                                />
                            </Grid>

                            {
                                file && (
                                    <Grid
                                        item xs={12} md={6}
                                        className={'flex justify-center items-center w-fit h-fit'}
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className={'w-full h-full object-cover m-4 rounded-lg'}
                                            style={{
                                                maxHeight: '200px',
                                            }}
                                        />
                                    </Grid>
                                )
                            }

                            <Grid
                                item xs={12}
                                style={{
                                    width: '100%',
                                    marginTop: '20px',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                >
                                    Subir Imagen
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    {
                        userFiles.length > 0 ?
                            <Box>
                                <Typography
                                    className={'w-fit h-fit text-mc-secondary'}
                                    style={{
                                        marginTop: '20px',
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        opacity: '0.8',
                                    }}
                                >
                                    O utilice alguna de sus Imágenes
                                </Typography>

                                <Divider />

                                <Grid
                                    container
                                    spacing={2}
                                    className={'flex justify-center items-center w-fit h-fit'}
                                    style={{
                                        marginTop: '20px',
                                    }}
                                >
                                    {
                                        userFiles.map((file, index) => (
                                            <Grid
                                                item xs={6} md={4} lg={3}
                                                key={index}
                                                className={'flex justify-center items-center w-fit h-fit'}
                                            >
                                                <img
                                                    src={file.url}
                                                    alt="preview"
                                                    className={'w-full h-full max-h-200 object-contain rounded-lg'}
                                                    style={{
                                                        cursor: 'pointer',
                                                        border: props.urlImage === file.url ? '5px solid ' + appColors.primary : 'none',
                                                    }}
                                                    onClick={() => {
                                                        if (props.urlImage === file.url) {
                                                            props.setUrlImage(null);
                                                        } else {
                                                            props.setUrlImage(file.url);
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                            : null
                    }
                </Box>
            </Accordion>
        </Box>
    )
}

export default UserFilesView;
