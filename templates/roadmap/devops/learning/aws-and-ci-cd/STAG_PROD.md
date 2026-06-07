# COMPLETE STAGING & PRODUCTION SETUP

## With Nginx + CI/CD + NVM + PM2

---

## OVERALL ARCHITECTURE

```
staging.yourdomain.com  → Nginx → localhost:3001 → Next.js (staging)
yourdomain.com          → Nginx → localhost:3000 → Next.js (production)
```

* One EC2
* Two apps
* Two ports
* Two Nginx configs
* Two CI/CD pipelines

---

# PART 1: FOLDER & PORT STRUCTURE (ONE TIME)

### Production

* Folder: `/var/www/web-prod`
* Port: `3000`
* PM2 name: `next-web-prod`
* Domain: `yourdomain.com`

### Staging

* Folder: `/var/www/web-staging`
* Port: `3001`
* PM2 name: `next-web-staging`
* Domain: `staging.yourdomain.com`

---

# PART 2: PREPARE PROJECT FOLDERS ON EC2

Login to EC2:

```bash
ssh ubuntu@YOUR_EC2_PUBLIC_IP
```

Create folders:

```bash
sudo mkdir -p /var/www/web-prod
sudo mkdir -p /var/www/web-staging
sudo chown -R ubuntu:ubuntu /var/www
```

---

# PART 3: CLONE REPOSITORY (ONE TIME)

### Production

```bash
cd /var/www/web-prod
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git .
git checkout main
```

### Staging

```bash
cd /var/www/web-staging
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git .
git checkout staging
```

---

# PART 4: ENV FILES (IMPORTANT)

### Production `.env.production`

```bash
nano /var/www/web-prod/.env.production
```

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

### Staging `.env.production`

```bash
nano /var/www/web-staging/.env.production
```

```env
NODE_ENV=staging
PORT=3001
NEXT_PUBLIC_BASE_URL=https://staging.yourdomain.com
```

---

# PART 5: DEPLOY SCRIPTS (CRITICAL)

## 5.1 Production deploy script

```bash
nano /var/www/web-prod/deploy.sh
```

```bash
#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /var/www/web-prod

git pull origin main
npm install
npm run build

pm2 restart next-web-prod || pm2 start npm --name "next-web-prod" -- start
pm2 save
```

```bash
chmod +x /var/www/web-prod/deploy.sh
```

---

## 5.2 Staging deploy script

```bash
nano /var/www/web-staging/deploy.sh
```

```bash
#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /var/www/web-staging

git pull origin staging
npm install
npm run build

pm2 restart next-web-staging || pm2 start npm --name "next-web-staging" -- start
pm2 save
```

```bash
chmod +x /var/www/web-staging/deploy.sh
```

---

# PART 6: TEST APPS LOCALLY (MANDATORY)

```bash
curl http://localhost:3000
curl http://localhost:3001
```

Both must respond before Nginx setup.

---

# PART 7: NGINX CONFIGURATION (VERY IMPORTANT)

## 7.1 Remove default Nginx site (recommended)

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## 7.2 Production Nginx config

Create file:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Paste:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```

---

## 7.3 Staging Nginx config

Create file:

```bash
sudo nano /etc/nginx/sites-available/staging.yourdomain.com
```

Paste:

```nginx
server {
    listen 80;
    server_name staging.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/staging.yourdomain.com /etc/nginx/sites-enabled/
```

---

## 7.4 Test and reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

# PART 8: ENABLE HTTPS (STRONGLY RECOMMENDED)

```bash
sudo certbot --nginx \
-d yourdomain.com -d www.yourdomain.com \
-d staging.yourdomain.com
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

---

# PART 9: GITHUB ACTIONS (CI/CD)

You already have:

* `deploy-staging.yml` → branch `staging`
* `deploy-prod.yml` → branch `main`

No changes needed here.

---

# PART 10: DAILY WORKFLOW (HOW YOU USE IT)

### Deploy to staging

```bash
git checkout staging
git push origin staging
```

### Promote to production

```bash
git checkout main
git merge staging
git push origin main
```

---

# PART 11: VERIFY EVERYTHING

```bash
pm2 status
sudo systemctl status nginx
```

Open in browser:

* [https://staging.yourdomain.com](https://staging.yourdomain.com)
* [https://yourdomain.com](https://yourdomain.com)

---

# COMMON MISTAKES (READ CAREFULLY)

* Using same port for both apps
* Using same PM2 name
* Forgetting to reload Nginx
* Editing production directly
* Skipping local curl test

---

## FINAL RESULT

You now have:

* Proper staging + production
* Clean Nginx routing
* Automated CI/CD
* Safe promotion flow
* Industry-grade setup