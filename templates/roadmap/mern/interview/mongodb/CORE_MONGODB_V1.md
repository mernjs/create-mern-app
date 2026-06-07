# MONGODB MASTERY ROADMAP

| Phase | Topic                              | Importance |
| ----- | ---------------------------------- | ---------- |
| 1     | MongoDB Fundamentals               | Foundation |
| 2     | BSON & Document Model              | Foundation |
| 3     | Data Modeling                      | Critical   |
| 4     | CRUD Operations                    | Foundation |
| 5     | Indexing Deep Dive                 | Critical   |
| 6     | Query Execution & Query Planner    | Critical   |
| 7     | Aggregation Framework              | Critical   |
| 8     | Relationships & Schema Design      | Critical   |
| 9     | Transactions                       | Critical   |
| 10    | Replication                        | Critical   |
| 11    | Sharding                           | Critical   |
| 12    | Performance Optimization           | Critical   |
| 13    | Concurrency & Locking              | Advanced   |
| 14    | Memory Management                  | Advanced   |
| 15    | Security                           | Critical   |
| 16    | Backup & Recovery                  | Critical   |
| 17    | Monitoring & Observability         | Critical   |
| 18    | MongoDB Internals                  | Senior     |
| 19    | Atlas & Cloud Architecture         | Senior     |
| 20    | Architect-Level Design Discussions | Architect  |

---

# Phase 1: MongoDB Fundamentals

## Question 1

### What is MongoDB?

#### Follow-Ups

* Is MongoDB SQL or NoSQL?
* Why was MongoDB created?
* What problems does MongoDB solve?
* Why use MongoDB instead of MySQL?
* When should MongoDB not be used?

---

## Question 2

### Explain MongoDB Architecture.

#### Follow-Ups

* Database?
* Collection?
* Document?
* BSON?
* Storage Engine?

---

## Question 3

### Why is MongoDB called a Document Database?

#### Follow-Ups

* Difference from relational databases?
* Advantages?
* Trade-offs?

---

# Phase 2: BSON & Document Model

## Question 1

### What is BSON?

#### Follow-Ups

* Difference between JSON and BSON?
* Why BSON instead of JSON?
* Supported BSON types?

---

## Question 2

### What is ObjectId?

#### Follow-Ups

* Structure of ObjectId?
* Why is it unique?
* Can ObjectId reveal creation time?

---

## Question 3

### How are MongoDB documents stored internally?

#### Follow-Ups

* BSON serialization?
* Disk storage?
* WiredTiger storage engine?

---

# Phase 3: Data Modeling

## Question 1

### Embedded vs Referenced Documents

#### Follow-Ups

* When to embed?
* When to reference?
* Performance implications?

---

## Question 2

### How would you model:

```text
User
Posts
Comments
Likes
```

#### Follow-Ups

* Embed comments?
* Reference comments?
* Scalability concerns?

---

## Question 3

### How do you design schemas for high-scale applications?

#### Follow-Ups

* Read-heavy workloads?
* Write-heavy workloads?
* Hot documents?

---

# Phase 4: CRUD Operations

## Question 1

### Difference between:

```javascript
insertOne()
insertMany()
```

#### Follow-Ups

* Ordered vs unordered inserts?
* Bulk writes?

---

## Question 2

### Difference between:

```javascript
updateOne()
updateMany()
replaceOne()
```

#### Follow-Ups

* Atomicity?
* Performance?

---

## Question 3

### What is upsert?

#### Follow-Ups

* Real-world use cases?
* Risks?

---

# Phase 5: Indexing Deep Dive (Most Important)

## Question 1

### What is an Index?

#### Follow-Ups

* Why do indexes improve performance?
* Why are indexes expensive?

---

## Question 2

### Explain B-Tree Indexes.

#### Follow-Ups

* Why B-Tree?
* Lookup complexity?
* Range queries?

---

## Question 3

### Types of Indexes

#### Follow-Ups

```text
Single Field
Compound
Multikey
Text
TTL
Hashed
Wildcard
Geospatial
```

Explain each.

---

## Question 4

### Compound Index

```javascript
{ name: 1, age: 1 }
```

#### Follow-Ups

* Prefix Rule?
* Index order importance?
* Query optimization?

---

## Question 5

### What is a Covered Query?

#### Follow-Ups

* Why faster?
* How to identify?

---

## Question 6

### Why can too many indexes hurt performance?

#### Follow-Ups

* Write amplification?
* Memory consumption?
* Storage overhead?

---

# Phase 6: Query Execution & Query Planner

## Question 1

### How does MongoDB execute a query?

#### Follow-Ups

* Query planner?
* Index selection?
* Collection scan?

---

## Question 2

### Explain:

```javascript
explain()
```

#### Follow-Ups

```text
COLLSCAN
IXSCAN
FETCH
SORT
```

Explain each.

---

## Question 3

### What is query optimization?

#### Follow-Ups

* Query planner?
* Winning plan?
* Rejected plans?

---

# Phase 7: Aggregation Framework

## Question 1

### What is Aggregation?

#### Follow-Ups

* Why use aggregation instead of application code?
* Performance benefits?

---

## Question 2

### Explain Aggregation Pipeline.

#### Follow-Ups

```text
$match
$project
$group
$sort
$limit
$lookup
$facet
$unwind
```

---

## Question 3

### Difference between:

```javascript
find()
```

and

```javascript
aggregate()
```

#### Follow-Ups

* Performance?
* Use cases?

---

## Question 4

### What is $lookup?

#### Follow-Ups

* MongoDB join?
* Performance concerns?
* Alternatives?

---

# Phase 8: Relationships & Schema Design

## Question 1

### How does MongoDB handle relationships?

#### Follow-Ups

* One-to-One
* One-to-Many
* Many-to-Many

---

## Question 2

### MongoDB vs SQL relationships

#### Follow-Ups

* JOIN vs $lookup?
* Performance differences?

---

# Phase 9: Transactions

## Question 1

### What are MongoDB Transactions?

#### Follow-Ups

* Why introduced?
* Multi-document transactions?

---

## Question 2

### Are MongoDB operations atomic?

#### Follow-Ups

* Single document?
* Multiple documents?

---

## Question 3

### When should transactions be avoided?

#### Follow-Ups

* Performance overhead?
* Locking implications?

---

# Phase 10: Replication

## Question 1

### What is Replica Set?

#### Follow-Ups

```text
Primary
Secondary
Arbiter
```

Explain each.

---

## Question 2

### What happens when Primary fails?

#### Follow-Ups

* Election process?
* Failover time?

---

## Question 3

### Read Preference

#### Follow-Ups

```text
Primary
Primary Preferred
Secondary
Secondary Preferred
Nearest
```

---

# Phase 11: Sharding

## Question 1

### What is Sharding?

#### Follow-Ups

* Why needed?
* Horizontal scaling?

---

## Question 2

### Explain Shard Key.

#### Follow-Ups

* Good shard key?
* Bad shard key?
* Hot shard problem?

---

## Question 3

### Components of Sharded Cluster

#### Follow-Ups

```text
Shard
Config Server
mongos
```

---

## Question 4

### Hashed vs Range Sharding

#### Follow-Ups

* Use cases?
* Performance?

---

# Phase 12: Performance Optimization

## Question 1

### How would you optimize a slow MongoDB query?

#### Follow-Ups

```text
Indexes
Explain Plan
Projection
Aggregation Optimization
```

---

## Question 2

### Why is query slow despite index?

#### Follow-Ups

* Low selectivity?
* Wrong index order?
* Sort stage?

---

## Question 3

### How would you optimize a collection with 100M documents?

#### Follow-Ups

* Index strategy?
* Sharding?
* Archival strategy?

---

# Phase 13: Concurrency & Locking

## Question 1

### How does MongoDB handle concurrency?

#### Follow-Ups

* Document-level locking?
* Collection locking?
* WiredTiger?

---

## Question 2

### What happens during concurrent updates?

#### Follow-Ups

* Write conflicts?
* Optimistic concurrency?

---

# Phase 14: Memory Management

## Question 1

### What is Working Set?

#### Follow-Ups

* RAM usage?
* Cache efficiency?

---

## Question 2

### WiredTiger Cache

#### Follow-Ups

* Default size?
* Performance impact?

---

# Phase 15: Security

## Question 1

### MongoDB Security Best Practices

#### Follow-Ups

```text
Authentication
Authorization
TLS
Encryption
Network Isolation
```

---

## Question 2

### Role-Based Access Control

#### Follow-Ups

* Built-in roles?
* Custom roles?

---

# Phase 16: Backup & Recovery

## Question 1

### MongoDB Backup Strategies

#### Follow-Ups

```text
mongodump
mongorestore
Snapshots
Atlas Backups
```

---

## Question 2

### Point-in-Time Recovery

#### Follow-Ups

* Oplog?
* Recovery process?

---

# Phase 17: Monitoring

## Question 1

### How do you monitor MongoDB?

#### Follow-Ups

```text
Slow Queries
CPU
Memory
Disk I/O
Replication Lag
```

---

## Question 2

### Key Metrics

#### Follow-Ups

* Opcounters?
* Connections?
* Cache Hit Ratio?

---

# Phase 18: MongoDB Internals

## Question 1

### Explain WiredTiger Storage Engine.

#### Follow-Ups

* Compression?
* Cache?
* Checkpoints?

---

## Question 2

### How does MongoDB store data on disk?

#### Follow-Ups

* Pages?
* B-Trees?
* Journaling?

---

## Question 3

### What is Journaling?

#### Follow-Ups

* Durability?
* Crash recovery?

---

# Phase 19: Atlas & Cloud

## Question 1

### What is MongoDB Atlas?

#### Follow-Ups

* Managed service?
* Auto-scaling?
* Backup features?

---

## Question 2

### Atlas Search

#### Follow-Ups

* Elasticsearch alternative?
* Full-text search?

---

# Phase 20: Architect-Level Design Discussions

### How would you design:

#### E-commerce Database

Follow-Ups

* Products?
* Orders?
* Inventory?

---

#### Social Media Database

Follow-Ups

* Posts?
* Comments?
* Likes?
* Feeds?

---

#### Chat Application

Follow-Ups

* Messages?
* Read receipts?
* Sharding strategy?

---

#### Multi-Tenant SaaS Database

Follow-Ups

* Shared DB?
* Shared Collection?
* Dedicated DB?

---

# Most Important MongoDB Topics for 5+ Years Interviews

```text
Data Modeling
Embedding vs Referencing
ObjectId
Indexes
Compound Indexes
Covered Queries
Explain Plans
Aggregation Framework
$lookup
Transactions
Replica Sets
Read Preferences
Sharding
Shard Keys
Performance Optimization
WiredTiger
Concurrency
Memory Management
Security
Backup & Recovery
Production Scaling
```

These topics represent the core MongoDB knowledge expected from a Senior MERN Developer, Backend Engineer, Technical Lead, or Solution Architect. The areas that interviewers probe most deeply are **data modeling, indexing, aggregation, replication, sharding, and performance tuning**, because those directly affect real-world scalability and reliability.
