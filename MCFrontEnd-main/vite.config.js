import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 5000,
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/css/app.css'
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        hmr: {
            host: '127.0.0.1',
        },
        watch: {
            usePolling: true,
        }
    },
});
