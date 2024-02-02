const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            screens: {
                'xs': '475px',
                ...defaultTheme.screens,
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                sans_mona: ['Mona-Sans', ...defaultTheme.fontFamily.sans],
                sans_hubot: ['Hubot-Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'mc-primary': '#ff8300',
                'mc-secondary': '#6f1fb4',
                'mc-gradient1_1': '#ffba4b',
                'mc-gradient1_2': '#ff8300',
                'mc-gradient2_1': '#FE6B8B',
                'mc-gradient2_2': '#FF8E53',
                'mc-gradient3_1': '#F12711',
                'mc-gradient3_2': '#F5AF19',
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
