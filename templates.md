<h1>Templates for env files</h1>

1. Docker commands:

`docker compose up --build <service name>` - builds just one service \
`docker compose logs -f -t ` - view live logs from apps 

`docker compose start` \
`docker compose stop` \
`docker compose restart` 

2. `.env`

```.env
HTTP = 
MONGO_URL = 
JWT_SECRET = 

ROOT_FIRST_NAME =
ROOT_LAST_NAME = 
ROOT_PHONE = 
ROOT_MAIL =
ROOT_PASS =
```

3. `docker-compose.yaml`

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
      ROOT_FIRST_NAME: John
      ROOT_LAST_NAME: Doe
      ROOT_PHONE: "123456789"
      ROOT_MAIL: john.doe@example.com
      ROOT_PASS: ilovebananas1234
    depends_on:
      - mongo_db
    restart: always

volumes:
  mongo_db: {}

```

4. `Dockerfile`

```dockerfile
FROM node:latest
WORKDIR /usr/src/depoServer
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```
5. `.dockerignore`
```dockerignore
./node_modules
Dockerfile
.dockerignore
docker-compose.yaml
```
