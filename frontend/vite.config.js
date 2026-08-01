import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
// import daisyui from 'daisyui'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        (await babel({ presets: [reactCompilerPreset()] })),
        tailwindcss(),
        // daisyui(),


    ],

})