# ZERO-DOWNTIME DEPLOYMENT

## + ROLLBACK IN ONE COMMAND

---

## CORE IDEA (VERY IMPORTANT)

We will achieve **zero downtime** by:

1. **Building the app first**
2. **Restarting the app gracefully**
3. **Never stopping the running process**
4. **Keeping the previous build available for rollback**

PM2 makes this possible.

---

# PART 1: WHAT “ZERO-DOWNTIME” MEANS HERE

* Users never see a blank page
* No “connection refused”
* No Nginx restart needed
* Requests keep flowing while app reloads

We achieve this using:

* `pm2 reload` (not restart)
* One running process always alive

---

# PART 2: REQUIRED PM2 SETUP (ONE TIME)

## Step 1: Use a fixed PM2 app name

Production app name (example):

```
next-web-prod
```

Staging app name:

```
next-web-staging
```

Never change these names.

---

## Step 2: Ensure app starts via `npm start`

Your `package.json` **must** have:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

PM2 reload only works correctly with a stable start command.

---

# PART 3: ZERO-DOWNTIME DEPLOY SCRIPT (PRODUCTION)

This **replaces your current deploy.sh** for production.

## Step 3.1: Update deploy.sh

```bash
nano /var/www/web-prod/deploy.sh
```

Paste **FULL FILE**:

```bash
#!/usr/bin/env bash
set -e

echo "Starting zero-downtime deployment..."

# Load NVM
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /var/www/web-prod

# Save current commit (for rollback)
CURRENT_COMMIT=$(git rev-parse HEAD)
echo $CURRENT_COMMIT > .last_successful_commit

# Pull new code
git pull origin main

# Install & build
npm install
npm run build

# Zero-downtime reload
pm2 reload next-web-prod || pm2 start npm --name "next-web-prod" -- start

pm2 save

echo "Deployment completed successfully"
```

Make executable:

```bash
chmod +x /var/www/web-prod/deploy.sh
```

---

## Step 3.2: Why this is zero-downtime

* `pm2 reload` keeps old process alive
* New process starts first
* Traffic switches automatically
* No request drop

---

# PART 4: UPDATE CI/CD (NO CHANGE NEEDED)

Your GitHub Actions already runs:

```bash
bash -lc 'cd /var/www/web-prod && ./deploy.sh'
```

Since deploy.sh is updated, **CI/CD is now zero-downtime automatically**.

---

# PART 5: ROLLBACK IN ONE COMMAND (CRITICAL)

Rollback means:

* Go back to **last working commit**
* Rebuild
* Reload without downtime

---

## Step 5.1: Rollback script (ONE TIME)

Create rollback script:

```bash
nano /var/www/web-prod/rollback.sh
```

Paste:

```bash
#!/usr/bin/env bash
set -e

echo "Starting rollback..."

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 24

cd /var/www/web-prod

LAST_COMMIT=$(cat .last_successful_commit)

echo "Rolling back to commit: $LAST_COMMIT"

git reset --hard $LAST_COMMIT

npm install
npm run build

pm2 reload next-web-prod
pm2 save

echo "Rollback completed successfully"
```

Make executable:

```bash
chmod +x /var/www/web-prod/rollback.sh
```

---

## Step 5.2: Rollback in ONE command

Whenever production breaks:

```bash
cd /var/www/web-prod
./rollback.sh
```

That’s it.

No CI/CD.
No GitHub.
No downtime.

---

# PART 6: OPTIONAL – STAGING SAFETY RULE (RECOMMENDED)

Never deploy to production directly.

Correct flow:

```bash
feature → staging → production
```

Commands:

```bash
git checkout staging
git push origin staging     # test here first

git checkout main
git merge staging
git push origin main        # production deploy
```

---

# PART 7: QUICK HEALTH CHECK COMMANDS

```bash
pm2 status
pm2 logs next-web-prod --lines 50
curl http://localhost:3000
```

---

# COMMON MISTAKES (PLEASE AVOID)

* Using `pm2 restart` instead of `reload`
* Not saving last commit
* Editing production directly
* Restarting Nginx unnecessarily
* Skipping staging verification

---

# FINAL RESULT

You now have:

* Zero-downtime deployments
* Safe production reloads
* Rollback in ONE command
* CI/CD + manual safety net
* Industry-standard setup