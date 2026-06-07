# JENKINS CI/CD – FULL DETAILED GUIDE

## Jenkins + EC2 + NVM + PM2 (Beginner to Production)

---

## SECTION 1: UNDERSTAND THE FLOW (VERY IMPORTANT)

Before commands, understand this clearly.

1. You push code to GitHub
2. GitHub notifies Jenkins (Webhook)
3. Jenkins starts a pipeline
4. Jenkins connects to EC2 using SSH
5. EC2 runs a deploy script
6. PM2 reloads the app
7. Users see no downtime

Key rule:

* Jenkins **never builds directly on EC2**
* Jenkins only **triggers deployment**
* Actual build happens on EC2 (where NVM exists)

---

## SECTION 2: WHERE JENKINS SHOULD BE INSTALLED

You have two choices:

Option A (Simple, OK for learning):

* Install Jenkins on the same EC2 as your app

Option B (Recommended for production):

* Install Jenkins on a **separate EC2**

In this guide, we assume:

* Jenkins is on its **own EC2**
* App is on a **different EC2**

---

## SECTION 3: INSTALL JENKINS (ONE TIME ONLY)

### Step 3.1: Login to Jenkins EC2

```bash
ssh ubuntu@JENKINS_EC2_PUBLIC_IP
```

---

### Step 3.2: Install Java (Jenkins needs Java)

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk
java -version
```

If Java version prints, continue.

---

### Step 3.3: Add Jenkins repository

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

```bash
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null
```

---

### Step 3.4: Install Jenkins

```bash
sudo apt update
sudo apt install -y jenkins
```

---

### Step 3.5: Start Jenkins

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
```

Status must show `active (running)`.

---

### Step 3.6: Open Jenkins in browser

Open:

```
http://JENKINS_EC2_PUBLIC_IP:8080
```

Security Group must allow port `8080`.

---

### Step 3.7: Unlock Jenkins

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Paste password in browser.

Choose:

* Install suggested plugins
* Create admin user

---

## SECTION 4: PREPARE JENKINS USER FOR NVM (CRITICAL)

Important fact:

* Jenkins runs as user **jenkins**
* NVM installed for `ubuntu` does NOT work for `jenkins`

We must install NVM **again for Jenkins user**.

---

### Step 4.1: Switch to Jenkins user

```bash
sudo su - jenkins
```

---

### Step 4.2: Install NVM for Jenkins user

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Reload environment:

```bash
source ~/.bashrc
```

---

### Step 4.3: Install Node using NVM

```bash
nvm install 24
nvm use 24
nvm alias default 24
```

Verify:

```bash
node -v
npm -v
```

Exit Jenkins user:

```bash
exit
```

---

## SECTION 5: GIVE JENKINS SSH ACCESS TO APP EC2

Jenkins must connect to App EC2 **without password**.

---

### Step 5.1: Generate SSH key for Jenkins

```bash
sudo su - jenkins
ssh-keygen -t ed25519 -C "jenkins-deploy"
```

Press Enter for all questions.

---

### Step 5.2: Copy Jenkins public key

```bash
cat ~/.ssh/id_ed25519.pub
```

---

### Step 5.3: Add key to App EC2

Login to **App EC2**:

```bash
ssh ubuntu@APP_EC2_PUBLIC_IP
```

```bash
nano ~/.ssh/authorized_keys
```

Paste Jenkins public key. Save.

---

### Step 5.4: Test SSH from Jenkins to App EC2

Back on Jenkins EC2:

```bash
sudo su - jenkins
ssh ubuntu@APP_EC2_PUBLIC_IP
```

If login works without password, continue.

---

## SECTION 6: CREATE DEPLOY SCRIPT ON APP EC2

This script does the real work.

---

### Step 6.1: Create deploy.sh

On App EC2:

```bash
nano /var/www/web/deploy.sh
```

Paste:

```bash
#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /var/www/web

git pull origin main
npm install
npm run build

pm2 reload next-web || pm2 start npm --name "next-web" -- start
pm2 save
```

Make executable:

```bash
chmod +x /var/www/web/deploy.sh
```

---

### Step 6.2: Test deploy script manually

```bash
cd /var/www/web
./deploy.sh
```

If this fails, Jenkins will fail. Fix now.

---

## SECTION 7: CONFIGURE JENKINS PIPELINE

---

### Step 7.1: Install Jenkins plugins

In Jenkins UI:

* Manage Jenkins
* Plugins
* Ensure these exist:

  * Git
  * Pipeline
  * SSH Agent

---

### Step 7.2: Add SSH key to Jenkins credentials

Jenkins UI:

* Manage Jenkins
* Credentials
* Global
* Add Credentials

Fill:

* Kind: SSH Username with private key
* ID: `jenkins-ssh-key`
* Username: ubuntu
* Private key: Jenkins private key

Save.

---

### Step 7.3: Create Jenkins pipeline job

* Jenkins Dashboard
* New Item
* Name: `nextjs-deploy`
* Type: Pipeline
* Save

---

### Step 7.4: Add Jenkinsfile to Git repo

Create file `Jenkinsfile`:

```groovy
pipeline {
  agent any

  stages {
    stage('Deploy') {
      steps {
        sshagent(['jenkins-ssh-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@APP_EC2_PUBLIC_IP \
            "bash -lc 'cd /var/www/web && ./deploy.sh'"
          '''
        }
      }
    }
  }
}
```

Commit and push.

---

## SECTION 8: CONNECT GITHUB TO JENKINS

---

### Step 8.1: Add GitHub webhook

GitHub Repo:

* Settings
* Webhooks
* Add Webhook

Payload URL:

```
http://JENKINS_EC2_PUBLIC_IP:8080/github-webhook/
```

Content type:

```
application/json
```

Save.

---

## SECTION 9: TEST FULL PIPELINE

```bash
git add .
git commit -m "test jenkins deploy"
git push origin main
```

Then:

* Open Jenkins
* Watch pipeline logs
* App should update automatically

---

## SECTION 10: HOW TO DEBUG (VERY IMPORTANT)

On App EC2:

```bash
pm2 status
pm2 logs next-web
```

On Jenkins:

* Open job
* Console Output

---

## FINAL RESULT

You now have:

* Jenkins fully installed
* NVM working correctly
* Secure SSH deployment
* PM2 zero-downtime reload
* Automatic deployment on push