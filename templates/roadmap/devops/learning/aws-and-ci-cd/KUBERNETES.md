# KUBERNETES FROM SCRATCH

## Next.js / Node.js → Docker → AWS EKS → Kubernetes

---

# PART 0: WHAT YOU NEED BEFORE STARTING

You must have:

1. An AWS account
2. A laptop or EC2 with Linux or macOS
3. A GitHub repository with your Next.js app
4. Basic Docker knowledge (we will still cover Docker fully)

We will use:

* AWS EKS (managed Kubernetes)
* Docker
* kubectl
* eksctl
* Amazon ECR (container registry)

---

# PART 1: UNDERSTAND THE BIG PICTURE (VERY IMPORTANT)

Before typing commands, understand this flow clearly:

1. You write code
2. Code is turned into a Docker image
3. Docker image is pushed to a registry
4. Kubernetes pulls that image
5. Kubernetes runs multiple copies (pods)
6. Kubernetes exposes the app to users
7. Kubernetes handles restart, scaling, rollout, rollback

Kubernetes replaces:

* PM2
* Manual EC2 deploy scripts
* Manual scaling

---

# PART 2: INSTALL BASIC TOOLS (ONE TIME)

These tools are required to talk to AWS and Kubernetes.

---

## STEP 2.1: Install AWS CLI

On your machine or Jenkins server:

```bash
sudo apt update
sudo apt install -y awscli
```

Verify:

```bash
aws --version
```

---

## STEP 2.2: Configure AWS CLI

```bash
aws configure
```

Enter:

* AWS Access Key ID
* AWS Secret Access Key
* Region (example: ap-south-1)
* Output format: json

This allows your machine to control AWS.

---

## STEP 2.3: Install kubectl (Kubernetes CLI)

```bash
curl -LO https://dl.k8s.io/release/v1.29.0/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

Verify:

```bash
kubectl version --client
```

---

## STEP 2.4: Install eksctl (EKS helper tool)

```bash
curl -sL https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz | tar xz
sudo mv eksctl /usr/local/bin/
```

Verify:

```bash
eksctl version
```

---

# PART 3: CREATE KUBERNETES CLUSTER (EKS)

This creates real servers behind the scenes.

---

## STEP 3.1: Create EKS cluster

```bash
eksctl create cluster \
--name nextjs-cluster \
--region ap-south-1 \
--nodegroup-name worker-nodes \
--node-type t3.medium \
--nodes 2 \
--nodes-min 2 \
--nodes-max 4
```

What this does:

* Creates Kubernetes control plane
* Creates EC2 worker nodes
* Connects everything automatically

Wait 10–15 minutes.

---

## STEP 3.2: Verify cluster

```bash
kubectl get nodes
```

If you see nodes with `Ready` status, cluster is live.

---

# PART 4: PREPARE YOUR APPLICATION (DOCKER)

Kubernetes runs **containers**, not raw code.

---

## STEP 4.1: Go to your project folder

```bash
cd your-nextjs-project
```

---

## STEP 4.2: Create Dockerfile

```bash
nano Dockerfile
```

Paste **FULL FILE**:

```Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## STEP 4.3: Create .dockerignore

```bash
nano .dockerignore
```

Paste:

```text
node_modules
.next
.git
.env
.env.production
```

---

## STEP 4.4: Test Docker locally

```bash
docker build -t next-web .
docker run -d -p 3000:3000 next-web
```

Test:

```bash
curl http://localhost:3000
```

If it works, stop container:

```bash
docker ps
docker stop <container_id>
```

---

# PART 5: CREATE CONTAINER REGISTRY (ECR)

Kubernetes pulls images from a registry.

---

## STEP 5.1: Create ECR repository

```bash
aws ecr create-repository --repository-name next-web
```

Copy the repository URI.

---

## STEP 5.2: Login Docker to ECR

```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS --password-stdin <ECR_URI>
```

---

## STEP 5.3: Build and push image

```bash
docker build -t next-web:1.0 .
docker tag next-web:1.0 <ECR_URI>:1.0
docker push <ECR_URI>:1.0
```

---

# PART 6: DEPLOY APPLICATION TO KUBERNETES

Now we create Kubernetes objects.

---

## STEP 6.1: Create Deployment

```bash
nano deployment.yaml
```

Paste:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: next-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: next-web
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: next-web
    spec:
      containers:
        - name: next-web
          image: <ECR_URI>:1.0
          ports:
            - containerPort: 3000
```

Apply:

```bash
kubectl apply -f deployment.yaml
```

Verify:

```bash
kubectl get pods
```

---

## STEP 6.2: Create Service (Public Access)

```bash
nano service.yaml
```

Paste:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: next-web-service
spec:
  type: LoadBalancer
  selector:
    app: next-web
  ports:
    - port: 80
      targetPort: 3000
```

Apply:

```bash
kubectl apply -f service.yaml
```

Check:

```bash
kubectl get svc
```

Copy EXTERNAL-IP and open in browser.

Your app is now LIVE.

---

# PART 7: ZERO-DOWNTIME DEPLOYMENTS

---

## STEP 7.1: Build new version

```bash
docker build -t next-web:1.1 .
docker tag next-web:1.1 <ECR_URI>:1.1
docker push <ECR_URI>:1.1
```

---

## STEP 7.2: Update deployment

```bash
kubectl set image deployment/next-web next-web=<ECR_URI>:1.1
```

Kubernetes will:

* Start new pod
* Wait until ready
* Stop old pod
* No downtime

---

# PART 8: ROLLBACK IN ONE COMMAND

If something breaks:

```bash
kubectl rollout undo deployment/next-web
```

That’s it.

---

# PART 9: SCALING APPLICATION

Manual scale:

```bash
kubectl scale deployment next-web --replicas=5
```

Check:

```bash
kubectl get pods
```

---

# PART 10: CLEANUP (IMPORTANT TO SAVE COST)

When done testing:

```bash
eksctl delete cluster --name nextjs-cluster --region ap-south-1
```

---

# FINAL RESULT

You now have:

* Kubernetes cluster from scratch
* Dockerized Next.js app
* Load-balanced public access
* Zero-downtime rolling updates
* One-command rollback
* Horizontal scaling
* Production-grade architecture