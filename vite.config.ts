import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force a single copy of React across framer-motion and the app.
    // Without this, Vite's dep pre-bundler can ship two Reacts and hooks throw.
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
    // Fall back to next free port instead of crashing if 8080 is held by an
    // orphaned node process (happens when a previous dev terminal is closed
    // without Ctrl+C). Terminal will print whichever port is actually used.
    strictPort: false,
    headers: {
      // Dev server must never cache; Netlify handles caching + security in production.
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom/client',
      'framer-motion',
    ],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      },
      tsconfigRaw: {
        compilerOptions: {
          target: 'esnext',
          moduleResolution: 'bundler'
        }
      }
    }
  }
}));