FROM node:latest
WORKDIR /backend/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["node", "dist/server.js"]