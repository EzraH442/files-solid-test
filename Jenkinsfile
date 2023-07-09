pipeline {
  agent any

  credentials {
    VITE_hcaptchaSitekey = credentials('files-hcaptchaSitekey')
    VITE_gatewayUrl      = credentials('files-gatewayUrl')
  }

  stages {
    stage('build dev') {
      when { branch 'dev' }
      steps {
        sh 'docker build -t ezraweb/files:dev . '
      }
    }
    stage('build main') {
      when { branch 'main' }
      steps {
        sh 'docker build -t ezraweb/files:latest . '
      }
    }
  }
}
