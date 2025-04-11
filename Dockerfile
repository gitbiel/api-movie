FROM node:20.16-alpine

WORKDIR /app

COPY package.*json ./
COPY src ./src
COPY .env ./

RUN npm install

EXPOSE 3333

CMD [ "npm", "start" ]