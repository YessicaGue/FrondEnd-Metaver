import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';

const CustomTinyMCE = (props) => {
    const { value, onEditorChange, onInit = () => {}, onUpload = () => {} } = props;

    return (
        <Box>
            <Editor
                apiKey='munclm49481zxfx9k2lv8vwsfxu0btcay5g5k25w6ehqfxhw'
                onInit={ onInit }
                init={{
                    statusbar: false,
                    language: "es_MX",
                    language_url: "/langs/es_MX.js",
                    max_height: 700,
                    min_height: 200,
                    menubar: 'insert | format',
                    plugins: [
                        'autolink', 'link', 'image',
                        'insertdatetime', 'media', 'wordcount', 'emoticons'
                    ],
                    toolbar: 'undo redo | blocks | fonts |' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'emoticons',
                    images_upload_handler: onUpload,
                    image_description: false,
                    image_dimensions: false,
                    media_poster: false,
                    media_alt_source: false,
                    media_dimensions: false,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    setup: function(editor) {
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
                    }
                }}
                value={ value }
                onEditorChange={ onEditorChange }
            />
        </Box>
      );
};

export default CustomTinyMCE;