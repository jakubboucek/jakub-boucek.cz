import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === 'production'
    const isStaging = mode === 'staging'

    return {
        root: '.', // můžeš přizpůsobit
        base: './', // důležité pro statické HTML
        build: {
            outDir: 'public',
            emptyOutDir: true,
            sourcemap: isStaging, // staging = laditelný production
            minify: isProd, // jen production build je minifikovaný
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'src/main.js'),
                    style: resolve(__dirname, 'src/style.scss'),
                },
                output: {
                    // příklad výstupu do specifických jmen
                    entryFileNames: 'js/[name].js',
                    assetFileNames: ({ name }) => {
                        if (name && name.endsWith('.css')) return 'css/[name]'
                        return 'src/[name]'
                    }
                }
            }
        },
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: 'node_modules/bootstrap-icons/font/*',
                        dest: 'fonts/bootstrap-icons'
                    },
                    {
                        src: 'node_modules/bootstrap/dist/fonts/*', // fallback pokud používáš staré fonty
                        dest: 'fonts/bootstrap'
                    }
                ]
            })
        ]
    }
})

