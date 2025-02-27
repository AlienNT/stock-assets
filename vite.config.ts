import { URL, fileURLToPath } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig(({mode, command}) => {
    const {VITE_BASE_URL, VITE_API_KEY} = loadEnv(mode, process.cwd())

    const base = command === 'build' && !VITE_BASE_URL ?
        '/stock-assets/' :
        VITE_BASE_URL || '/'

    console.log({ base, VITE_API_KEY, mode, command })

    return {
        base,
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        css: {
            preprocessorOptions: {
              scss: {
                  api: 'modern-compiler'
              }
            },
            postcss: {
                plugins: [
                    autoprefixer({})
                ]
            }
        },
        optimizeDeps: {
            exclude:['vue-flex-waterfall']
        }
    }
})
