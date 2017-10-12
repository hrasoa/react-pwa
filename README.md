# React Progressive Web Application

> Real world boilerplate

There are lot of awesome start kits out there, but most of them are fine for small or medium projects: they only run the app and that's almost all. This app does more as on production, this app runs with an [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) load balancer, a [Nginx reverse proxy](https://www.nginx.com/resources/wiki/) and [pm2](http://pm2.keymetrics.io/):

```web --> Ingress --> Nginx --> ("/":3000, "/api":3001)```

With this kind of set up we can easily add SSL, gzip compression, load balancing, etc ...

Before going further, make sure that your provider supports this kind of architecture. Or at least the ability to run the app and nginx.

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

## Getting started

Prerequisites: on development, you will need [docker-compose](https://docs.docker.com/compose/) and optionally [docker-sync](http://docker-sync.io/) as the mounted volumes from docker are very slow.

    $ git clone git@github.com:hrasoa/react-pwa.git app
    $ cd app/docker
    $ docker-sync start
    $ docker-compose run app yarn
    $ docker-compose up

Visit http://localhost:8001

Running the production build:

    $ docker-compose run app npm run build:prod
    $ docker-compose -f docker-compose.yml -f production.yml up
    
  
## Testing the deployment

Prerequisites: [Minikube](https://kubernetes.io/docs/tutorials/stateless-application/hello-minikube/), follow the tutorial here are the commands that should be run:

    $ minikube start
    $ kubectl config use-context minikube
    $ eval $(minikube docker-env)
    
If you look at [the deployment configuration](https://github.com/hrasoa/react-pwa/blob/master/k8s/development/app.yml), you will have to build ```node:v1``` and ```nginx:v1``` images and apply all the required services. 

From the root folder:

    $ docker build -t node:v1 .
    $ docker build -t nginx:v1 docker/nginx/
    $ kubectl apply -f k8s/services
    $ kubectl apply -f k8s/development
    $ kubectl get ing (wait for the I.P to be assigned)
    NAME          HOSTS     ADDRESS          PORTS     AGE
    pwa-ingress   *         <I.P>            80        15d
    
Visit ```<I.P>```

## Deploying the app

This app is ready to be used on [Google Cloud Platform](https://cloud.google.com/) with [Jenkins CI Multi-branch Pipeline](https://jenkins.io/doc/book/pipeline/multibranch/). 
If you look at the [Jenkinsfile](https://github.com/hrasoa/react-pwa/blob/master/Jenkinsfile), by default it looks at the changes on the ```master``` branch and apply the production services to deploy the app.
You can follow this tutorial to [setup your continuous delivery pipeline](https://cloud.google.com/solutions/continuous-delivery-jenkins-container-engine).
   
