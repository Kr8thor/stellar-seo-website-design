
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Enhanced server settings for Lovable
    watch: {
      usePolling: true,
      interval: 1000,
    },
    // Enable HMR for better development experience
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // Always include componentTagger for Lovable integration
    componentTagger({
      // Enhanced settings for better Lovable integration
      enabled: true,
      // Only tag components in development
      tagInProduction: false,
      // Custom tag attributes for Lovable
      tagAttribute: 'data-lovable-component',
      // Include file path in tags for better editing
      includeFilePath: true,
      // Exclude node_modules from tagging
      exclude: ['node_modules/**'],
    }),
  ].filter(Boolean),
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
    // Optimize build for Lovable
    sourcemap: mode === 'development',
    // Disable minification in development for better debugging
    minify: mode === 'production',
  },
  // Enable CSS source maps for better development
  css: {
    devSourcemap: true,
  },
  // Optimize dependencies for faster dev server
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
