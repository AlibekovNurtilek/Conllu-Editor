# 1. Базовый образ Node.js
FROM node:18-alpine

# 2. Установка рабочей директории внутри контейнера
WORKDIR /app

# 3. Копируем package.json и package-lock.json
COPY package*.json ./

# 4. Установка зависимостей
RUN npm install

# 5. Копируем весь проект
COPY . .

# 6. Билдим проект
RUN npm run build

# 7. Установка сервера для продакшна
RUN npm install -g serve

# 8. Открываем порт
EXPOSE 4173

# 9. Запускаем Vite билд с помощью serve
CMD ["serve", "-s", "dist", "-l", "4173"]
