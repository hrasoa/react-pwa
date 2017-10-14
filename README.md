# React Progressive Web Application

Real world progressive web application running with an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) load balancer, a [Nginx reverse proxy](https://www.nginx.com/resources/wiki/) and [pm2](http://pm2.keymetrics.io/) :

:earth_africa: --> Ingress --> Nginx --> app(/:3000, /api:3001)

## Features

| | Development | Production
--- | --- | ---
Hot Module Replacement | :star: |
GraphiQL | :star: |
Code Split + Async Components | :star: | :star:
Server Side Rendering | :star: | :star:
Chunkhashes | | :star:
Service Worker (precache, offline support) | | :star:
Minify + gzip | | :star:

## Prerequisites

* [docker-compose](https://docs.docker.com/compose/)
* [docker-sync](http://docker-sync.io/)

## Getting started

    $ git clone git@github.com:hrasoa/react-pwa.git app
    $ cd app/docker
    $ docker-sync start
    $ docker-compose run app yarn
    $ docker-compose up

Visit http://localhost:8001

Running the production build:

    $ docker-compose run app npm run build:prod
    $ docker-compose -f docker-compose.yml -f production.yml up    
  
## Deployment

This app will work out of the box on [Google Cloud Platform](https://cloud.google.com/) with [Jenkins CI Multi-branch Pipeline](https://jenkins.io/doc/book/pipeline/multibranch/), more information in the [Jenkinsfile](/Jenkinsfile).

You can follow this tutorial to [setup your continuous delivery pipeline](https://cloud.google.com/solutions/continuous-delivery-jenkins-container-engine).
   
