import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// INTEGRATED VITE CONFIG: Serves both React AND pre-rendered HTML
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false,
    },
    // CRITICAL: Custom middleware to serve pre-rendered HTML for crawlers
    middlewares: [
      // Middleware to detect crawlers and serve static HTML
      {
        name: 'crawler-detector',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const userAgent = req.headers['user-agent'] || '';
            const isCrawler = /bot|crawl|slurp|spider|facebookexternalhit|twitterbot|linkedinbot/i.test(userAgent);
            
            if (isCrawler && req.url) {
              // Serve pre-rendered HTML for crawlers
              const staticPath = req.url === '/' ? '/index.html' : `${req.url}/index.html`;
              const staticFile = path.join(__dirname, 'dist', staticPath);
              
              try {
                const fs = require('fs');
                if (fs.existsSync(staticFile)) {
                  const html = fs.readFileSync(staticFile, 'utf-8');
                  res.setHeader('Content-Type', 'text/html');
                  res.end(html);
                  return;
                }
              } catch (error) {
                console.log('Static file not found, serving React:', staticPath);
              }
            }
            
            // Serve React for normal users
            next();
          });
        }
      }
    ]
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    sourcemap: mode === 'development',
    minify: mode === 'production',
    // CRITICAL: Generate both SPA and pre-rendered files
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  // Enable SSR/SSG capabilities
  ssr: {
    noExternal: ['@radix-ui/react-*']
  }
}));
