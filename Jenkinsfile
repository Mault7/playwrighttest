pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy'
        }
    }

    parameters {
      choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Environment')
      booleanParam(name: 'RUN_E2E', defaultValue: true, description: 'Run E2E tests')
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
                    when {
                        expression { params.RUN_E2E == true }
                    }
                    steps { sh 'npm run test:e2e' }
                }
            }
        }

        stage('Deploy (Manual)') {
            steps {
                input message: '¿Ejecutar deploy simulado?', ok: 'Deploy'
                sh 'echo \"Deploy simulado OK\"'
                sh 'echo \"Deploy a ${params.ENV} completado\"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito.'
        }
        always {
            archiveArtifacts artifacts: 'dist/**,test-results/**,playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo 'Pipeline falló. Revisar los logs para más detalles.'
        }
    }
}
