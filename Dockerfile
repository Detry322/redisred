FROM node:latest

ARG APP_PATH=/redisred

RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

COPY package.json $APP_PATH
RUN npm install

COPY . $APP_PATH

EXPOSE 3000

CMD ["node", "app.js"]
