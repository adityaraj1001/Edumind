pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/adityaraj1001/Edumind.git'
            }
        }

        stage('Check Java & Maven') {
            steps {
                bat 'java -version'
                bat 'mvn -version'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }
    }

    post {
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }
    }
}