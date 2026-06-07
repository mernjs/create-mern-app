## RAG Systems

## 1. What is a RAG system, in simple terms?

**Answer**
RAG stands for Retrieval-Augmented Generation.
It’s a system where an LLM does not rely only on its training data. Instead, it **retrieves relevant documents at query time** and uses them to generate the answer.

**Practical explanation**
Instead of asking the model to “remember everything,” we let it:

1. Search relevant data (documents, DB, PDFs, logs)
2. Pass that data to the LLM
3. Generate an answer grounded in that data

**Real-world example**
Customer support chatbot that answers questions using internal product documentation.

---

## 2. Why do we use RAG instead of fine-tuning?

**Answer**
RAG is used when data changes frequently or is large.
Fine-tuning is expensive, slow, and hard to update.

**Key differences**

* **RAG**: Update data → re-index → done
* **Fine-tuning**: Update data → retrain model → redeploy

**Trade-off**

* RAG adds latency due to retrieval
* Fine-tuning gives faster inference but less flexibility

---

## 3. Can you explain the high-level architecture of a RAG system?

**Answer**
A typical RAG system has four main steps:

1. Ingest data
2. Create embeddings
3. Retrieve relevant chunks
4. Generate response using an LLM

**Workflow**

* Documents → chunking → embeddings → vector database
* User query → embedding → similarity search
* Retrieved chunks + query → LLM → answer

---

## 4. How do embeddings work in a RAG system?

**Answer**
Embeddings convert text into vectors so that semantically similar text is close in vector space.

**Practical explanation**

* Documents and queries are embedded using the same model
* We use cosine similarity or dot product to find relevant chunks

**Common mistake**
Using different embedding models for documents and queries — this breaks retrieval quality.

---

## 5. How do you decide chunk size in RAG?

**Answer**
Chunk size is a trade-off between context quality and retrieval accuracy.

**Typical approach**

* 300–800 tokens per chunk
* Add overlap (50–100 tokens) to avoid cutting important context

**Trade-off**

* Small chunks → better recall, worse coherence
* Large chunks → better coherence, worse retrieval precision

---

## 6. What problems do RAG systems face in production?

**Answer**
Common issues include:

* Hallucinations
* Irrelevant retrieval
* High latency
* Context window limits

**How we handle them**

* Strict prompt instructions (“answer only from context”)
* Re-ranking retrieved documents
* Limiting top-k results
* Caching frequent queries

---

## 7. How do you reduce hallucinations in RAG?

**Answer**
You don’t eliminate hallucinations completely, but you reduce them.

**Practical steps**

* Use high-quality retrieval
* Pass only relevant chunks
* Use system prompts like:
  “If the answer is not in the context, say you don’t know.”
* Log responses and add human feedback loops

---

## 8. What is vector database and why is it needed?

**Answer**
A vector database stores embeddings and supports fast similarity search.

**Why not a normal database**
Traditional databases are bad at nearest-neighbor search in high-dimensional space.

**Production considerations**

* Index type (HNSW, IVF)
* Memory usage
* Update frequency
* Latency requirements

---

## 9. How would you evaluate a RAG system?

**Answer**
You evaluate both **retrieval quality** and **generation quality**.

**Retrieval metrics**

* Recall@k
* Precision@k

**Generation evaluation**

* Human evaluation
* Groundedness (answer supported by context)
* Faithfulness

**In practice**
Most teams rely heavily on **manual review + logs**.

---

## 10. When would you NOT use RAG?

**Answer**
RAG is not ideal when:

* The task is purely creative
* Data is small and static
* Ultra-low latency is required
* Answers don’t depend on external knowledge

**Example**
Chat-based creative writing assistant — no need for retrieval.

---

## 11. How does RAG affect latency and how do you optimize it?

**Answer**
RAG increases latency because of retrieval + generation.

**Optimizations**

* Cache embeddings
* Cache retrieval results
* Reduce top-k
* Use smaller LLMs
* Async retrieval pipelines

---

## 12. What does an interviewer usually look for in RAG answers?

**Answer**
They look for:

* Clear understanding of retrieval vs generation
* Awareness of trade-offs
* Production challenges
* Practical decision-making

**Red flag**
Over-theoretical answers with no production awareness.

---

## 13. What is hybrid search in RAG and why is it used?

**Answer**
Hybrid search combines **vector search** and **keyword (BM25) search**.

**Why it’s needed**

* Vector search is good at semantics
* Keyword search is good at exact matches (IDs, error codes, names)

**In practice**
Most production RAG systems use:

* Vector search for meaning
* Keyword search as a fallback or combined score

**Example**
Searching internal logs where error codes matter.

---

## 14. What is re-ranking and why is it important?

**Answer**
Re-ranking improves retrieval quality by re-ordering the top results using a more expensive model.

**How it works**

1. Fast vector search → top 20–50 chunks
2. Cross-encoder or scoring model re-ranks them
3. Pass top 3–5 chunks to the LLM

**Trade-off**

* Better relevance
* More latency and compute cost

**Interview tip**
Mention re-ranking when talking about hallucination reduction.

---

## 15. What is context stuffing and why is it bad?

**Answer**
Context stuffing means sending too much irrelevant data to the LLM.

**Why it’s bad**

* Increases hallucinations
* Wastes context window
* Confuses the model

**Best practice**

* Fewer, higher-quality chunks
* Prefer relevance over quantity

---

## 16. How do you handle context window limits?

**Answer**
You must aggressively control what goes into the prompt.

**Common techniques**

* Top-k retrieval
* Chunk summarization
* Hierarchical retrieval (doc → section → chunk)
* Sliding window retrieval

**Production insight**
Large context windows help, but **retrieval quality still matters more**.

---

## 17. How do you handle structured data in RAG?

**Answer**
Structured data should not always go through embeddings.

**Better approaches**

* SQL / API lookup first
* Convert results to text
* Then pass to the LLM

**Example**
Order status, account balance, metrics dashboards.

**Interview signal**
Shows you understand RAG is not the solution to everything.

---

## 18. How do you design a RAG prompt?

**Answer**
A good RAG prompt is strict and minimal.

**Typical structure**

* System instruction (rules)
* Retrieved context
* User question

**Key rule**
“In your answer, use only the provided context.”

**Mistake**
Letting the model answer from general knowledge.

---

## 19. How do you monitor a RAG system in production?

**Answer**
You monitor both **retrieval** and **generation**.

**What to log**

* Retrieved chunks
* Similarity scores
* Final answer
* User feedback

**Why it matters**
Most RAG failures come from bad retrieval, not bad models.

---

## 20. How do you update data in a RAG system?

**Answer**
You update the index, not the model.

**Common strategies**

* Batch re-indexing
* Incremental updates
* Versioned indexes

**Production concern**
Index updates must not break live traffic.

---

## 21. What security concerns exist in RAG systems?

**Answer**
Main risks:

* Data leakage
* Prompt injection
* Cross-tenant data access

**Mitigations**

* Access-controlled retrieval
* Query filtering
* Sanitizing user input
* Tenant-aware indexes

**Interview bonus**
Mention prompt injection — it shows real-world awareness.

---

## 22. How do you prevent a RAG system from answering when data is missing?

**Answer**
You design for “safe failure.”

**Techniques**

* Confidence thresholds on similarity scores
* Explicit “I don’t know” responses
* Empty-context handling logic

**Why this matters**
Wrong answers are worse than no answers.

---

## 23. How do you test a RAG system?

**Answer**
You test it like a product, not a model.

**Testing types**

* Golden question sets
* Regression tests on retrieval
* Prompt versioning tests
* Human review

**Reality**
Automated metrics help, but humans catch most issues.

---

## 24. What are common RAG anti-patterns?

**Answer**

* Treating RAG like magic
* Sending too much context
* Ignoring retrieval quality
* No monitoring or feedback loop
* Using RAG when a DB query is enough

---

## 25. How would you explain RAG in a system design interview?

**Answer**
Keep it simple and practical.

**What interviewers want**

* Clear data flow
* Trade-offs
* Failure handling
* Scaling approach

**Red flag**
Jumping straight into models without explaining retrieval.

---

## 26. What’s the future direction of RAG systems?

**Answer**
RAG is moving toward:

* Agentic retrieval
* Tool-based retrieval
* Better re-ranking
* More structured grounding

**Key idea**
RAG is becoming a **retrieval-first system**, not an LLM-first one.