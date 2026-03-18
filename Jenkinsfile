pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.42.1-jammy'
        }
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps { sh 'npm ci' }
        }

        stage('Test') {
            steps { sh 'npm test' }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**,playwright-report/**', allowEmptyArchive: true
        }
    }
}