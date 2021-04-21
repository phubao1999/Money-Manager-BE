FROM node:12-alpine

ARG db_connection
ARG NAME
ARG PASSWORD

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]