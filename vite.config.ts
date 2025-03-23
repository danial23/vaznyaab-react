import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'Vaznyaab', // optional, for UMD builds
      fileName: () => `vaznyaab.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // external: ['react', 'react-dom'],
      // into your library
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env': {},
  },
})
