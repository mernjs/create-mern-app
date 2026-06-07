# **Node.js + Express – Step by Step Setup**

**Step 1: Install Node.js**

* Download Node.js from [nodejs.org](https://nodejs.org) (LTS recommended)
* Or use a version manager like `nvm`:

```bash
nvm install node
nvm use node
```

**Step 2: Verify Installation**

```bash
node -v
npm -v
```

**Step 3:** Create project folder

```bash
mkdir node-auth-api
```

**Step 4:** Move into folder

```bash
cd node-auth-api
```

**Step 5:** Initialize Node project

```bash
npm init -y
```

**Step 6:** Install dependencies

```bash
npm install 
```

**Step 7:** Run server

```bash
node app.js
```

**Step 8:** Test APIs via Postman or curl:

* `POST /signup`
* `POST /login`
* `GET /profile` 