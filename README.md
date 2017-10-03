# React Progressive Web Application

> Production ready boilerplate

## Getting started

It is recommended to install [docker-sync](http://docker-sync.io/) for a faster development.

    $ git clone git@github.com:hrasoa/react-pwa.git app
    $ cd app/docker
    $ docker-compose run app yarn
    $ docker-compose up

Visit http://localhost:8001

Test the production build:

    $ docker-compose run app npm run build:prod
    $ docker-compose -f docker-compose.yml -f production.yml up
     
## Continuous integration

This app is ready to be used with Kubernetes and [Jenkins CI Multi-branch Pipeline](https://jenkins.io/doc/book/pipeline/multibranch/) on Google Cloud Platform.
It will look at the changes on the ```master``` branch and deploy the app through an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) load balancer:

```Ingress --> Nginx --> (app:3000, api:3001)```

    
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
