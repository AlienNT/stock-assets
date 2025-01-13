import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig(({mode, command}) => {
    const {VITE_BASE_URL} = loadEnv(mode, process.cwd())

    const base = command === 'build' && !VITE_BASE_URL ?
        '/stock-assets/' :
        VITE_BASE_URL

    console.log({ base, mode, command })

    return {
        base,
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer({})
                ]
            }
        }
    }
})
