import React, {useEffect, useMemo, useState} from "react";
import {Box, createTheme, darken, Paper, ThemeProvider, Typography, useTheme} from "@mui/material";
import {ExportToCsv} from "export-to-csv";
import {esES} from "@mui/material/locale";
import {MaterialReactTable} from "material-react-table";
import {MRT_Localization_ES} from "material-react-table/locales/es";
import {CancelOutlined, CheckCircleOutlined} from "@mui/icons-material";
import {appColors} from "@/utils/AppColors";
import {toast} from "react-toastify";

const TableFirmasPrecandidatura = (props) => {

    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState(null);

    const theme = useTheme();

    const columnsTable = useMemo(
            () => [
                {
                    accessorKey: 'id', //access nested data with dot notation
                    header: 'Id',
                    size: 30,
                    Cell: ({renderedCellValue, row}) => (
                        <div
                            className={'font-bold'}
                        >
                            {renderedCellValue}
                        </div>
                    )
                },
                {
                    accessorKey: 'perfil.alias', //access nested data with dot notation
                    header: 'Candidato',
                    Cell: ({renderedCellValue, row}) => (
                        <div
                            className={'flex justify-start items-center mb-2 font-bold text-start'}
                            style={{
                                fontFamily: 'Montserrat'
                            }}
                        >
                            {renderedCellValue}
                        </div>
                    )
                },
                {
                    accessorKey: 'formulario_rellenado_json.tipoPrecandidatura.nombre', //access nested data with dot notation
                    header: 'Tipo Candidatura',
                    Cell: ({renderedCellValue, row}) => (
                        <Box>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {renderedCellValue}
                            </Typography>
                        </Box>
                    )
                },
                {
                    accessorKey: 'formulario_rellenado_json.nombre', //access nested data with dot notation
                    header: 'Nombre Persona',
                    Cell: ({renderedCellValue, row}) => (
                        <Box>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {renderedCellValue}
                            </Typography>
                        </Box>
                    )
                },
                {
                    accessorKey: 'formulario_rellenado_json.numero', //access nested data with dot notation
                    header: 'Teléfono Persona',
                    Cell: ({renderedCellValue, row}) => (
                        <Box>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {renderedCellValue}
                            </Typography>
                        </Box>
                    )
                },
                {
                    accessorKey: 'formulario_rellenado_json.email', //access nested data with dot notation
                    header: 'Email Persona',
                    Cell: ({renderedCellValue, row}) => (
                        <Box>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {renderedCellValue}
                            </Typography>
                        </Box>
                    )
                },
                {
                    accessorKey: 'formulario_rellenado_json.clave', //access nested data with dot notation
                    header: 'Clave Elector Persona',
                    Cell: ({renderedCellValue, row}) => (
                        <Box>
                            <Typography
                                variant={'body2'}
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                {renderedCellValue}
                            </Typography>
                        </Box>
                    )
                },
                {
                    accessorKey: 'activo', //access nested data with dot notation
                    header: 'Activo',
                    Cell: ({renderedCellValue, row}) => (
                        <Box
                            className={'rounded-lg w-full flex justify-center items-center font-bold text-white'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '50px',
                                backgroundColor: renderedCellValue ? appColors.success : appColors.error,
                            }}
                        >
                            {
                                renderedCellValue ?
                                    <CheckCircleOutlined/>
                                    :
                                    <CancelOutlined/>
                            }
                        </Box>
                    )
                },
            ],
            [data],
        )
    ;

    const cvsOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: true,
        headers: columnsTable.map((column) => column.header),
    };

    const csvExporter = new ExportToCsv(cvsOptions);

    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => {
            return row.original;
        }))
    };

    const getData = () => {
        console.log('Props TAbleFirmas: ', props);
        setLoadingData(true);

        axios.get(route('get.apoyar.candidato.data', {
            id: props?.['precandidatura']?.perfil?.guid,
        }))
            .then((response) => {
                setData(response.data.response.response);
                setLoadingData(false);
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
                setData(null);
                toast.error(`Ha ocurrido un error al obtener los datos, ${error.response.data.message}`);
            })
            .finally(() => {
                setLoadingData(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Paper
            elevation={5}
            className={'w-full p-3'}
        >
            <Typography
                variant="h5"
                className={'!font-bold !mb-5'}
            >
                Registro Firmas <span className={'text-mc-primary font-semibold'}>{props?.['precandidatura']?.perfil?.alias}</span>
            </Typography>

            {
                (data === null && loadingData) ?
                    <div>
                        Cargando datos, por favor espere...
                    </div>
                    : (data === null && !loadingData) ?
                        <div>
                            No hay datos de firmas para mostrar en este momento
                        </div>
                        : null
            }

            {
                (data !== null && data !== undefined && data !== [] && !loadingData) ?
                    <div
                        className={'w-full'}
                    >
                        {
                            data?.length > 0 ?
                                <ThemeProvider theme={createTheme(theme, esES)}>
                                    <MaterialReactTable
                                        columns={columnsTable}
                                        data={data}
                                        title="Usuarios"
                                        enableRowSelection={true}
                                        localization={MRT_Localization_ES}
                                        muiTableBodyProps={{
                                            sx: (theme) => ({
                                                '& tr:nth-of-type(odd)': {
                                                    backgroundColor: darken(theme.palette.background.default, 0.1),
                                                },
                                            }),
                                        }}
                                    />
                                </ThemeProvider>
                                : null
                        }
                    </div>
                    : null
            }
        </Paper>
    )
}

export default TableFirmasPrecandidatura;
