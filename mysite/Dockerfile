# 1. Этап сборки (build stage)
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем остальные файлы и собираем проект
COPY . .
RUN npm run build

# 2. Этап сервера (production stage)
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа в Nginx директорию
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx, если есть (необязательно)
# COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

# Команда по умолчанию
CMD ["nginx", "-g", "daemon off;"]