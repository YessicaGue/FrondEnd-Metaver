import React, { useState, useEffect } from 'react';
import CustomUsuarios from '@/Components/Customized/CustomComponents/CustomUsuarios';
import {Card, IconButton, InputAdornment, TextField} from "@mui/material";
import {ClearOutlined, Search, SearchOutlined} from "@mui/icons-material";
import {LazyLoadImage} from "react-lazy-load-image-component";

const ListaPerfilesGrupales = (props) => {
    const { perfiles } = props;

    const [searchText, setSearchText] = useState('');
    const [perfilesFiltrados, setPerfilesFiltrados] = useState([]);

    const filterUsers = () => {
        if (searchText === '') {
            setPerfilesFiltrados(perfiles);
        } else {
            const usuariosFiltrados = perfiles.filter((perfil) => {
                return perfil.perfilGrupal.alias.toLowerCase().includes(searchText.toLowerCase());
            });
            setPerfilesFiltrados(usuariosFiltrados);
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

            <div>
                {
                    perfilesFiltrados?.map((perfil, index) => (
                        <a 
                            href={`/perfil-grupal?id=${perfil.perfilGrupal.guid}`}
                            target={'_blank'}
                            key={index}
                        >
                            <div
                                className="grid grid-cols-3 bg-slate-200 rounded-xl ml-12 mb-4 flex relative max-sm:order-last max-sm:justify-center md:flex-col">
                                <div className='py-4 pl-24'>
                                    <h1 className='font-black uppercase text-blackn'>{perfil.perfilGrupal.alias}</h1>
                                    <h1 style={{color: '#606060'}}>{perfil.perfilGrupal.frase}</h1>
                                </div>
                                <div className='w-full my-4 text-center text-white justify-end'>
                                    <button className='font-bold items-center bg-orange-400 py-1 px-4 rounded-lg'>
                                        <h1> {perfil.seguidores.length} <br/> seguidores </h1>
                                    </button>
                                </div>
                                <div class="flex justify-center h-full">
                                    <span
                                        className="m-auto py-4 items-center text-center bg-orange-400 font-bold text-white px-6 my-4 rounded -mr-4 transition-all duration-100 ease-in-out transform hover:w-20"
                                        style={{
                                            clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)'
                                        }}
                                    >
                                        Visitar
                                    </span>
                                </div>
                                <Card
                                    className='absolute w-20 h-20 bg-gray-300 z-30 top-[50%] translate-y-[-50%] left-[-0.5rem]'
                                >
                                    <LazyLoadImage
                                        src={`https://dashboard.ciudadanosenmovimiento.org/api/perfil/grupal/foto/${perfil.perfilGrupal['id']}`}
                                        alt="Imagen de perfil"
                                        className='w-full h-full object-cover'
                                        placeholderSrc={'https://public.ciudadanosenmovimiento.org/build/assets/test-9668d5a3.png'}
                                        wrapperClassName={'w-full h-full object-cover'}
                                    />
                                </Card>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
    );
};

export default ListaPerfilesGrupales;
