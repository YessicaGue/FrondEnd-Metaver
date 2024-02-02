import React from 'react';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';

const index = (props) => {
    const { pantalla } = props;
    const { id, contenido, fechaCreacion } = pantalla;

    return (
        <>
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
        </>
    );
};

export default index;