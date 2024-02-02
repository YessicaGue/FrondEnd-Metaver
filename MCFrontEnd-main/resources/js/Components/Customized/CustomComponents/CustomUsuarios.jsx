import React from 'react';
import {Card} from "@mui/material";
import {LazyLoadImage} from "react-lazy-load-image-component";

const CustomUsuarios = ({usuarios}) => {

    return (
        <div>
            {
                usuarios?.map((usuarios, index) => (
                    <a 
                        href={`/perfil?id=${usuarios.perfil.guid}`}
                        target={'_blank'}
                        key={index}
                    >
                        <div
                                className="grid grid-cols-3 bg-slate-200 rounded-xl ml-12 mb-4 flex relative max-sm:order-last max-sm:justify-center md:flex-col">
                                <div className='py-4 pl-24'>
                                <h1 className='font-black uppercase text-blackn'>{usuarios.usuario.name}</h1>
                                <h1 style={{color: '#606060'}}>{usuarios.usuario.puesto}</h1>
                            </div>
                            <div className='w-full my-4 text-center text-white justify-end'>
                                <button className='font-bold items-center bg-orange-400 py-1 px-4 rounded-lg'>
                                    <h1> {usuarios.seguidores.length} <br/> seguidores </h1>
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
                                    src={`https://dashboard.ciudadanosenmovimiento.org/api/perfil/user/profile-image/${usuarios.usuario.id}`}
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
    );
};

export default CustomUsuarios;