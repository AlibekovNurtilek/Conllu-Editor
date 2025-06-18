# Используем Node.js для сборки
FROM node:18-alpine as build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Используем Nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем собранное приложение в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx (создадим её ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]