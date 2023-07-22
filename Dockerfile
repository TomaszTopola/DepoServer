FROM node:latest
WORKDIR /usr/src/depoServer
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]