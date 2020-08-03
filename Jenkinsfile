pipeline {
    agent {
        docker {
            image 'node:12.13.1-alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') { 
            steps {
                sh './jenkins/test.sh' 
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/build.sh' 
                sh './jenkins/kill.sh'
            }
        }

    }
}