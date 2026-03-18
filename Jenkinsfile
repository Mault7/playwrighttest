pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
        }
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps { sh 'npm ci' }
        }

        stage('Build') {
            steps { sh 'npm run build' }
        }

        stage('Tests') {
            parallel {
                stage('Unit Tests') {
                    steps { sh 'npm run test:unit' }
                }
                stage('E2E Tests') {
                    steps { sh 'npm run test:e2e' }
                }
            }
        }

        stage('Deploy (Manual)') {
            steps {
                input message: '¿Ejecutar deploy simulado?', ok: 'Deploy'
                sh 'echo \"Deploy simulado OK\"'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'dist/**,test-results/**,playwright-report/**', allowEmptyArchive: true
        }
    }
}
