<h1>Templates for env files</h1>

1. `.env`

```txt
HTTP = 
MONGO_URL = 
JWT_SECRET = 
```

2. `docker-compose.yaml`

```yaml
version: '3.9'

services:
  # Mongodb services
  mongo_db:
    container_name: mongo
    image: mongo:latest
    restart: always
    volumes: 
      - mongo_db:/data/db
  
  #API service
  depo_api:
    container_name: depo_api
    build: .
    ports:
      - 8080:8080
    environment:
      HTTP: 8080
      MONGO_URL: mongodb://mongo:27017/depo
      JWT_SECRET: example
    depends_on:
      - mongo_db
    restart: always

volumes:
  mongo_db: {}

```

3. `Dockerfile`

```dockerfile
FROM node:latest
WORKDIR /usr/src/depoServer
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```
4. `.dockerignore`
```dockerignore
./node_modules
Dockerfile
.dockerignore
docker-compose.yaml
```
