import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://https://3.84.57.147:8000', // Замените <your-fastapi-server> на адрес вашего FastAPI-сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Удаляет префикс '/api' из запроса
      },
    },
  },
});
