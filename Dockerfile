FROM node:alpine

WORKDIR /var/www

COPY package.json .

RUN yarn

COPY . .

RUN npm t && \
    npm run build:prod

EXPOSE 3000 3001
