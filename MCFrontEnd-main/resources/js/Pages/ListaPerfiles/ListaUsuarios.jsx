import React, { useState, useEffect } from 'react';
import CustomUsuarios from '@/Components/Customized/CustomComponents/CustomUsuarios';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {ClearOutlined, Search, SearchOutlined} from "@mui/icons-material";

const ListaUsuarios = (props) => {
    const { nombre, puesto, fotoPerfil, perfil, profile, seguidores, usuarios } = props;

    const [searchText, setSearchText] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

    const filterUsers = () => {
        if (searchText === '') {
            setUsuariosFiltrados(usuarios);
        } else {
            const usuariosFiltrados = usuarios.filter((usuario) => {
                return usuario.usuario.name.toLowerCase().includes(searchText.toLowerCase());
            });
            setUsuariosFiltrados(usuariosFiltrados);
        }
    }

    useEffect(() => {
        filterUsers();
    }, [searchText]);

    return (
        <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <TextField
                variant={'outlined'}
                label={'Buscar'}
                fullWidth
                color={'primary'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={'!mb-8 !mt-4 !bg-white'}
                InputProps={{
                    endAdornment: (
                        <React.Fragment>
                            {searchText ? (
                                <IconButton
                                    onClick={() => {
                                        setSearchText('');
                                    }}
                                    color={'error'}
                                    edge="end"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <ClearOutlined />
                                </IconButton>
                            ) : null}
                            <InputAdornment position="end">
                                <SearchOutlined color={'primary'} />
                            </InputAdornment>
                        </React.Fragment>
                    )
                }}
            />
            <CustomUsuarios
                usuarios={usuariosFiltrados}
            />
        </div>
    );
};

export default ListaUsuarios;
