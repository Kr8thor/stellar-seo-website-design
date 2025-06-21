
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Always enable component tagger in development for visual editing
    componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure .htaccess is copied to dist folder
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
  },
  // Ensure proper development mode detection
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    '__DEV__': mode === 'development',
  },
}));
