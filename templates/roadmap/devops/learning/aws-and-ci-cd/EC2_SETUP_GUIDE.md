# EC2 COMPLETE STEP-BY-STEP GUIDE

## EC2 + NGINX SETUP

---

## PART 1: CREATE EC2 INSTANCE

### Step 1: Launch EC2

1. Login to AWS Console
2. Go to **EC2 → Launch Instance**
3. Configure:

   * Name: `my-server`
   * AMI: **Ubuntu 22.04 LTS**
   * Instance Type: **t2.micro** or **t3.micro**
   * Key Pair: Create new key → download `.pem`
   * Network: Default VPC
   * Auto-assign Public IP: **Enabled**

---

### Step 2: Configure Security Group

Add these **Inbound Rules**:

| Type  | Port | Source                           |
| ----- | ---- | -------------------------------- |
| SSH   | 22   | Your IP (or 0.0.0.0/0 temporary) |
| HTTP  | 80   | 0.0.0.0/0                        |
| HTTPS | 443  | 0.0.0.0/0                        |

Save and **Launch Instance**.

---

## PART 2: CONNECT TO EC2

### Step 3: SSH into EC2

On your local machine:

```bash
chmod 400 ub24ec2.pem
ssh -i ub24ec2.pem ubuntu@<EC2_PUBLIC_IP>
```

If login is successful, EC2 is ready.

---

## PART 3: BASIC SERVER SETUP

### Step 4: Update server

```bash
sudo apt update
sudo apt upgrade -y
```

---

### Step 5: Install Git

```bash
sudo apt install -y git
git --version
```

---

## PART 4: INSTALL NGINX

### Step 6: Install Nginx

```bash
sudo apt install -y nginx
```

---

### Step 7: Start and verify Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

Status must be **active (running)**.

---

### Step 8: Test Nginx in browser

Open in browser:

```
http://<EC2_PUBLIC_IP>
```

If you see the **Nginx welcome page**, everything is correct.

---

## PART 5: NGINX CONFIGURATION (IMPORTANT)

### Step 9: Understand Nginx folders

* `/etc/nginx/sites-available/` → config files
* `/etc/nginx/sites-enabled/` → active configs

---

### Step 10: Create Nginx config for app

Example app runs on **port 3000**.

```bash
sudo nano /etc/nginx/sites-available/app
```

Paste this:

```nginx
server {
    listen 80;
    server_name _;

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

Save and exit.

---

### Step 11: Enable Nginx config

```bash
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

If `nginx -t` is successful, config is correct.

---

## PART 6: DOMAIN SETUP (OPTIONAL)

### Step 12: Point domain to EC2

In GoDaddy DNS:

| Type | Host | Value         |
| ---- | ---- | ------------- |
| A    | @    | EC2_PUBLIC_IP |
| A    | www  | EC2_PUBLIC_IP |

Wait 5–10 minutes.

---

### Step 13: Update Nginx for domain

Edit config:

```bash
sudo nano /etc/nginx/sites-available/app
```

Change:

```nginx
server_name yourdomain.com www.yourdomain.com;
```

Reload:

```bash
sudo systemctl reload nginx
```

---

## PART 7: HTTPS (SSL)

### Step 14: Install Certbot

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
```

---

### Step 15: Enable SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Step 16: Auto-renew SSL

```bash
sudo certbot renew --dry-run
```

---

## PART 8: IMPORTANT CHECK COMMANDS

```bash
sudo systemctl status nginx
sudo nginx -t
sudo ss -tulnp
sudo tail -f /var/log/nginx/error.log
```

---

## PART 9: BEST PRACTICES

* Do not expose app ports (3000, 3001) publicly
* Use Nginx for all traffic
* One app = one port
* One domain/subdomain = one Nginx config
* Always use HTTPS
* Keep `.env` files private

---

## FINAL RESULT

After following this guide:

* EC2 is public and secure
* Nginx is working correctly
* Domain/subdomains are supported
* Ready for Node.js and Next.js apps