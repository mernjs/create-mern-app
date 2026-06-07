# CI/CD COMPLETE STEP-BY-STEP GUIDE 

## GitHub Actions → EC2 (Next.js / Node.js)

### Using SSH + NVM + PM2

---

There are **three environments**:

1. **Your Laptop**

   * You write code
   * You push code to GitHub

2. **GitHub Actions**

   * Runs automatically on `git push`
   * Connects to EC2 using SSH
   * Triggers deployment

3. **EC2 Server**

   * Already created
   * Nginx already running
   * Runs Node via NVM
   * Uses PM2 to run the app

Critical point:

* GitHub Actions **does NOT load NVM automatically**
* We must **explicitly load NVM**
* This is the most common CI/CD failure

---

# STEP 1: LOGIN TO EC2

```bash
ssh ubuntu@YOUR_EC2_PUBLIC_IP
```

Make sure you are logged in as `ubuntu`.

---

# STEP 2: INSTALL NVM ON EC2 

If NVM is already installed, you can still run these safely.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Reload shell:

```bash
source ~/.bashrc
```

Verify:

```bash
nvm --version
```

If this command works, continue.

---

# STEP 3: INSTALL NODE USING NVM

Use the same Node version you use locally.

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

Expected example:

```text
v24.13.1
```

---

# STEP 4: INSTALL PM2

PM2 keeps the app running after reboot.

```bash
npm install -g pm2
```

Verify:

```bash
pm2 -v
```

---

# STEP 5: PREPARE APP DIRECTORY

Your app must exist inside `/var/www`.

```bash
cd /var/www
ls
```

You should see your project folder (example: `web`).

If not:

```bash
sudo mkdir -p /var/www
sudo chown -R ubuntu:ubuntu /var/www
```

---

# STEP 6: ALLOW EC2 TO ACCESS GITHUB (SSH)

This allows EC2 to run `git pull`.

## 6.1 Generate SSH key on EC2

```bash
ssh-keygen -t ed25519 -C "ec2-github-access"
```

Press Enter for all prompts.

---

## 6.2 Add GitHub to known hosts

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
chmod 600 ~/.ssh/known_hosts
```

---

## 6.3 Add public key to GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it to:

GitHub → Settings → SSH and GPG Keys → New SSH Key

---

## 6.4 Test GitHub access from EC2

```bash
ssh -T git@github.com
```

You must see a success message.

---

# STEP 7: CLONE PROJECT ON EC2 (SSH ONLY)

```bash
cd /var/www
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

Important:

* Use **SSH URL**
* Do **not** use HTTPS

---

# STEP 8: CREATE DEPLOY SCRIPT

This script runs **inside EC2** and correctly loads NVM.

Create file:

```bash
nano deploy.sh
```

Paste the **full content below**:

```bash
#!/usr/bin/env bash
set -e

echo "Starting deployment..."

# Load NVM 
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

nvm use 24

echo "Node version:"
node -v
npm -v

cd /var/www/web

git pull origin main
npm install
npm run build

pm2 restart next-web || pm2 start npm --name "next-web" -- start
pm2 save

echo "Deployment completed successfully"
```

Save and exit.

Make executable:

```bash
chmod +x deploy.sh
```

---

# STEP 9: TEST DEPLOY SCRIPT MANUALLY (DO NOT SKIP)

```bash
./deploy.sh
```

Rules:

* If this fails, CI/CD **will fail**
* Fix errors now
* Continue only when this works perfectly

---

# STEP 10: CREATE SSH KEY FOR GITHUB ACTIONS

This key allows GitHub Actions to SSH into EC2.

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy"
```

This creates:

* Private key → GitHub Secret
* Public key → EC2 authorized_keys

---

## 10.1 Add public key to EC2

```bash
nano ~/.ssh/authorized_keys
```

Paste the **public key** and save.

---

# STEP 11: ADD GITHUB SECRETS

Go to:

GitHub Repository → Settings → Secrets → Actions

Add **only these secrets**:

| Name        | Value                |
| ----------- | -------------------- |
| EC2_HOST    | EC2 public IP        |
| EC2_USER    | ubuntu               |
| EC2_SSH_KEY | Full private SSH key |

Important:

* Paste the **entire private key**
* Use **Secrets**, not Variables

---

# STEP 12: CREATE GITHUB ACTIONS WORKFLOW

Create file:

```text
.github/workflows/deploy.yml
```

Paste the **full content**:

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.EC2_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519

          cat <<EOF > ~/.ssh/config
          Host *
            IdentityFile ~/.ssh/id_ed25519
            StrictHostKeyChecking no
          EOF

          chmod 600 ~/.ssh/config
          ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to EC2
        run: |
          ssh ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} \
          "bash -lc 'cd /var/www/web && ./deploy.sh'"
```

---

# STEP 13: PUSH CODE AND DEPLOY

From your laptop:

```bash
git add .
git commit -m "setup ci cd"
git push origin main
```

---

# FINAL RESULT

After this setup:

* `git push` automatically deploys code
* GitHub Actions connects to EC2
* NVM loads correctly
* Node and npm are available
* App builds successfully
* PM2 restarts the app
* No manual SSH needed

---

# COMMON MISTAKES (PLEASE AVOID)

* Using HTTPS Git URL instead of SSH
* Forgetting to load NVM in `deploy.sh`
* Skipping manual `deploy.sh` test
* Not using `bash -lc` in GitHub Actions
* Adding keys as Variables instead of Secrets
