import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const CustomTinyMCE2 = (props) => {
    const { value, onEditorChange, funciones = {}, onInit = () => {}, onUpload = () => {} } = props;

    return (
        <div>
            <Editor
                apiKey='munclm49481zxfx9k2lv8vwsfxu0btcay5g5k25w6ehqfxhw'
                onInit={ onInit }
                init={{
                    statusbar: false,
                    language: "es_MX",
                    language_url: "/langs/es_MX.js",
                    max_height: 700,
                    min_height: 200,
                    menubar: 'insert | format | botones',
                    menu: {
                        botones: {
                            title: 'Botones', items: 'link_button function_button'
                        }
                    },
                    plugins: [
                        'autolink', 'link', 'image',
                        'insertdatetime', 'media', 'wordcount', 'emoticons', 'table'
                    ],
                    toolbar: 'undo redo | blocks | fonts |' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'emoticons |' +
                    'table | tablerowprops tablecellprops',
                    images_upload_handler: onUpload,
                    image_description: false,
                    image_dimensions: false,
                    media_poster: false,
                    media_alt_source: false,
                    media_dimensions: false,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    valid_elements : "@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|"
                    + "onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|"
                    + "onkeydown|onkeyup],a[rel|rev|charset|hreflang|tabindex|accesskey|type|"
                    + "name|href|target|title|class|onfocus|onblur],strong/b,em/i,strike,u,"
                    + "#p,-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|"
                    + "src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,"
                    + "-blockquote,-table[border=0|cellspacing|cellpadding|width|frame|rules|"
                    + "height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|"
                    + "height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,"
                    + "#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor"
                    + "|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,"
                    + "-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],-font[face"
                    + "|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],"
                    + "object[classid|width|height|codebase|*],param[name|value|_value],embed[type|width"
                    + "|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,"
                    + "button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|"
                    + "valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],"
                    + "input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],"
                    + "kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],"
                    + "q[cite],samp,select[disabled|multiple|name|size],small,"
                    + "textarea[cols|rows|disabled|name|readonly],tt,var,big",
                    setup: (editor) => {
                        editor.on('ExecCommand', (event) => {
                            const command = event.command;
                            if (command === 'mceMedia') {
                                const tabElems = document.querySelectorAll('div[role="tablist"] .tox-tab');
                                tabElems.forEach(tabElem => {
                                    if (tabElem.innerText === 'Insertar')
                                        tabElem.style.display = 'none';
                                });
                            }
                        });

                        editor.ui.registry.addMenuItem('link_button', {
                            text: 'Nuevo botón de enlace',
                            onAction: () => {
                                editor.windowManager.open({
                                    title: 'Nuevo botón de enlace',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'input',
                                                name: 'button_label',
                                                label: 'Título del botón',
                                                flex: true
                                            },
                                            {
                                                type: 'input',
                                                name: 'button_href',
                                                label: 'Enlace',
                                                flex: true
                                            },
                                            {
                                                type: 'selectbox',
                                                name: 'button_target',
                                                label: 'Comportamiento',
                                                items: [
                                                    {text: 'Abrir en la misma ventana', value: '_self'},
                                                    {text: 'Abrir en nueva ventana', value: '_blank'},
                                                ],
                                                flex: true
                                            },
                                            {
                                                type: 'selectbox',
                                                name: 'button_style',
                                                label: 'Estilo',
                                                items: [
                                                    {text: 'Naranja - Principal', value: 'bg-mc-primary'},
                                                    {text: 'Morado - Secundario', value: 'bg-mc-secondary'},
                                                ],
                                                flex: true
                                            }
                                        ]
                                    },
                                    onSubmit: (api) => {
                                        const html = `
                                            <a
                                                href="${api.getData().button_href}"
                                                target="${api.getData().button_target}"
                                            >
                                                <button 
                                                    class="hover:shadow-md transition-all text-white font-bold py-2 px-4 rounded-md uppercase w-full ${api.getData().button_style}"
                                                >
                                                    ${api.getData().button_label}
                                                </button>
                                            </a>`;
        
                                        editor.insertContent(html);
                                        api.close();
                                    },
                                    buttons: [
                                        {
                                            text: 'Cerrar',
                                            type: 'cancel',
                                            onclick: 'close'
                                        },
                                        {
                                            text: 'Agregar',
                                            type: 'submit',
                                            primary: true,
                                        }
                                    ]
                                });
                            }
                        });

                        if (Object.keys(funciones).length > 0)
                        editor.ui.registry.addMenuItem('function_button', {
                            text: 'Nuevo botón para tarea',
                            onAction: () => {
                                editor.windowManager.open({
                                    title: 'Nuevo botón para tarea',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'input',
                                                name: 'button_label',
                                                label: 'Título del botón',
                                                flex: true
                                            },
                                            {
                                                type: 'selectbox',
                                                name: 'button_value',
                                                label: 'Función',
                                                items: Object.keys(funciones).map((funcion) => ({
                                                    text: funcion,
                                                    value: funcion
                                                })),
                                                flex: true
                                            },
                                            {
                                                type: 'selectbox',
                                                name: 'button_style',
                                                label: 'Estilo',
                                                items: [
                                                    {text: 'Naranja - Principal', value: 'bg-mc-primary'},
                                                    {text: 'Morado - Secundario', value: 'bg-mc-secondary'},
                                                ],
                                                flex: true
                                            },
                                        ]
                                    },
                                    onSubmit: (api) => {
                                        const html = `
                                            <button 
                                                class="hover:shadow-md transition-all text-white font-bold py-2 px-4 rounded-md uppercase w-full ${api.getData().button_style}"
                                                data-fun="${api.getData().button_value}"
                                                data-title="${api.getData().button_label}"
                                            >
                                                ${api.getData().button_label}
                                            </button>`;
        
                                        editor.insertContent(html);
                                        api.close();
                                    },
                                    buttons: [
                                        {
                                            text: 'Cerrar',
                                            type: 'cancel',
                                            onclick: 'close'
                                        },
                                        {
                                            text: 'Agregar',
                                            type: 'submit',
                                            primary: true,
                                        }
                                    ]
                                });
                            }
                        });
                    }
                }}
                value={ value }
                onEditorChange={ onEditorChange }
            />
        </div>
      );
};

export default CustomTinyMCE2;