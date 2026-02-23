import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.mp4', '**/*.webm'],

    build: {
      // Output directory
      outDir: 'dist',

      // Generate sourcemaps for production debugging (optional, set to false to reduce size)
      sourcemap: false,

      // Minification - using esbuild (faster and built into Vite)
      minify: 'esbuild',
      esbuild: {
        drop: isProduction ? ['console', 'debugger'] : [],
      },

      // Chunk size warnings
      chunkSizeWarningLimit: 1000,

      // Rollup options for advanced optimization
      rollupOptions: {
        output: {
          // Manual chunking strategy for better caching
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react'],
            'utils-vendor': ['axios'],
          },

          // Asset file naming with content hash for cache busting
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];

            // Images and videos get their own folder with content hash
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
              return `assets/media/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }

            // Other assets
            return `assets/[name]-[hash][extname]`;
          },

          // Chunk file naming with content hash
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },

      // Asset inlining threshold (files smaller than this will be inlined as base64)
      assetsInlineLimit: 4096, // 4kb

      // CSS code splitting
      cssCodeSplit: true,

      // Report compressed size
      reportCompressedSize: true,

      // Enable CSS minification
      cssMinify: true,
    },

    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'axios'],
      exclude: [],
    },
  };
});
