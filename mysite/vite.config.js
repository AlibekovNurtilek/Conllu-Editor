import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ВАЖНО: гарантирует, что пути в index.html будут корректны (особенно для продакшна)
  base: '/',

  // Прокси только для dev-сервера
  server: {
    proxy: {
      '/api': {
        target: 'http://3.84.57.147:8000',  // 👈 исправленный адрес FastAPI
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // удаляем /api перед запросом
      },
    },
  },
});
