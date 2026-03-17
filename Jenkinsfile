pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.42.1-jammy'
    }
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
}