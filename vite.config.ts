
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('Vite config: mode =', mode);
  
  const plugins = [react()];
  
  // Add component tagger only in development mode
  if (mode === 'development') {
    try {
      console.log('Adding componentTagger plugin...');
      plugins.push(componentTagger({
        enabled: true,
        debug: true,
      }));
      console.log('componentTagger plugin added successfully');
    } catch (error) {
      console.error('Failed to load componentTagger plugin:', error);
    }
  }
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
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
  };
});
