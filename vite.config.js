import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    // static assets copied verbatim into dist/ (Vite default name is "public")
    publicDir: 'static',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                index: 'index.html',
                cv: 'cv/index.html',
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Bootstrap 5 still uses @import and legacy color functions
                quietDeps: true,
                silenceDeprecations: ['import'],
            },
        },
    },
})
