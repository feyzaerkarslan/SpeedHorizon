# Temel imaj
FROM node:18

# Çalışma dizini
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Portu aç
EXPOSE 5001

# Uygulamayı başlat
CMD ["node", "src/api/server.js"] 