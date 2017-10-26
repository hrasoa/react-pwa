FROM node:alpine

EXPOSE 3000 3001
WORKDIR /var/www
ARG APP_ENV

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN npm t && \
    npm run build:$APP_ENV
