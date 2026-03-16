pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    SONARQUBE_ENV = 'sonarqube'
    SONAR_PROJECT_KEY = 'dittopedia-shared'
    SONAR_PROJECT_NAME = 'dittopedia-shared'
    NPM_CREDENTIALS_ID = 'npm-token'
  }

  stages {
    stage('Install') {
      steps {
        sh 'bun install --frozen-lockfile'
      }
    }

    stage('Build') {
      steps {
        sh 'bun run build'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${SONARQUBE_ENV}") {
          script {
            def sonarBranchArgs = ''
            if (env.CHANGE_ID) {
              // Pull Request
              sonarBranchArgs = " -Dsonar.pullrequest.key=${env.CHANGE_ID} -Dsonar.pullrequest.branch=${env.CHANGE_BRANCH} -Dsonar.pullrequest.base=${env.CHANGE_TARGET}"
            } else if (env.BRANCH_NAME && env.BRANCH_NAME != 'main') {
              // Feature branch
              sonarBranchArgs = " -Dsonar.branch.name=${env.BRANCH_NAME}"
            }
            // Main branch: no extra args needed
            sh """
              sonar-scanner \
                -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                -Dsonar.projectName=${SONAR_PROJECT_NAME} \
                -Dsonar.sources=src${sonarBranchArgs}
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 10, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Publish to npm') {
      when {
        tag "v*"
      }
      steps {
        withCredentials([string(credentialsId: "${NPM_CREDENTIALS_ID}", variable: 'NPM_TOKEN')]) {
          sh '''
            set +e
            NPM_CONFIG_USERCONFIG="$(mktemp)"
            export NPM_CONFIG_USERCONFIG
            trap 'rm -f "$NPM_CONFIG_USERCONFIG"' EXIT
            cat > "$NPM_CONFIG_USERCONFIG" << EOF
            //registry.npmjs.org/:_authToken=${NPM_TOKEN}
            EOF
            npm publish --access public
            set -e
          '''
        }
      }
    }
  }
}
