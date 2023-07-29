pipeline {
  agent any

  environment {
    VITE_hcaptchaSitekey = credentials('files-hcaptchaSitekey')
    VITE_gatewayUrl      = credentials('files-gatewayUrl')
    VITE_authUrl         = credentials('files-authUrl')
  }

  stages {
    stage('build dev') {
      when { branch 'dev' }
      steps {
        sh 'docker build -t ezraweb/files:dev --build-arg VITE_hcaptchaSitekey="${VITE_hcaptchaSitekey}" --build-arg VITE_gatewayUrl="${VITE_gatewayUrl}" --build-arg VITE_authUrl="${VITE_authUrl}" .'
      }
    }
    stage('build main') {
      when { branch 'main' }
      steps {
        sh 'docker build -t ezraweb/files:latest --build-arg VITE_hcaptchaSitekey="${VITE_hcaptchaSitekey}" --build-arg VITE_gatewayUrl="${VITE_gatewayUrl}" --build-arg VITE_authUrl="${VITE_authUrl}" .'
      }
    }
  }
}
