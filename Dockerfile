FROM node:alpine

COPY . /var/www/

EXPOSE 3000 3001

WORKDIR /var/www

RUN yarn && \
    nmp t \
    npm run build:prod
