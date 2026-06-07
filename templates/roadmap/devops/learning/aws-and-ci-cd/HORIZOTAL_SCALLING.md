# MULTI-EC2 SCALING WITH LOAD BALANCER

## High Availability + Horizontal Scaling (Production Grade)

---

## WHAT PROBLEM THIS SOLVES

With **one EC2**:

* If EC2 goes down → site goes down
* Limited traffic handling
* No true high availability

With **multiple EC2 + Load Balancer**:

* Traffic distributed automatically
* One EC2 can fail without downtime
* Easy scaling (add/remove servers)
* Industry-standard architecture

---

## FINAL ARCHITECTURE (IMPORTANT TO UNDERSTAND)

```
Users
  ↓
Application Load Balancer (ALB)
  ↓
EC2 #1 (Nginx → Next.js)
EC2 #2 (Nginx → Next.js)
EC2 #3 (optional)
```

* All EC2s run the **same app**
* ALB decides where traffic goes
* Users never see EC2 IPs

---

## CORE COMPONENTS WE WILL USE

* Application Load Balancer (ALB)
* Target Group
* Multiple EC2 instances
* Same Nginx + PM2 setup on each EC2
* Same CI/CD pipeline

Provider: **Amazon Web Services**

---

# STEP 1: PREPARE MULTIPLE EC2 INSTANCES

### Minimum setup

* 2 EC2 instances (recommended minimum)
* Same AMI (Ubuntu)
* Same Node/NVM/PM2/Nginx setup
* Same app code

Example:

* EC2-1 → 10.0.1.10
* EC2-2 → 10.0.2.10

Both must:

* Serve app on `http://localhost:3000`
* Nginx proxy → port 3000
* Respond on port 80

Test on each EC2:

```bash
curl http://localhost:3000
curl http://localhost
```

---

# STEP 2: CREATE TARGET GROUP

1. AWS Console → EC2 → Target Groups
2. Create target group:

   * Target type: **Instance**
   * Protocol: **HTTP**
   * Port: **80**
   * VPC: Same as EC2
   * Health check path: `/`

Save target group.

---

## STEP 2.1: REGISTER EC2 INSTANCES

* Add EC2-1 and EC2-2 to the target group
* Port: 80

Health status must become:

```
healthy
```

Do not continue until both are healthy.

---

# STEP 3: CREATE APPLICATION LOAD BALANCER (ALB)

1. EC2 → Load Balancers → Create Load Balancer
2. Choose **Application Load Balancer**
3. Settings:

   * Scheme: Internet-facing
   * IP type: IPv4
   * VPC: Same as EC2
   * Subnets: At least 2 AZs

---

## STEP 3.1: SECURITY GROUP FOR ALB

Inbound rules:

| Port | Source    |
| ---- | --------- |
| 80   | 0.0.0.0/0 |
| 443  | 0.0.0.0/0 |

Outbound:

* Allow all

---

## STEP 3.2: LISTENER CONFIGURATION

Listener:

* HTTP : 80
* Forward to target group created earlier

Create Load Balancer.

---

# STEP 4: UPDATE EC2 SECURITY GROUPS

EC2 instances must allow traffic **from ALB only**.

Inbound rules on EC2:

| Port | Source             |
| ---- | ------------------ |
| 80   | ALB Security Group |

Important:

* Remove `0.0.0.0/0` from EC2 if present
* Only ALB should access EC2

---

# STEP 5: TEST LOAD BALANCER

ALB will give a DNS name like:

```
my-alb-123456.ap-south-1.elb.amazonaws.com
```

Test:

```bash
curl http://ALB_DNS_NAME
```

Refresh multiple times.

If EC2 logs show alternating requests → load balancing is working.

---

# STEP 6: POINT DOMAIN TO LOAD BALANCER

In DNS (example: GoDaddy):

Create A record:

* Type: A
* Host: @
* Value: **ALB DNS name**

Or use CNAME:

* Host: www
* Value: ALB DNS name

Result:

```
sauranium.com → ALB → EC2s
```

---

# STEP 7: ENABLE HTTPS ON LOAD BALANCER (RECOMMENDED)

1. Request SSL certificate in ACM:

   * Domain: `sauranium.com`
   * Validation: DNS
2. Attach certificate to ALB
3. Add HTTPS listener (443)
4. Redirect HTTP → HTTPS

Now HTTPS is handled by ALB, not EC2.

---

# STEP 8: CI/CD FOR MULTI-EC2 (IMPORTANT)

### Rule

Every EC2 must deploy the **same code**.

### Options

#### Option A: GitHub Actions → SSH into ALL EC2s

* Loop over EC2 IPs
* Run `deploy.sh` on each

#### Option B (Recommended): AMI + Auto Scaling (Advanced)

* Bake app into AMI
* Scale automatically

For now, simple approach:

```bash
ssh ec2-1 "./deploy.sh"
ssh ec2-2 "./deploy.sh"
```

ALB keeps traffic flowing during deploy.

---

# STEP 9: ZERO-DOWNTIME DEPLOY WITH ALB

Correct order:

1. Deploy on EC2-1
2. Wait for health check OK
3. Deploy on EC2-2
4. No user impact

ALB removes unhealthy instances automatically.

---

# STEP 10: SCALING UP

To scale:

1. Launch new EC2 with same setup
2. Register it in target group
3. Wait until healthy

Traffic distributes automatically.

---

# STEP 11: ROLLBACK STRATEGY

If a new release is broken:

1. Deregister broken EC2 from target group
2. Traffic instantly shifts to healthy EC2s
3. Fix or redeploy safely

No downtime.

---

# COMMON MISTAKES TO AVOID

* Exposing EC2 directly to the internet
* Different Node versions on EC2s
* Different environment variables
* Deploying to all EC2s at once
* Skipping health checks

---

# FINAL RESULT

You now have:

* Horizontal scaling
* High availability
* Zero downtime during EC2 failure
* Load-balanced traffic
* Production-grade infrastructure