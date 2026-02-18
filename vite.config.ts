import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            },
                        },
                        {
                            name: 'removeAttrs',
                            params: {
                                attrs: '(stroke-width)',
                            },
                        },
                    ],
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@models_': path.resolve(__dirname, './src/components/three-models'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@context': path.resolve(__dirname, './src/context'),
            '@managers': path.resolve(__dirname, './src/managers'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@styles': path.resolve(__dirname, './src/styles'),
        },
    },
    server: {
        port: 5050,
    },
});
