# React Progressive Web Application

> Production ready boilerplate

## Getting started

    $ git clone git@github.com:hrasoa/react-pwa.git app
    $ cd app/docker
    $ docker-compose run app yarn
    $ docker-compose up

Access the app with http://localhost:8001

Test the production build:

    $ docker-compose run app npm run build:prod
    $ docker-compose -f docker-compose.yml -f production.yml up 
    
## Features per environment

| | Dev | Production
--- | --- | ---
Hot Module Replacement | :star: |
GraphiQL | :star: |
Code Split + Async Components | :star: | :star:
Server Side Rendering | :star: | :star:
Chunkhashes | | :star:
Service Worker (precache, offline support) | | :star:
Minify + gzip | | :star:
