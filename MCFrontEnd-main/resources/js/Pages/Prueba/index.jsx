import React, { useState } from 'react';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';
import CustomTinyMCE2 from '@/Components/Customized/CustomComponents/CustomTinyMCE2';

const index = () => {
    const [contenido, setContenido] = useState('');

    const handlerEjemplo = () => {
        alert('hola');
    };

    const funciones = {
        'Mostrar alerta' : handlerEjemplo,
    };

    return (
        <div>
            <CustomTinyMCE2
                value={ contenido }
                onEditorChange={(newValue) => setContenido(newValue)}
                onInit={() => {}}
                funciones={ funciones }
                className='rounded-none'
            />

            <div className='w-full p-4 mt-4 border-t-[.3px] border-solid border-[#eee]'>
                { 
                    convertHtmlToReact(contenido, {
                        transform: (node, index) => {
                            if (node && node.attribs && node.attribs['data-fun'] && funciones[node.attribs['data-fun']])
                                return (
                                    <button
                                        key={ index }
                                        className={ node.attribs.class }
                                        onClick={ funciones[node.attribs['data-fun']] }
                                    >
                                        { node.attribs['data-title'] }
                                    </button>
                                )
                        }
                    })
                }
            </div>
        </div>
    );


};

export default index