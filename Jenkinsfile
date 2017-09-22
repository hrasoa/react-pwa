node {
  def project = 'project-180811'
  def appName = 'pwa'
  def frontendName = "${appName}-frontend"
  def nodeAppName = "${appName}-nodeapp"
  def frontendImageTag = "gcr.io/${project}/${frontendName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def nodeAppImageTag = "gcr.io/${project}/${nodeAppName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build images'
  sh("docker build -t ${frontendImageTag} ./docker/nginx")
  sh("docker build -t ${nodeAppImageTag} .")

  stage 'Push image to registry'
  sh("gcloud docker -- push ${frontendImageTag}")
  sh("gcloud docker -- push ${nodeAppImageTag}")

  stage "Deploy Application"
  switch (env.BRANCH_NAME) {

    // Roll out to production
    case "master":
        // Change deployed image in canary to the one we just built
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/pwa-nodeapp:1.0.0#${nodeAppImageTag}#' ./k8s/production/*.yml")
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/pwa-frontend:1.0.0#${frontendImageTag}#' ./k8s/production/*.yml")
        sh("kubectl --namespace=production apply -f k8s/services/")
        sh("kubectl --namespace=production apply -f k8s/production/")
        sh("echo http://`kubectl --namespace=production get service/${frontendName} --output=json | jq -r '.status.loadBalancer.ingress[0].ip'` > ${frontendName}")
        break
  }
}