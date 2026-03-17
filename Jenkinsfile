pipeline {
  agent any

  tools {
    nodejs '24.14.0LTS'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'test-results/**,playwright-report/**', allowEmptyArchive: true
    }
  }
}