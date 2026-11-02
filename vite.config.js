import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El sitio se publica en https://canopus44.github.io/mr-fix-it/
// Si cambias el nombre del repositorio, actualiza también este base.
export default defineConfig({
  plugins: [react()],
  base: '/mr-fix-it/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
