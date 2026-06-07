# LLMs Fine-tune

---

## 1. What does fine-tuning an LLM mean?

**Answer**
Fine-tuning means taking a pre-trained language model and training it further on a smaller, task-specific dataset so it behaves the way you want.

**Explanation**
The model already knows language from pretraining.
Fine-tuning teaches it **how to respond**, **what style to use**, or **what domain knowledge to focus on**.

You’re not teaching language from scratch.
You’re adjusting behavior.

---

## 2. When should you fine-tune instead of using prompting?

**Answer**
I fine-tune when prompting alone is not reliable, consistent, or cost-effective.

**Practical breakdown**

* Prompting is good for:

  * Prototyping
  * Low-volume usage
  * Flexible tasks
* Fine-tuning is better when:

  * You need **consistent output format**
  * You want **domain-specific behavior**
  * Prompts are getting long and expensive
  * You want lower latency

**Interview tip**
Say: *“I start with prompting. I fine-tune only when prompts hit their limits.”*

---

## 3. What kinds of fine-tuning are commonly used for LLMs?

**Answer**
The most common types are supervised fine-tuning, instruction fine-tuning, and parameter-efficient fine-tuning.

**Explanation**

* **Supervised fine-tuning (SFT)**
  Input → ideal output pairs
* **Instruction fine-tuning**
  The model learns to follow instructions in natural language
* **PEFT (LoRA, adapters)**
  Only a small part of the model is trained

**Production insight**
Most teams today use **instruction tuning + LoRA** for cost and speed.

---

## 4. What does a fine-tuning dataset look like?

**Answer**
It’s usually a list of prompt–response pairs in a consistent format.

**Example**

```
User: Summarize this ticket
Assistant: The issue is caused by a missing config file.
```

**Key interview point**
Quality matters more than size.
500 clean examples can outperform 50k noisy ones.

---

## 5. How is fine-tuning different from training from scratch?

**Answer**
Training from scratch learns language.
Fine-tuning teaches behavior.

**Why this matters**

* Training from scratch:

  * Massive data
  * Huge cost
  * Rarely done outside big labs
* Fine-tuning:

  * Small datasets
  * Much cheaper
  * Practical for companies

---

## 6. What are common mistakes when fine-tuning LLMs?

**Answer**
The biggest mistakes are bad data and unrealistic expectations.

**Common issues**

* Low-quality or inconsistent labels
* Overfitting to a narrow dataset
* Expecting the model to learn new facts deeply
* Fine-tuning when retrieval would be better

**Strong interview line**
“Fine-tuning shapes behavior, not knowledge at scale.”

---

## 7. How do you evaluate whether fine-tuning worked?

**Answer**
I compare before-and-after outputs on real examples and task-specific metrics.

**Evaluation methods**

* Human review (very common)
* Exact match / format correctness
* Task success rate
* Regression tests on prompts

**Production reality**
Offline metrics help, but **real user traffic** tells the truth.

---

## 8. Fine-tuning vs RAG — how do you choose?

**Answer**
I use fine-tuning for behavior and RAG for knowledge.

**Simple rule**

* **Fine-tune** → tone, format, reasoning style
* **RAG** → dynamic, up-to-date, or large knowledge

**Best practice**
Most production systems combine both.

---

## 9. What is LoRA and why is it popular?

**Answer**
LoRA fine-tunes a small number of extra parameters instead of the whole model.

**Why interviewers like this topic**

* Much cheaper
* Faster training
* Easier to deploy and roll back

**Short explanation**
“You get most of the benefit without touching the full model.”

---

## 10. How do you prevent overfitting during fine-tuning?

**Answer**
By keeping datasets diverse and stopping training early.

**Techniques**

* Validation sets
* Fewer epochs
* Regularization
* Mixing base-style examples

**Real-world insight**
Overfitting shows up as the model sounding robotic or repeating patterns.

---

## 11. Can fine-tuning make a model unsafe?

**Answer**
Yes, if safety constraints aren’t included in the training data.

**Why**
The model learns from examples.
If unsafe behavior appears in data, it can be amplified.

**Production approach**

* Include refusal examples
* Keep safety prompts
* Run safety evaluations after training

---

## 12. How do you explain fine-tuning to a non-ML engineer?

**Answer**
“It’s like taking a smart intern and training them on how *our* company answers questions.”

**Why interviewers like this**
Shows you can communicate clearly across teams.

---

## 13. What actually changes inside the model during fine-tuning?

**Answer**
The model’s weights are slightly adjusted so certain responses become more likely and others less likely.

**Practical explanation**

* Pretraining gives general language ability
* Fine-tuning nudges probabilities:

  * preferred tone
  * preferred structure
  * task-specific reasoning patterns

You’re not rewriting the model — you’re **biasing it**.

---

## 14. Why does instruction fine-tuning work better than task-specific fine-tuning?

**Answer**
Because it teaches the model *how to follow instructions*, not just how to answer one task.

**Explanation**

* Task fine-tuning → brittle, narrow behavior
* Instruction fine-tuning → generalizes better

**Interview phrasing**
“Instruction tuning improves transfer across unseen tasks.”

---

## 15. How much data do you really need to fine-tune an LLM?

**Answer**
Usually hundreds to a few thousand high-quality examples.

**Real numbers interviewers like**

* 200–500 → noticeable behavior change
* 1k–5k → strong consistency
* 10k+ → diminishing returns (for most apps)

**Key insight**
More data doesn’t fix bad data.

---

## 16. What makes a fine-tuning dataset “high quality”?

**Answer**
Consistency, correctness, and realism.

**What interviewers look for**

* Same output format every time
* Answers you’d actually ship to users
* Includes edge cases and refusals
* No contradictions

**Strong line**
“The model becomes the average of its data.”

---

## 17. Why does fine-tuning sometimes make the model worse?

**Answer**
Because the fine-tuning data overrides useful general behavior.

**Common causes**

* Dataset too small or too repetitive
* Narrow domain language
* Removing reasoning diversity
* Training too many epochs

**Production lesson**
Fine-tuning is subtractive as well as additive.

---

## 18. How do you decide between full fine-tuning and LoRA?

**Answer**
I default to LoRA unless I have a strong reason not to.

**Decision table**

* **LoRA**

  * Cheap
  * Fast
  * Easy rollback
  * Most use cases
* **Full fine-tune**

  * Very specific behavior
  * Research or foundation model teams
  * Much higher cost

**Interview insight**
Most companies never do full fine-tuning.

---

## 19. What hyperparameters matter most in LLM fine-tuning?

**Answer**
Learning rate, number of epochs, and batch size.

**Why**

* Learning rate too high → model forgets base knowledge
* Too many epochs → overfitting
* Batch size affects stability

**Practical tip**
Smaller learning rates than normal ML are safer.

---

## 20. How do you debug a bad fine-tuned model?

**Answer**
I compare outputs against the base model and inspect training examples.

**Debug workflow**

1. Run same prompts on base vs fine-tuned
2. Identify what behavior regressed
3. Trace regression to data patterns
4. Fix dataset → re-train

**Strong signal**
Debugging is mostly **data debugging**, not model debugging.

---

## 21. Can fine-tuning replace prompt engineering?

**Answer**
No. They complement each other.

**How teams actually work**

* Prompting defines *what*
* Fine-tuning defines *how consistently*

**Good interview sentence**
“Fine-tuning reduces prompt complexity, not eliminates it.”

---

## 22. How do you version and deploy fine-tuned models safely?

**Answer**
By treating them like regular production artifacts.

**Best practices**

* Model versioning
* Canary rollout
* A/B testing
* Rollback to base model
* Offline eval + online monitoring

**What interviewers want**
You think beyond training.

---

## 23. What metrics do you monitor in production after fine-tuning?

**Answer**
Task success and user-level signals.

**Examples**

* Format correctness
* Refusal rate
* User satisfaction
* Latency and cost
* Regression alerts

**Reality**
Many teams rely heavily on human review early on.

---

## 24. Can fine-tuning help with hallucinations?

**Answer**
Only slightly. It’s not the main fix.

**Explanation**

* Fine-tuning can reduce hallucinations *for known patterns*
* RAG and grounding work much better

**Strong interview line**
“Hallucinations are a retrieval problem more than a tuning problem.”

---

## 25. How do you explain fine-tuning ROI to a product manager?

**Answer**
“It improves consistency and reduces prompt cost, but it’s not magic.”

**Business framing**

* Fewer retries
* Shorter prompts
* Better UX
* Lower inference cost

**Why this matters**
Shows cross-functional thinking.

---

## 26. When should you NOT fine-tune an LLM?

**Answer**
When your problem is actually data access or logic, not language behavior.

**Do NOT fine-tune if**

* You need real-time data
* Answers must be factual and current
* Logic can be handled in code
* Prompting already works

---

## 27. How do senior engineers talk about fine-tuning?

**Answer**
As a **behavior optimization tool**, not a silver bullet.

**Senior-level mindset**

* Start simple
* Measure impact
* Optimize cost
* Roll back easily
* Prefer data fixes over training tricks

---

### Final Interview Summary (Memorable Lines)

Use these in interviews:

* “Fine-tuning shapes behavior, not knowledge.”
* “I start with prompting, then fine-tune for consistency.”
* “Most fine-tuning problems are data problems.”
* “LoRA gets you 80–90% of the benefit for 10% of the cost.”
* “Fine-tuning and RAG solve different problems.”