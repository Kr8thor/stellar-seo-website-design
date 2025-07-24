import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Vite config for serving the SPA build
export default defineConfig({
  plugins: [react()],
  root: './dist-spa-temp',
  server: {
    port: 8091,
    open: true,
    // This is the key setting for SPA routing
    historyApiFallback: true
  },
  preview: {
    port: 8091,
    open: true,
    // Ensure all routes fallback to index.html
    historyApiFallback: true
  }
});
