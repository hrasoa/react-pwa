node {
  def project = 'project-180811'
  def appName = 'pwa'
  def feSvcName = "${appName}-frontend"
  def ingSvcName = "${appName}-ingress"
  def appSvcName = "${appName}-app"
  def feImageTag = "gcr.io/${project}/${feSvcName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  def appImageTag = "gcr.io/${project}/${appSvcName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Apis version'
  sh("kubectl version")

  stage 'Build images'
  sh("docker build -t ${feImageTag} ./docker/nginx")

  stage 'Push image to registry'
  sh("gcloud docker -- push ${feImageTag}")

  stage "Deploy Application"
  switch (env.BRANCH_NAME) {

    // Roll out to production
    case "master":
        // build and push production image
        sh("docker build -t ${appImageTag} --build-arg APP_ENV=production .")
        sh("gcloud docker -- push ${appImageTag}")

        // Change deployed image in canary to the one we just built
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/pwa-app:1.0.0#${appImageTag}#' ./k8s/production/*.yml")
        sh("sed -i.bak 's#gcr.io/cloud-solutions-images/pwa-frontend:1.0.0#${feImageTag}#' ./k8s/production/*.yml")
        sh("kubectl --namespace=production apply -f k8s/services/")
        sh("kubectl --namespace=production apply -f k8s/production/")
        break
  }
}