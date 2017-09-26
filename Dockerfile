FROM node:alpine

COPY . /var/www/

EXPOSE 3000 3001

WORKDIR /var/www

RUN yarn && npm run build:prod
