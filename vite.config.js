import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
            less: {
                // Bootstrap 3 Less sources rely on pre-v4 math behavior
                math: 'always',
            },
        },
    },
})
