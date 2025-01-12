import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Membuka browser secara otomatis
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Tambahkan fallback untuk mendukung routing SPA
  base: '/',
  server: {
    historyApiFallback: true,
  },
});
