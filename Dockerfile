FROM node:16-alpine
RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8081
CMD [ "http-server", "dist" ]FROM node:9.11.1-alpine
RUN npm install -g http-server


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8081
CMD [ "http-server", "dist" ]