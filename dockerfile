FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV db_connection=value

ENV NAME=value

ENV PASSWORD=value

EXPOSE 3000

CMD [ "npm", "start" ]