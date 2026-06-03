pipeline {

    agent any

    stages {

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

    }
}