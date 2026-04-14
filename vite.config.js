import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
    compression({
      algorithm: 'brotliCompress',
      threshold: 1024,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          indianData: ['./src/indianData.js'],
          asianData: ['./src/asianData.js'],
          koreanData: ['./src/koreanData.js'],
          vietnameseData: ['./src/vietnameseData.js'],
          indonesianData: ['./src/indonesianData.js'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    cssMinify: true,
    sourcemap: false,
  },
})
