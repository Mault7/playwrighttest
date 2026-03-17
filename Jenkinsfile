pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.42.1-jammy'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE --shm-size=2g'
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