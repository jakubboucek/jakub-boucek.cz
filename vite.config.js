import { defineConfig } from 'vite'
import purgecss from '@fullhuman/postcss-purgecss'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    // static assets copied verbatim into dist/ (Vite default name is "public")
    publicDir: 'static',
    build: {
        outDir: 'dist',
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Bootstrap 5 still uses @import and legacy color functions
                quietDeps: true,
                silenceDeprecations: ['import'],
            },
        },
        postcss: {
            plugins: command === 'build' ? [
                // strip unused Bootstrap rules, production build only
                purgecss({
                    content: ['./index.html', './cv/index.html', './src/**/*.js'],
                    // classes toggled at runtime, invisible to the content scan
                    safelist: ['open'],
                }),
            ] : [],
        },
    },
}))
