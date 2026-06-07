# BLUE-GREEN DEPLOYMENT

## Zero-Downtime + Instant Rollback

---

## WHAT BLUE-GREEN DEPLOYMENT MEANS

You always keep **two identical production environments**:

* **Blue** → currently serving users
* **Green** → new version (not live yet)

Only **one is live at a time**.
Traffic switching happens at **Nginx level**, not at app level.

---

## WHY BLUE-GREEN IS BETTER THAN NORMAL DEPLOY

* Zero downtime
* Instant rollback (no rebuild)
* New version tested before going live
* Safer than `pm2 reload` for big changes

---

## FINAL ARCHITECTURE

```
Users → Nginx → Blue (3000)  OR  Green (3002)
```

* Same domain: `sauranium.com`
* Only **one port active** in Nginx at a time

---

# PART 1: DEFINE BLUE & GREEN ENVIRONMENTS

## Production environments

### Blue (current live)

* Folder: `/var/www/web-blue`
* Port: `3000`
* PM2 name: `next-web-blue`

### Green (new version)

* Folder: `/var/www/web-green`
* Port: `3002`
* PM2 name: `next-web-green`

---

# PART 2: PREPARE FOLDERS (ONE TIME)

```bash
mkdir -p /var/www/web-blue
mkdir -p /var/www/web-green
sudo chown -R ubuntu:ubuntu /var/www
```

---

# PART 3: CLONE REPO INTO BOTH

## Blue

```bash
cd /var/www/web-blue
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git .
git checkout main
```

## Green

```bash
cd /var/www/web-green
git clone git@github.com:YOUR_USERNAME/YOUR_REPO.git .
git checkout main
```

---

# PART 4: ENV FILES

## Blue

```bash
nano /var/www/web-blue/.env.production
```

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_BASE_URL=https://sauranium.com
```

## Green

```bash
nano /var/www/web-green/.env.production
```

```env
NODE_ENV=production
PORT=3002
NEXT_PUBLIC_BASE_URL=https://sauranium.com
```

---

# PART 5: START BOTH APPS (ONE TIME)

```bash
cd /var/www/web-blue
pm2 start npm --name next-web-blue -- start

cd /var/www/web-green
pm2 start npm --name next-web-green -- start

pm2 save
```

---

# PART 6: NGINX BLUE-GREEN CONFIG (CRITICAL)

## Step 6.1: Create upstream config

```bash
sudo nano /etc/nginx/conf.d/blue-green.conf
```

Paste:

```nginx
upstream app_blue {
    server 127.0.0.1:3000;
}

upstream app_green {
    server 127.0.0.1:3002;
}
```

---

## Step 6.2: Create main site config

```bash
sudo nano /etc/nginx/sites-available/sauranium.com
```

Paste (BLUE LIVE):

```nginx
server {
    listen 80;
    server_name saurani um.com www.sauranium.com;

    location / {
        proxy_pass http://app_blue;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/sauranium.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

# PART 7: DEPLOY NEW VERSION TO GREEN

You **never touch Blue**.

```bash
cd /var/www/web-green
git pull origin main
npm install
npm run build
pm2 reload next-web-green
```

Test GREEN locally:

```bash
curl http://localhost:3002
```

Only continue if it works.

---

# PART 8: SWITCH TRAFFIC (ZERO DOWNTIME)

Edit Nginx config:

```bash
sudo nano /etc/nginx/sites-available/sauranium.com
```

Change ONE line:

```nginx
proxy_pass http://app_green;
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Traffic switches **instantly**.

No downtime.

---

# PART 9: ROLLBACK IN ONE COMMAND

If anything goes wrong:

```bash
sudo nano /etc/nginx/sites-available/sauranium.com
```

Change back:

```nginx
proxy_pass http://app_blue;
```

Reload:

```bash
sudo systemctl reload nginx
```

Rollback completed.

No rebuild.
No PM2 restart.
No downtime.

---

# PART 10: PROMOTE GREEN → BLUE (CLEANUP)

After confirming Green is stable:

```bash
cd /var/www/web-blue
git pull origin main
npm install
npm run build
pm2 reload next-web-blue
```

Now both are identical.

---

# PART 11: OPTIONAL CI/CD AUTOMATION (ADVANCED)

* CI deploys to **Green only**
* Manual or approved step switches Nginx
* Safe for large teams

I can share this if you want.

---

# COMMON MISTAKES TO AVOID

* Deploying directly to Blue
* Using same port for both apps
* Restarting Nginx instead of reload
* Forgetting local Green testing
* Removing Blue too early

---

# FINAL RESULT

You now have:

* True zero-downtime production deploys
* Instant rollback
* No user impact
* Industry-grade release strategy