## Recomendation System

### 1. What is a recommendation system?

**Answer:**
A recommendation system suggests items to users based on their behavior, preferences, or similarities with other users.

**Practical explanation:**
Instead of showing the same content to everyone, it personalizes results to increase engagement, clicks, or sales.

**Real-world example:**
Movie suggestions on **Netflix** or video recommendations on **YouTube**.

---

### 2. What are the main types of recommendation systems?

**Answer:**
There are three main types: collaborative filtering, content-based filtering, and hybrid systems.

**Practical explanation:**

* **Collaborative filtering:** Uses behavior of similar users.
* **Content-based:** Uses item features and user preferences.
* **Hybrid:** Combines both to reduce weaknesses.

---

### 3. How does collaborative filtering work?

**Answer:**
It recommends items by finding users with similar behavior and suggesting what they liked.

**Practical explanation:**
If User A and User B liked similar movies, and User A watched a new movie, recommend it to User B.

**Trade-offs:**

* Needs a lot of user interaction data
* Struggles with new users (cold start)

---

### 4. What is the cold start problem?

**Answer:**
Cold start happens when there is not enough data for new users or new items.

**Practical explanation:**

* New user → no interaction history
* New item → no ratings or clicks

**Common solutions:**

* Ask users for preferences at signup
* Use content-based recommendations initially
* Use popularity-based fallback

---

### 5. How does content-based recommendation work?

**Answer:**
It recommends items similar to what a user liked before.

**Practical explanation:**
If a user watches many action movies, recommend other action movies with similar metadata.

**Trade-offs:**

* Does not explore new content well
* Can over-personalize (filter bubble)

---

### 6. When would you choose collaborative vs content-based?

**Answer:**
Choose based on data availability and product needs.

**Practical explanation:**

* Use **collaborative** when you have rich user interaction data
* Use **content-based** when item metadata is strong or user data is sparse

In production, most systems move to hybrid.

---

### 7. What is a hybrid recommendation system?

**Answer:**
A hybrid system combines multiple recommendation approaches.

**Practical explanation:**
You may use content-based for new users and collaborative filtering for active users.

**Why it’s used:**

* Reduces cold start
* Improves recommendation quality
* More robust in real-world data

---

### 8. How do you evaluate a recommendation system?

**Answer:**
Use offline metrics and online experiments.

**Practical explanation:**

* **Offline:** Precision@K, Recall@K, MAP
* **Online:** A/B testing, CTR, watch time, conversion

**Important point:**
Offline accuracy does not always mean better business impact.

---

### 9. How would you handle scale in a recommendation system?

**Answer:**
By separating offline training and online serving.

**Practical explanation:**

* Offline: train models, compute embeddings
* Online: fast lookup using caches or vector databases

**Common tools:**

* Approximate nearest neighbor search
* Precomputed recommendations

---

### 10. What data is commonly used in recommendation systems?

**Answer:**
User behavior and item metadata.

**Examples:**

* Clicks, views, purchases
* Ratings, likes, watch time
* Item categories, tags, descriptions

---

### 11. What are common challenges in production?

**Answer:**
Data quality, latency, and feedback loops.

**Practical explanation:**

* Biased data → biased recommendations
* Slow inference → bad user experience
* Showing same content → no exploration

**Mitigation strategies:**

* Add exploration (epsilon-greedy)
* Regular retraining
* Diversity constraints

---

### 12. How do recommendation systems differ from search?

**Answer:**
Search is intent-driven, recommendations are discovery-driven.

**Practical explanation:**

* Search: user knows what they want
* Recommendation: system decides what to show

In real products, both are often combined.

---

### 13. How would you design a recommendation system from scratch?

**Answer:**
I would start simple and iterate.

**Practical explanation (interview-friendly flow):**

1. Define business goal (CTR, watch time, revenue)
2. Start with popularity-based recommendations
3. Add personalization (collaborative or content-based)
4. Add ranking layer
5. Add evaluation + monitoring

**Why interviewers like this:**
It shows system thinking, not just ML knowledge.

---

### 14. What is matrix factorization?

**Answer:**
Matrix factorization breaks user-item interactions into latent features.

**Practical explanation:**
Instead of storing a huge user × item matrix, we learn:

* User embeddings
* Item embeddings

The dot product predicts preference.

**Why it’s used:**

* Scales well
* Works better than raw similarity

Used heavily in systems like **Netflix**.

---

### 15. How do deep learning models fit into recommendation systems?

**Answer:**
They help model complex user behavior and context.

**Practical explanation:**
Deep models can use:

* User history
* Time
* Device
* Location
* Item embeddings

**Common use cases:**

* Feed ranking
* Video recommendations
* Ads personalization

Example: **YouTube** feed ranking.

---

### 16. What is a two-stage recommendation system?

**Answer:**
Candidate generation + ranking.

**Practical explanation:**

* **Stage 1:** Generate 100–1000 relevant items (fast, approximate)
* **Stage 2:** Rank top items using heavier ML model

**Why it’s important:**
You can’t rank millions of items in real time.

---

### 17. What is candidate generation?

**Answer:**
It narrows down the item space.

**Practical explanation:**

* Collaborative filtering
* Similar item embeddings
* User embedding nearest neighbors

This step optimizes for **recall**, not precision.

---

### 18. What is ranking in recommendation systems?

**Answer:**
Ranking orders candidates by predicted relevance.

**Practical explanation:**
Ranking model predicts:

* Click probability
* Watch time
* Purchase likelihood

This step optimizes for **precision and business metrics**.

---

### 19. How do you avoid showing repetitive recommendations?

**Answer:**
Add diversity and exploration.

**Practical explanation:**

* Penalize similar items
* Add exploration probability
* Mix long-tail content

**Why it matters:**
Improves long-term engagement and avoids filter bubbles.

---

### 20. What is the exploration vs exploitation trade-off?

**Answer:**
Balancing known good items vs trying new ones.

**Practical explanation:**

* Exploitation → maximize immediate CTR
* Exploration → learn user preferences

**Common strategies:**

* Epsilon-greedy
* Thompson sampling

Used heavily in **Amazon**-style systems.

---

### 21. How do you handle real-time recommendations?

**Answer:**
By combining precomputation and fast inference.

**Practical explanation:**

* Offline: compute embeddings & features
* Online: fetch embeddings + lightweight model
* Cache popular results

Latency target is usually **< 50 ms**.

---

### 22. How do you retrain recommendation models?

**Answer:**
On a fixed schedule or event-driven.

**Practical explanation:**

* Daily or weekly retraining
* Trigger retraining on data drift
* Warm-start models using previous weights

Avoid full retraining too often — it’s expensive.

---

### 23. What is feedback loop bias?

**Answer:**
Model learns only from what it already shows.

**Practical explanation:**
If you only recommend popular items, you only collect data on popular items.

**Mitigation:**

* Random exploration
* Diversity constraints
* Offline counterfactual evaluation

---

### 24. What features are commonly used?

**Answer:**
User, item, and context features.

**Examples:**

* User: age bucket, activity level
* Item: category, embeddings, popularity
* Context: time, device, location

Interview tip: Always mention **feature freshness**.

---

### 25. How do you monitor a recommendation system in production?

**Answer:**
By tracking both ML and business metrics.

**Practical explanation:**

* CTR, conversion, revenue
* Latency and errors
* Distribution drift
* Popularity bias

Monitoring matters more than model choice.

---

### 26. What would you do if CTR drops suddenly?

**Answer:**
Check data, then model, then serving.

**Debug order:**

1. Data pipeline issues
2. Feature freshness
3. Model deployment changes
4. Traffic or UI changes

This question tests **production debugging mindset**.

---

### 27. Can recommendation systems be rule-based?

**Answer:**
Yes, especially early on.

**Practical explanation:**
Rules work well when:

* Low traffic
* No historical data
* Clear business logic

Most real systems mix **rules + ML**.

---

### 28. How do you explain recommendation systems to non-ML stakeholders?

**Answer:**
Focus on outcomes, not algorithms.

**Practical explanation:**
“Its goal is to show the most relevant items to each user to increase engagement.”

Interviewers like engineers who can communicate clearly.