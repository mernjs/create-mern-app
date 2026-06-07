# GenAI MCQs

---

## Section 1: Generative AI Fundamentals (1–25)

**1. What is the core training objective of most LLMs?**
- A. Image classification
- B. Next token prediction
- C. Rule-based reasoning
- D. Knowledge graph traversal
- **Answer:** B

---

**2. Why are LLMs called “large”?**
- A. They generate long text
- B. They require GPUs
- C. They have billions of parameters
- D. They store large databases
- **Answer:** C

---

**3. Which factor most directly affects LLM output randomness?**
- A. Context window
- B. Temperature
- C. Token limit
- D. Prompt length
- **Answer:** B

---

**4. What happens when temperature is set to 0?**
- A. Model stops working
- B. Output becomes random
- C. Output becomes deterministic
- D. Context is ignored
- **Answer:** C

---

**5. What is a token?**
- A. A word only
- B. A sentence
- C. A fixed-length character block
- D. A subword unit
- **Answer:** D

---

**6. Why do LLMs hallucinate?**
- A. Bugs in the model
- B. Missing internet access
- C. Probabilistic generation without truth checking
- D. Low temperature
- **Answer:** C

---

**7. What is a context window?**
- A. Model memory storage
- B. UI chat history
- C. Max tokens processed per request
- D. Training dataset size
- **Answer:** C

---

**8. What happens when context exceeds the limit?**
- A. Model crashes
- B. Tokens are compressed
- C. Older tokens are dropped
- D. Output becomes faster
- **Answer:** C

---

**9. Which task is LLMs best suited for?**
- A. Exact arithmetic
- B. Rule-based validation
- C. Natural language generation
- D. Deterministic workflows
- **Answer:** C

---

**10. LLMs are inherently:**
- A. Stateful
- B. Deterministic
- C. Stateless
- D. Self-correcting
- **Answer:** C

---

**11. What makes foundation models special?**
- A. Small size
- B. Task-specific training
- C. Broad general-purpose training
- D. Fixed outputs
- **Answer:** C

---

**12. Which is NOT a GenAI output type?**
- A. Text
- B. Image
- C. Audio
- D. Database index
- **Answer:** D

---

**13. Which parameter controls diversity of outputs?**
- A. max_tokens
- B. temperature
- C. stop sequence
- D. frequency penalty
- **Answer:** B

---

**14. What is top-p sampling?**
- A. Selecting top k tokens
- B. Selecting tokens above probability threshold
- C. Selecting smallest probability mass ≥ p
- D. Selecting random tokens
- **Answer:** C

---

**15. Which reduces hallucinations most effectively?**
- A. Increasing temperature
- B. Using RAG
- C. Using emojis
- D. Removing system prompts
- **Answer:** B

---

**16. What does inference mean?**
- A. Model training
- B. Output generation
- C. Dataset labeling
- D. Weight optimization
- **Answer:** B

---

**17. LLM pretraining is mostly:**
- A. Supervised
- B. Reinforcement learning
- C. Self-supervised
- D. Unsupervised clustering
- **Answer:** C

---

**18. Which is NOT a common LLM limitation?**
- A. Hallucinations
- B. Context limits
- C. Deterministic reasoning
- D. Cost
- **Answer:** C

---

**19. Tokens affect:**
- A. Only latency
- B. Only cost
- C. Cost and latency
- D. Model accuracy only
- **Answer:** C

---

**20. Which statement is true?**
- A. LLMs store memory internally
- B. LLMs reason symbolically
- C. LLMs predict probabilities
- D. LLMs verify facts
- **Answer:** C

---

**21. What is a stop sequence used for?**
- A. Training
- B. Ending generation
- C. Token counting
- D. Embedding creation
- **Answer:** B

---

**22. What happens with high temperature?**
- A. Safer outputs
- B. Less variation
- C. More creativity
- D. Lower cost
- **Answer:** C

---

**23. Which is safer for production?**
- A. Temperature = 1
- B. Temperature = 0
- C. Random sampling
- D. No constraints
- **Answer:** B

---

**24. LLMs fundamentally optimize for:**
- A. Truth
- B. Accuracy
- C. Probability
- D. Logic
- **Answer:** C

---

**25. What is the biggest misconception about LLMs?**
- A. They use transformers
- B. They understand language
- C. They generate text
- D. They need prompts
- **Answer:** B

---

## Section 2: Prompt Engineering (26–60)

**26. What has highest priority in prompts?**
- A. User prompt
- B. Assistant response
- C. System prompt
- D. Memory
- **Answer:** C

---

**27. Few-shot prompting means:**
- A. No examples
- B. Many examples
- C. Some examples
- D. One example only
- **Answer:** C

---

**28. Why use structured JSON outputs?**
- A. Better UI
- B. Easier parsing
- C. Faster inference
- D. Smaller tokens
- **Answer:** B

---

**29. What is prompt injection?**
- A. Prompt reuse
- B. Prompt caching
- C. Malicious instruction override
- D. Prompt formatting
- **Answer:** C

---

**30. Best defense against prompt injection?**
- A. User validation
- B. Strong system prompt
- C. High temperature
- D. Short prompts
- **Answer:** B

---

**31. Chain-of-thought refers to:**
- A. Internal weights
- B. Step-by-step reasoning
- C. Prompt history
- D. Token chains
- **Answer:** B

---

**32. Why hide chain-of-thought in production?**
- A. Cost
- B. IP leakage
- C. Hallucinations
- D. Token limits
- **Answer:** B

---

**33. What is role prompting?**
- A. Prompt formatting
- B. Assigning a persona
- C. System reset
- D. Memory injection
- **Answer:** B

---

**34. Prompt templates help with:**
- A. Tokenization
- B. Consistency
- C. Training
- D. Indexing
- **Answer:** B

---

**35. Prompt chaining means:**
- A. Long prompts
- B. Multi-step prompts
- C. Recursive prompts
- D. Reused prompts
- **Answer:** B

---

**36. What causes verbose answers?**
- A. High temperature
- B. Clear constraints
- C. Short prompts
- D. Stop sequences
- **Answer:** A

---

**37. What is hallucination-aware prompting?**
- A. Forcing creativity
- B. Allowing “I don’t know”
- C. Removing system prompt
- D. Increasing tokens
- **Answer:** B

---

**38. Prompt versioning is similar to:**
- A. Caching
- B. Logging
- C. Git versioning
- D. Embeddings
- **Answer:** C

---

**39. When should you fine-tune instead of prompt?**
- A. One-off tasks
- B. Consistent domain behavior
- C. Short responses
- D. Prototyping
- **Answer:** B

---

**40. Stop sequences are useful for:**
- A. Formatting
- B. Controlling output length
- C. Training
- D. Token counting
- **Answer:** B

---

**41. Prompt leakage means:**
- A. Token overflow
- B. Model revealing instructions
- C. Cache miss
- D. Memory drift
- **Answer:** B

---

**42. Output constraints reduce:**
- A. Accuracy
- B. Hallucinations
- C. Cost
- D. Latency
- **Answer:** B

---

**43. Which is safer?**
- A. Open-ended prompts
- B. Narrow scoped prompts
- C. Creative prompts
- D. Long prompts
- **Answer:** B

---

**44. Instruction hierarchy is:**
- A. User > System
- B. Assistant > User
- C. System > User
- D. Memory > System
- **Answer:** C

---

**45. Why prompt testing is needed?**
- A. Token limits
- B. Prevent regressions
- C. Improve UI
- D. Reduce embeddings
- **Answer:** B

---

**46. Prompt chaining is useful when:**
- A. Task is complex
- B. Task is deterministic
- C. Output is short
- D. No tools needed
- **Answer:** A

---

**47. What improves reliability most?**
- A. Larger models
- B. Better prompts
- C. Structured outputs
- D. All of the above
- **Answer:** D

---

**48. What is self-consistency prompting?**
- A. Same prompt once
- B. Multiple answers + compare
- C. Prompt reuse
- D. Prompt caching
- **Answer:** B

---

**49. What should prompts avoid?**
- A. Constraints
- B. Ambiguity
- C. Structure
- D. Instructions
- **Answer:** B

---

**50. Production prompts should be:**
- A. Creative
- B. Long
- C. Deterministic
- D. Random
- **Answer:** C

---

## Section 3: Conversation & Memory (51–80)

**51. Why are LLMs considered stateless?**
- A. They forget prompts instantly
- B. They do not store context between requests
- C. They reset weights after each call
- D. They lack memory tokens
- **Answer:** B

**52. How is conversation simulated in LLMs?**
- A. Internal memory
- B. Database writes
- C. Re-sending chat history
- D. Fine-tuning
- **Answer:** C

**53. What is a conversation buffer?**
- A. Token counter
- B. Stored chat history
- C. Prompt cache
- D. Vector index
- **Answer:** B

**54. What is sliding window memory used for?**
- A. Long-term recall
- B. Cost optimization
- C. Keeping recent context only
- D. Model training
- **Answer:** C

**55. What is short-term memory?**
- A. Persistent storage
- B. Session-level context
- C. Vector embeddings
- D. Prompt templates
- **Answer:** B

**56. What is long-term memory usually implemented with?**
- A. Cache
- B. Prompt chaining
- C. Vector databases
- D. Cookies
- **Answer:** C

**57. Memory injection means:**
- A. Fine-tuning
- B. Appending retrieved memory to prompt
- C. Token compression
- D. Prompt leakage
- **Answer:** B

**58. Memory drift occurs when:**
- A. Tokens overflow
- B. Old memory accumulates
- C. Context is reset
- D. Temperature is high
- **Answer:** B

**59. What is persona memory?**
- A. Global user data
- B. Model weights
- C. Role-specific memory
- D. Prompt cache
- **Answer:** C

**60. What is memory poisoning?**
- A. Token truncation
- B. Invalid embeddings
- C. Storing false user data
- D. Prompt injection
- **Answer:** C

**61. Best way to expire memory?**
- A. Manual deletion
- B. TTL + relevance scoring
- C. Increasing context
- D. Re-prompting
- **Answer:** B

**62. Memory summarization helps with:**
- A. Accuracy only
- B. Token reduction
- C. Model training
- D. Embedding creation
- **Answer:** B

**63. What is episodic memory?**
- A. General facts
- B. Event-based memory
- C. Model weights
- D. Prompt templates
- **Answer:** B

**64. What overrides memory conflicts?**
- A. User input
- B. Assistant output
- C. System prompt
- D. Embeddings
- **Answer:** C

**65. Memory relevance scoring is used to:**
- A. Delete memory
- B. Rank memories
- C. Compress tokens
- D. Cache prompts
- **Answer:** B

**66. What is working memory?**
- A. Database storage
- B. Active reasoning context
- C. Vector index
- D. Cache layer
- **Answer:** B

**67. When should conversations be reset?**
- A. Every turn
- B. Topic shift or drift
- C. After embeddings
- D. After fine-tuning
- **Answer:** B

**68. What risk does memory summarization introduce?**
- A. Latency
- B. Loss of nuance
- C. Hallucination removal
- D. Cost increase
- **Answer:** B

**69. Best memory architecture is:**
- A. Only short-term
- B. Only long-term
- C. Hybrid memory
- D. No memory
- **Answer:** C

**70. Is memory mandatory?**
- A. Always
- B. Never
- C. Only for assistants
- D. Only for RAG
- **Answer:** C

**71. What causes context overflow?**
- A. High temperature
- B. Long history
- C. Short prompts
- D. Embeddings
- **Answer:** B

**72. What should be injected first?**
- A. User input
- B. Memory
- C. System prompt
- D. Tools
- **Answer:** C

**73. Memory grounding means:**
- A. Deleting memory
- B. Validating memory
- C. Compressing memory
- D. Embedding memory
- **Answer:** B

**74. What is global memory?**
- A. Session-only data
- B. Shared long-term facts
- C. Prompt cache
- D. Vector index
- **Answer:** B

**75. Memory TTL stands for:**
- A. Token time limit
- B. Time to live
- C. Training token length
- D. Tool transfer logic
- **Answer:** B

**76. Memory hallucination happens when:**
- A. Memory is validated
- B. Memory is wrong
- C. Tokens are low
- D. Temperature is zero
- **Answer:** B

**77. Memory compression helps with:**
- A. Accuracy
- B. Latency
- C. Token limits
- D. Training
- **Answer:** C

**78. Memory systems rely heavily on:**
- A. Fine-tuning
- B. Embeddings
- C. Prompt chaining
- D. Stop sequences
- **Answer:** B

**79. Memory vs RAG difference?**
- A. Same thing
- B. Memory is user-centric
- C. RAG is session-only
- D. Memory uses keywords
- **Answer:** B

**80. Memory is most critical for:**
- A. One-off queries
- B. Chatbots
- C. Image generation
- D. Training
- **Answer:** B

---

## Section 4: Embeddings & Vector Search (81–110)

**81. What do embeddings represent?**
- A. Syntax
- B. Meaning
- C. Grammar
- D. Formatting
- **Answer:** B

**82. Embeddings are stored in:**
- A. SQL DB
- B. Vector DB
- C. Cache
- D. File system
- **Answer:** B

**83. What similarity metric is most common?**
- A. Euclidean
- B. Manhattan
- C. Cosine
- D. Hamming
- **Answer:** C

**84. Why cosine similarity?**
- A. Faster math
- B. Ignores magnitude
- C. Lower cost
- D. Deterministic output
- **Answer:** B

**85. Chunking is required because:**
- A. Models are slow
- B. Context is limited
- C. Embeddings are random
- D. PDFs are large
- **Answer:** B

**86. Typical chunk size range?**
- A. 10–50 tokens
- B. 50–100 tokens
- C. 200–1000 tokens
- D. 5000+ tokens
- **Answer:** C

**87. Chunk overlap helps with:**
- A. Cost
- B. Context continuity
- C. Index size
- D. Latency
- **Answer:** B

**88. What is ANN search?**
- A. Exact search
- B. Approximate nearest neighbor
- C. NLP parser
- D. Token matcher
- **Answer:** B

**89. What does recall measure?**
- A. Accuracy
- B. Coverage of relevant docs
- C. Latency
- D. Cost
- **Answer:** B

**90. Metadata is used for:**
- A. Embedding creation
- B. Filtering results
- C. Tokenization
- D. Training
- **Answer:** B

**91. Embedding drift happens when:**
- A. Data changes
- B. Model changes
- C. Tokens change
- D. Prompts change
- **Answer:** B

**92. How to fix embedding drift?**
- A. Cache embeddings
- B. Re-embed data
- C. Increase temperature
- D. Add overlap
- **Answer:** B

**93. Hybrid search combines:**
- A. RAG + agents
- B. Keywords + vectors
- C. Cache + DB
- D. Memory + prompts
- **Answer:** B

**94. What is re-ranking?**
- A. Chunking
- B. Reordering results
- C. Re-embedding
- D. Re-training
- **Answer:** B

**95. Cross-encoders are:**
- A. Fast & inaccurate
- B. Slow & accurate
- C. Stateless
- D. Tokenizers
- **Answer:** B

**96. Query embedding means:**
- A. Indexing docs
- B. Embedding user query
- C. Caching prompts
- D. Fine-tuning
- **Answer:** B

**97. Embedding caching helps with:**
- A. Accuracy
- B. Cost
- C. Training
- D. Hallucinations
- **Answer:** B

**98. What causes poor retrieval?**
- A. Low temperature
- B. Bad chunking
- C. JSON outputs
- D. Stop tokens
- **Answer:** B

**99. Vector dimensionality refers to:**
- A. Token count
- B. Embedding size
- C. DB rows
- D. Chunk length
- **Answer:** B

**100. Embeddings are deterministic if:**
- A. Same prompt
- B. Same model + input
- C. Same temperature
- D. Same output
- **Answer:** B

**101. Why use metadata filtering?**
- A. Speed
- B. Precision
- C. Cost
- D. Memory
- **Answer:** B

**102. What is semantic clustering?**
- A. Token grouping
- B. Vector grouping
- C. Prompt grouping
- D. Model grouping
- **Answer:** B

**103. Vector compression reduces:**
- A. Accuracy only
- B. Memory usage
- C. Tokens
- D. Training time
- **Answer:** B

**104. What is cold start problem?**
- A. No GPU
- B. No data
- C. No prompts
- D. No cache
- **Answer:** B

**105. What is vector index used for?**
- A. Sorting
- B. Faster search
- C. Tokenization
- D. Training
- **Answer:** B

**106. Why re-write queries?**
- A. Improve UX
- B. Improve retrieval
- C. Reduce tokens
- D. Avoid memory
- **Answer:** B

**107. What is similarity threshold?**
- A. Token limit
- B. Cutoff score
- C. Temperature
- D. Stop sequence
- **Answer:** B

**108. What is embedding leakage risk?**
- A. Cost
- B. Privacy
- C. Latency
- D. Accuracy
- **Answer:** B

**109. Best practice for sensitive data?**
- A. Embed everything
- B. Filter inputs
- C. Ignore security
- D. Increase temperature
- **Answer:** B

**110. Embeddings are primarily used for:**
- A. Generation
- B. Retrieval
- C. Training
- D. Tokenization
- **Answer:** B

---

## Section 5: RAG (111–140)

**111. RAG stands for:**
- A. Retrieval Assisted Generation
- B. Retrieval Augmented Generation
- C. Reasoning Augmented Generation
- D. Reinforced AI Generation
- **Answer:** B

**112. Main benefit of RAG?**
- A. Faster inference
- B. Reduced hallucination
- C. Lower cost
- D. Better UI
- **Answer:** B

**113. RAG combines:**
- A. Prompts + memory
- B. Retrieval + generation
- C. Agents + tools
- D. Vision + LLM
- **Answer:** B

**114. Grounding means:**
- A. Lower temperature
- B. Answer from context only
- C. Longer prompts
- D. Re-ranking
- **Answer:** B

**115. Poor RAG answers usually caused by:**
- A. LLM size
- B. Retrieval failure
- C. Fine-tuning
- D. Caching
- **Answer:** B

**116. Context stuffing causes:**
- A. Accuracy gain
- B. Confusion
- C. Faster inference
- D. Determinism
- **Answer:** B

**117. Re-ranking improves:**
- A. Latency
- B. Precision
- C. Cost
- D. Token count
- **Answer:** B

**118. Multi-source RAG retrieves from:**
- A. One DB
- B. Multiple sources
- C. Cache only
- D. Prompt history
- **Answer:** B

**119. Query rewriting helps with:**
- A. UI
- B. Retrieval quality
- C. Token cost
- D. Training
- **Answer:** B

**120. Map-reduce summarization is used for:**
- A. Short docs
- B. Long docs
- C. Images
- D. Audio
- **Answer:** B

**121. Long-context vs RAG?**
- A. Same
- B. RAG scales better
- C. Long-context cheaper
- D. RAG slower
- **Answer:** B

**122. Citation hallucination means:**
- A. Missing citation
- B. Fake citation
- C. Wrong embedding
- D. Low recall
- **Answer:** B

**123. Best way to prevent citation hallucination?**
- A. Larger model
- B. Forced citation IDs
- C. High temperature
- D. Long prompts
- **Answer:** B

**124. Adaptive RAG means:**
- A. Fixed pipeline
- B. Dynamic retrieval
- C. No embeddings
- D. No prompts
- **Answer:** B

**125. Retrieval latency comes from:**
- A. LLM
- B. Vector DB
- C. UI
- D. Tokenization
- **Answer:** B

**126. How to reduce retrieval latency?**
- A. Larger model
- B. ANN indexes
- C. Longer chunks
- D. Fine-tuning
- **Answer:** B

**127. Document freshness refers to:**
- A. Token age
- B. Data recency
- C. Chunk overlap
- D. Cache expiry
- **Answer:** B

**128. RAG is unsafe if:**
- A. Context is empty
- B. Data is poisoned
- C. Temperature is zero
- D. Output is JSON
- **Answer:** B

**129. RAG evaluation measures:**
- A. Recall + faithfulness
- B. Accuracy only
- C. Token usage
- D. UI latency
- **Answer:** A

**130. RAG caching stores:**
- A. Tokens
- B. Retrieval results
- C. Model weights
- D. Prompts
- **Answer:** B

**131. When is RAG preferred over fine-tuning?**
- A. Static knowledge
- B. Dynamic knowledge
- C. Low latency
- D. One-off queries
- **Answer:** B

**132. RAG failure fallback should:**
- A. Retry forever
- B. Return safe response
- C. Ignore user
- D. Increase temperature
- **Answer:** B

**133. RAG pipeline starts with:**
- A. Generation
- B. Ingestion
- C. Retrieval
- D. Prompting
- **Answer:** B

**134. Chunk quality affects:**
- A. Cost only
- B. Retrieval quality
- C. Training
- D. UI
- **Answer:** B

**135. RAG + agents enables:**
- A. Reasoned actions
- B. Training
- C. Token reduction
- D. Vision only
- **Answer:** A

**136. RAG logs help debug:**
- A. UI
- B. Retrieval failures
- C. Model weights
- D. Tokenizer
- **Answer:** B

**137. RAG systems should always have:**
- A. Monitoring
- B. Creativity
- C. Large models
- D. Long prompts
- **Answer:** A

**138. RAG answer faithfulness means:**
- A. Fluency
- B. Context alignment
- C. Creativity
- D. Length
- **Answer:** B

**139. What improves RAG precision most?**
- A. Bigger model
- B. Better retrieval
- C. Higher temperature
- D. Longer prompts
- **Answer:** B

**140. Production RAG requires:**
- A. Prompt only
- B. Evaluation + monitoring
- C. Fine-tuning
- D. Vision
- **Answer:** B

---

## Section 6: Agents & Safety (141–170)

**141. What defines an AI agent?**
- A. Prompt only
- B. LLM + tools + goals
- C. Vector DB
- D. Cache
- **Answer:** B

**142. Planner agent responsibility:**
- A. Execute tasks
- B. Decide steps
- C. Store memory
- D. Render UI
- **Answer:** B

**143. Executor agent responsibility:**
- A. Decide plan
- B. Execute tools
- C. Store embeddings
- D. Validate prompts
- **Answer:** B

**144. Tool calling allows LLMs to:**
- A. Train models
- B. Call functions
- C. Access weights
- D. Cache prompts
- **Answer:** B

**145. Tool input validation prevents:**
- A. Latency
- B. Security issues
- C. Tokens
- D. Drift
- **Answer:** B

**146. Agent loop includes:**
- A. Plan → act → observe
- B. Train → test
- C. Prompt → output
- D. Embed → retrieve
- **Answer:** A

**147. Autonomous agents are risky because:**
- A. Cost
- B. Unchecked actions
- C. Latency
- D. Tokens
- **Answer:** B

**148. Guardrails are used to:**
- A. Improve creativity
- B. Enforce boundaries
- C. Increase speed
- D. Reduce cost
- **Answer:** B

**149. Human-in-the-loop provides:**
- A. Automation
- B. Oversight
- C. Latency
- D. Memory
- **Answer:** B

**150. Self-reflection allows agents to:**
- A. Retry blindly
- B. Improve outputs
- C. Reduce tokens
- D. Cache results
- **Answer:** B

**151. Multi-agent systems help with:**
- A. Simple tasks
- B. Complex workflows
- C. Token limits
- D. Training
- **Answer:** B

**152. Agent vs workflow difference:**
- A. Same
- B. Reasoning vs deterministic
- C. Speed
- D. Cost
- **Answer:** B

**153. When NOT to use agents?**
- A. Multi-step tasks
- B. Deterministic logic
- C. Tool use
- D. Planning
- **Answer:** B

**154. Hallucination detection checks:**
- A. Grammar
- B. Factual support
- C. UI
- D. Latency
- **Answer:** B

**155. Confidence scoring measures:**
- A. Creativity
- B. Output certainty
- C. Tokens
- D. Latency
- **Answer:** B

**156. Regression testing detects:**
- A. Token drift
- B. Behavior drift
- C. Model size
- D. Latency
- **Answer:** B

**157. Prompt regression is caused by:**
- A. Prompt changes
- B. Model updates
- C. Cache miss
- D. Indexing
- **Answer:** A

**158. Model regression is caused by:**
- A. Prompt change
- B. Model update
- C. Memory
- D. Tokens
- **Answer:** B

**159. Observability helps understand:**
- A. Cost only
- B. Why output happened
- C. UI bugs
- D. Training
- **Answer:** B

**160. Retry logic should avoid:**
- A. Failure
- B. Infinite loops
- C. Success
- D. Logging
- **Answer:** B

**161. Rate limiting controls:**
- A. Tokens
- B. Abuse
- C. Prompts
- D. Memory
- **Answer:** B

**162. Secrets should be stored in:**
- A. Code
- B. Env variables / secret managers
- C. Logs
- D. Prompts
- **Answer:** B

**163. Fallback strategy means:**
- A. Retry only
- B. Safe alternative response
- C. Ignore error
- D. Crash
- **Answer:** B

**164. Safety filters should apply to:**
- A. Input only
- B. Output only
- C. Both input and output
- D. Neither
- **Answer:** C

**165. Guardrails reduce:**
- A. Accuracy
- B. Risk
- C. Cost
- D. Tokens
- **Answer:** B

**166. Production agents require:**
- A. Creativity
- B. Monitoring
- C. Long prompts
- D. Large models
- **Answer:** B

**167. Agents should log:**
- A. Nothing
- B. Decisions and actions
- C. Weights
- D. Tokens only
- **Answer:** B

**168. Agent failures should be:**
- A. Ignored
- B. Observed and handled
- C. Cached
- D. Fine-tuned
- **Answer:** B

**169. Responsible AI focuses on:**
- A. Speed
- B. Safety and alignment
- C. Cost only
- D. Creativity
- **Answer:** B

**170. Agents are best used when:**
- A. Task is trivial
- B. Reasoning is required
- C. Output is static
- D. No tools needed
- **Answer:** B

---

## Section 7: Vision, Multimodal & Production (171–210)

**171. Computer vision processes:**
- A. Tokens
- B. Pixels
- C. Words
- D. Embeddings only
- **Answer:** B

**172. Images are represented as:**
- A. Strings
- B. Tensors
- C. Vectors only
- D. Tokens
- **Answer:** B

**173. Object detection outputs:**
- A. Labels only
- B. Bounding boxes + classes
- C. Text
- D. Tokens
- **Answer:** B

**174. YOLO is known for:**
- A. Accuracy only
- B. Real-time speed
- C. Training ease
- D. Language support
- **Answer:** B

**175. IOU measures:**
- A. Speed
- B. Overlap
- C. Confidence
- D. Cost
- **Answer:** B

**176. Vision + LLM enables:**
- A. Detection only
- B. Reasoned descriptions
- C. Training
- D. Token reduction
- **Answer:** B

**177. Visual grounding prevents:**
- A. Cost
- B. Hallucinated visuals
- C. Latency
- D. Embeddings
- **Answer:** B

**178. OCR extracts:**
- A. Images
- B. Text
- C. Audio
- D. Video
- **Answer:** B

**179. Video understanding requires:**
- A. Tokenization
- B. Temporal reasoning
- C. Fine-tuning
- D. Caching
- **Answer:** B

**180. Multimodal AI combines:**
- A. Prompts only
- B. Multiple data types
- C. Multiple models only
- D. Memory only
- **Answer:** B

**181. Diffusion models generate by:**
- A. Classification
- B. Noise removal
- C. GAN loss
- D. Token prediction
- **Answer:** B

**182. Stable Diffusion is used for:**
- A. Text
- B. Images
- C. Audio
- D. Video only
- **Answer:** B

**183. Guidance scale controls:**
- A. Speed
- B. Prompt adherence
- C. Token usage
- D. Cost
- **Answer:** B

**184. Negative prompts specify:**
- A. Desired content
- B. Undesired content
- C. Model weights
- D. Tokens
- **Answer:** B

**185. Inpainting is used for:**
- A. Cropping
- B. Filling masked areas
- C. Detection
- D. Tokenization
- **Answer:** B

**186. Image-to-image means:**
- A. Text to image
- B. Modify existing image
- C. Video generation
- D. OCR
- **Answer:** B

**187. LoRA is:**
- A. Full fine-tuning
- B. Parameter-efficient tuning
- C. Tokenizer
- D. Vector DB
- **Answer:** B

**188. Diffusion risks include:**
- A. Latency only
- B. Misuse and bias
- C. Token overflow
- D. Prompt injection
- **Answer:** B

**189. Production diffusion systems need:**
- A. Creativity
- B. Safety filters
- C. Long prompts
- D. Training
- **Answer:** B

**190. Full-stack AI product includes:**
- A. Model only
- B. UI + backend + AI
- C. Prompt only
- D. DB only
- **Answer:** B

**191. Most important production concern:**
- A. Creativity
- B. Reliability
- C. Token length
- D. Prompt style
- **Answer:** B

**192. Cost optimization includes:**
- A. Larger models
- B. Caching and batching
- C. Longer prompts
- D. Higher temperature
- **Answer:** B

**193. Observability answers:**
- A. What failed
- B. Why it failed
- C. When trained
- D. Token count
- **Answer:** B

**194. GenAI systems should be:**
- A. Stateless and modular
- B. Stateful only
- C. Monolithic
- D. Prompt-only
- **Answer:** A

**195. Biggest GenAI mistake:**
- A. Using RAG
- B. Ignoring evaluation
- C. Using LLMs
- D. Using JSON
- **Answer:** B

**196. Production systems must handle:**
- A. Happy paths only
- B. Failures gracefully
- C. Only success
- D. Training
- **Answer:** B

**197. System design interviews focus on:**
- A. Prompt writing
- B. Tradeoffs
- C. Token counting
- D. UI
- **Answer:** B

**198. Best way to scale GenAI:**
- A. Bigger prompts
- B. Async + caching
- C. More memory
- D. Higher temperature
- **Answer:** B

**199. GenAI engineers should think in terms of:**
- A. Prompts
- B. Systems
- C. Models only
- D. Tokens
- **Answer:** B

**200. Interviewers want to see:**
- A. Prompt tricks
- B. System thinking
- C. UI design
- D. Token math
- **Answer:** B

**201. What reduces latency most?**
- A. Larger models
- B. Caching
- C. Longer prompts
- D. Fine-tuning
- **Answer:** B

**202. Which is safest in prod?**
- A. Open-ended outputs
- B. Structured outputs
- C. High creativity
- D. No validation
- **Answer:** B

**203. Best debugging tool for GenAI?**
- A. UI logs
- B. Prompt + retrieval logs
- C. Token counter
- D. Training loss
- **Answer:** B

**204. What ensures trust?**
- A. Speed
- B. Citations
- C. Creativity
- D. Tokens
- **Answer:** B

**205. Which skill matters most long-term?**
- A. Prompting
- B. System design
- C. Token tricks
- D. UI
- **Answer:** B

**206. GenAI is best viewed as:**
- A. API call
- B. Probabilistic system
- C. Rule engine
- D. Database
- **Answer:** B

**207. Safe AI outputs require:**
- A. Larger models
- B. Constraints + validation
- C. Long prompts
- D. Creativity
- **Answer:** B

**208. Production readiness requires:**
- A. Prompt only
- B. Monitoring + evaluation
- C. Training
- D. Vision
- **Answer:** B

**209. What separates senior engineers?**
- A. Prompt length
- B. Tradeoff reasoning
- C. Model size
- D. Token speed
- **Answer:** B

**210. Final goal of GenAI systems:**
- A. Creativity
- B. Reliable value delivery
- C. Large outputs
- D. Complex prompts
- **Answer:** B

---

# Coding MCQs for GenAI & LLM Developers (1–100)

---

## Section 1: Python Fundamentals for GenAI (1–20)

### 1. What is the output?

```python
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))
print(add_item(2))
```

- A. `[1] [2]`
- B. `[1] [1,2]`
- C. `[1] [2]`
- D. `[1] [1]`
- **Answer:** B

---

### 2. Why does the above behavior occur?

- A. Python bug
- B. Lists are immutable
- C. Default arguments are evaluated once
- D. Function scope issue
- **Answer:** C

---

### 3. Correct fix for the above function?

A.

```python
def add_item(item, lst):
```

B.

```python
def add_item(item, lst=None):
    if lst is None:
        lst=[]
```

C.

```python
lst=[]
```

D.

```python
global lst
```

**Answer:** B

---

### 4. Output?

```python
x = [1, 2, 3]
y = x
y.append(4)
print(x)
```

- A. `[1,2,3]`
- B. `[4]`
- C. `[1,2,3,4]`
- D. Error
- **Answer:** C

---

### 5. Best way to copy list safely?

- A. `y = x`
- B. `y = x.copy()`
- C. `y = list(x)`
- D. Both B and C
- **Answer:** D

---

### 6. What does this do?

```python
[x*x for x in range(3)]
```

- A. `[0,1,2]`
- B. `[1,4,9]`
- C. `[0,1,4]`
- D. Error
- **Answer:** C

---

### 7. Generator vs list comprehension?

- A. Same memory
- B. Generator is lazy
- C. Generator faster always
- D. List is lazy
- **Answer:** B

---

### 8. Output?

```python
print(bool([]), bool({}), bool(""))
```

- A. `True True True`
- B. `False False False`
- C. `True False True`
- D. Error
- **Answer:** B

---

### 9. Time complexity of `dict.get(key)`?

- A. O(n)
- B. O(log n)
- C. O(1) average
- D. O(n log n)
- **Answer:** C

---

### 10. Why prefer dictionaries in RAG metadata?

- A. Ordered
- B. Fast lookup
- C. Low memory
- D. Immutable
- **Answer:** B

---

## Section 2: Async, Concurrency & APIs (21–40)

### 21. What is wrong?

```python
import asyncio

async def fetch():
    return "data"

result = fetch()
print(result)
```

- A. Nothing
- B. fetch not awaited
- C. Syntax error
- D. Runtime error
- **Answer:** B

---

### 22. Correct way?

- A. `fetch()`
- B. `await fetch()`
- C. `asyncio.run(fetch())`
- D. Both B and C
- **Answer:** D

---

### 23. Why async matters for LLM APIs?

- A. Lower cost
- B. Parallel requests
- C. Better prompts
- D. Larger context
- **Answer:** B

---

### 24. What does `await` do?

- A. Blocks thread
- B. Pauses coroutine
- C. Kills process
- D. Creates thread
- **Answer:** B

---

### 25. Which is true?

- A. Async = multithreading
- B. Async avoids I/O blocking
- C. Async uses GPU
- D. Async faster always
- **Answer:** B

---

### 26. What happens here?

```python
async def f():
    await asyncio.sleep(1)

asyncio.run(f())
```

- A. Error
- B. Sleeps 1 second
- C. Blocks CPU
- D. No-op
- **Answer:** B

---

### 27. Best approach for calling multiple LLM APIs?

- A. For loop
- B. Threads
- C. asyncio.gather
- D. multiprocessing
- **Answer:** C

---

### 28. What does timeout protect against?

- A. Slow models
- B. Hanging requests
- C. Token overflow
- D. Hallucinations
- **Answer:** B

---

### 29. Retry logic should avoid:

- A. Logging
- B. Infinite retries
- C. Backoff
- D. Error handling
- **Answer:** B

---

### 30. Exponential backoff helps with:

- A. Speed
- B. API rate limits
- C. Accuracy
- D. Token usage
- **Answer:** B

---

### 31. Best status code for LLM failure?

- A. 200
- B. 400
- C. 429
- D. 500
- **Answer:** D

---

### 32. 429 means:

- A. Bad request
- B. Unauthorized
- C. Rate limited
- D. Server crash
- **Answer:** C

---

### 33. API keys should be stored in:

- A. Git repo
- B. Source code
- C. Environment variables
- D. Frontend
- **Answer:** C

---

### 34. Why cache LLM responses?

- A. Creativity
- B. Reduce cost
- C. Increase randomness
- D. Better prompts
- **Answer:** B

---

### 35. Cache key should include:

- A. Model name
- B. Prompt hash
- C. Parameters
- D. All of the above
- **Answer:** D

---

### 36. What causes race conditions?

- A. Single thread
- B. Shared mutable state
- C. Async functions
- D. Logging
- **Answer:** B

---

### 37. Why prefer idempotent APIs?

- A. Faster
- B. Safer retries
- C. Lower cost
- D. Better UI
- **Answer:** B

---

### 38. Streaming responses help with:

- A. Accuracy
- B. Perceived latency
- C. Cost
- D. Security
- **Answer:** B

---

### 39. SSE is used for:

- A. File upload
- B. Streaming text
- C. Authentication
- D. Caching
- **Answer:** B

---

### 40. What breaks streaming?

- A. Long outputs
- B. Blocking I/O
- C. Async
- D. JSON
- **Answer:** B

---

## Section 3: Embeddings & RAG Code (41–70)

### 41. What is wrong?

```python
embeddings = []
for doc in docs:
    embeddings.append(embed(docs))
```

- A. Syntax error
- B. Wrong variable used
- C. Too slow
- D. Memory leak
- **Answer:** B

---

### 42. Correct fix?

- A. `embed(doc)`
- B. `embed(docs)`
- C. `embed()`
- D. `embed[i]`
- **Answer:** A

---

### 43. Why chunk documents before embedding?

- A. Faster DB
- B. Token limits
- C. Accuracy only
- D. Simpler code
- **Answer:** B

---

### 44. Chunk overlap helps avoid:

- A. Cost
- B. Context loss
- C. Latency
- D. Drift
- **Answer:** B

---

### 45. Vector search complexity optimized by:

- A. SQL
- B. ANN indexes
- C. Loops
- D. Recursion
- **Answer:** B

---

### 46. What is wrong?

```python
if score > 0.1:
    results.append(doc)
```

- A. Syntax
- B. Threshold too low
- C. Score undefined
- D. Nothing
- **Answer:** B

---

### 47. Why use metadata filtering?

- A. Speed
- B. Precision
- C. Memory
- D. Tokens
- **Answer:** B

---

### 48. Best practice for RAG prompt?

- A. Allow guessing
- B. Ground to context
- C. High temperature
- D. Long output
- **Answer:** B

---

### 49. What causes empty RAG answers?

- A. High temperature
- B. No retrieval
- C. Model bug
- D. JSON output
- **Answer:** B

---

### 50. Where should retrieval happen?

- A. After generation
- B. Before generation
- C. During streaming
- D. In frontend
- **Answer:** B

---

### 51. What is re-ranking code doing?

```python
results.sort(key=lambda x: x.score, reverse=True)
```

- A. Filtering
- B. Ranking
- C. Chunking
- D. Embedding
- **Answer:** B

---

### 52. Cross-encoders are:

- A. Fast
- B. Accurate
- C. Stateless
- D. Tokenizers
- **Answer:** B

---

### 53. What breaks RAG grounding?

- A. Strict prompts
- B. Model creativity
- C. Missing context
- D. Citations
- **Answer:** C

---

### 54. Best fallback if RAG fails?

- A. Guess
- B. Return safe response
- C. Retry forever
- D. Increase temperature
- **Answer:** B

---

### 55. Why cache embeddings?

- A. Accuracy
- B. Cost
- C. Creativity
- D. Speed only
- **Answer:** B

---

### 56. Embedding model change requires:

- A. Prompt update
- B. Re-embedding
- C. Fine-tuning
- D. Cache clear only
- **Answer:** B

---

### 57. What is retrieval recall?

- A. Latency
- B. Relevant docs found
- C. Token count
- D. UI speed
- **Answer:** B

---

### 58. Poor chunking leads to:

- A. Faster results
- B. Hallucinations
- C. Better recall
- D. Low cost
- **Answer:** B

---

### 59. Why log retrieval results?

- A. UI
- B. Debugging
- C. Training
- D. Caching
- **Answer:** B

---

### 60. Best RAG architecture is:

- A. Prompt-only
- B. Retrieval + generation
- C. Fine-tuning only
- D. Vision-only
- **Answer:** B

---

## Section 4: Agents, Safety & Production Code (61–100)

### 61. What makes an agent autonomous?

- A. Prompt
- B. Loop + tools
- C. Embeddings
- D. Cache
- **Answer:** B

---

### 62. Why validate tool inputs?

- A. Accuracy
- B. Security
- C. Speed
- D. Tokens
- **Answer:** B

---

### 63. What prevents infinite loops?

- A. Large models
- B. Step limits
- C. High temperature
- D. Streaming
- **Answer:** B

---

### 64. Why add human-in-the-loop?

- A. Speed
- B. Safety
- C. Tokens
- D. Cost
- **Answer:** B

---

### 65. Best way to test agents?

- A. Manual only
- B. Regression tests
- C. Training
- D. UI testing
- **Answer:** B

---

### 66. What is wrong?

```python
while True:
    agent.step()
```

- A. Syntax
- B. Infinite loop
- C. Async issue
- D. Token overflow
- **Answer:** B

---

### 67. What should agent logs include?

- A. Nothing
- B. Decisions & actions
- C. Weights
- D. Tokens only
- **Answer:** B

---

### 68. Best error handling?

- A. Crash
- B. Silent ignore
- C. Retry with fallback
- D. Ignore user
- **Answer:** C

---

### 69. Why use rate limiting?

- A. Creativity
- B. Abuse prevention
- C. Prompt control
- D. Memory
- **Answer:** B

---

### 70. Production LLM calls should always:

- A. Be creative
- B. Have timeouts
- C. Use large models
- D. Be synchronous
- **Answer:** B

---

### 71. Why structured outputs?

- A. UI
- B. Parsing safety
- C. Speed
- D. Tokens
- **Answer:** B

---

### 72. Best logging practice?

- A. Log everything
- B. Log inputs + outputs safely
- C. Log nothing
- D. Log prompts only
- **Answer:** B

---

### 73. What causes hallucinations in agents?

- A. Tools
- B. Missing constraints
- C. Async
- D. Cache
- **Answer:** B

---

### 74. Fallback strategy should:

- A. Retry forever
- B. Fail safely
- C. Ignore error
- D. Increase creativity
- **Answer:** B

---

### 75. Why batch requests?

- A. Creativity
- B. Throughput
- C. Hallucinations
- D. Prompt length
- **Answer:** B

---

### 76. What is idempotency?

- A. Speed
- B. Same result on retries
- C. Token reuse
- D. Prompt caching
- **Answer:** B

---

### 77. Which is unsafe?

- A. Input validation
- B. Output filtering
- C. Open-ended execution
- D. Logging
- **Answer:** C

---

### 78. What helps observability?

- A. UI only
- B. Traces + metrics
- C. Prompts only
- D. Training logs
- **Answer:** B

---

### 79. What matters most in prod?

- A. Model size
- B. Reliability
- C. Prompt length
- D. Creativity
- **Answer:** B

---

### 80. GenAI systems should be treated as:

- A. Deterministic
- B. Probabilistic systems
- C. Databases
- D. Rule engines
- **Answer:** B

---

# Coding MCQs – GenAI / LLM / RAG / Agents

## Part 2 (81–160)

---

## Section 5: Python Pitfalls & Edge Cases (81–100)

### 81. What is the output?

```python
a = [1, 2, 3]
b = a[:]
b.append(4)
print(a, b)
```

- A. `[1,2,3] [1,2,3]`
- B. `[1,2,3,4] [1,2,3,4]`
- C. `[1,2,3] [1,2,3,4]`
- D. Error
- **Answer:** C

---

### 82. Why does slicing behave differently than assignment?

- A. Slicing is faster
- B. Slicing creates a shallow copy
- C. Assignment creates deep copy
- D. Python optimization
- **Answer:** B

---

### 83. What is wrong?

```python
def log(msg, logs=[]):
    logs.append(msg)
    return logs
```

- A. Syntax error
- B. Memory leak
- C. Mutable default argument
- D. Scope error
- **Answer:** C

---

### 84. Correct fix?

A.

```python
logs = []
```

B.

```python
def log(msg, logs=None):
    if logs is None:
        logs=[]
```

C.

```python
global logs
```

D.

```python
del logs
```

**Answer:** B

---

### 85. Output?

```python
x = (1, 2, [3])
x[2].append(4)
print(x)
```

- A. Error
- B. `(1,2,[3])`
- C. `(1,2,[3,4])`
- D. `(1,2,3,4)`
- **Answer:** C

---

### 86. Why is this allowed?

- A. Tuples are mutable
- B. List inside tuple is mutable
- C. Python bug
- D. Copy-on-write
- **Answer:** B

---

### 87. What is the output?

```python
print({i: i*i for i in range(3)})
```

- A. `{0,1,4}`
- B. `{0:0,1:1,2:4}`
- C. `[0,1,4]`
- D. Error
- **Answer:** B

---

### 88. Which structure is best for RAG metadata?

- A. List
- B. Tuple
- C. Dictionary
- D. Set
- **Answer:** C

---

### 89. What does this return?

```python
any([0, "", None, 5])
```

- A. False
- B. True
- C. Error
- D. None
- **Answer:** B

---

### 90. Why is `any()` useful in validation?

- A. Speed
- B. Early exit
- C. Token reduction
- D. Caching
- **Answer:** B

---

### 91. What is wrong?

```python
if response == None:
    handle()
```

- A. Syntax
- B. Logic
- C. Style – should use `is None`
- D. Performance
- **Answer:** C

---

### 92. Why prefer `is None`?

- A. Faster
- B. Clearer identity check
- C. Less memory
- D. Avoids exceptions
- **Answer:** B

---

### 93. Output?

```python
print("rag" * 3)
```

- A. `rag3`
- B. `ragragrag`
- C. Error
- D. `[rag,rag,rag]`
- **Answer:** B

---

### 94. What causes this bug?

```python
for i in range(3):
    funcs.append(lambda: i)
```

- A. Late binding
- B. Syntax error
- C. Scope error
- D. Async issue
- **Answer:** A

---

### 95. Correct fix?

A.

```python
lambda i=i: i
```

B.

```python
lambda: i.copy()
```

C.

```python
lambda(): i
```

D.

```python
global i
```

**Answer:** A

---

### 96. Why is this important for agents?

- A. UI bugs
- B. Loop correctness
- C. Tool invocation correctness
- D. Token limits
- **Answer:** C

---

### 97. What does `zip()` do?

- A. Compress files
- B. Combine iterables
- C. Sort lists
- D. Flatten lists
- **Answer:** B

---

### 98. What happens?

```python
list(zip([1,2], ['a']))
```

- A. Error
- B. `[(1,'a')]`
- C. `[(1,'a'),(2,None)]`
- D. `[('a',1)]`
- **Answer:** B

---

### 99. Why is this relevant for batching?

- A. Avoids overflow
- B. Aligns inputs
- C. Faster loops
- D. Async only
- **Answer:** B

---

### 100. Best way to handle optional args?

- A. Default mutable
- B. `None` + check
- C. Global variables
- D. Try/except
- **Answer:** B

---

## Section 6: Async, Concurrency & Streaming Bugs (101–120)

### 101. What is wrong?

```python
async def call():
    time.sleep(1)
```

- A. Syntax
- B. Blocking call in async
- C. Await missing
- D. Nothing
- **Answer:** B

---

### 102. Correct fix?

- A. `await time.sleep()`
- B. `await asyncio.sleep()`
- C. `sleep.async()`
- D. `async time.sleep()`
- **Answer:** B

---

### 103. Why is this dangerous in prod?

- A. Cost
- B. Blocks event loop
- C. Token overflow
- D. Memory leak
- **Answer:** B

---

### 104. What does `asyncio.gather()` do?

- A. Sequential calls
- B. Parallel coroutines
- C. Thread creation
- D. Process fork
- **Answer:** B

---

### 105. What happens if one task fails in `gather()`?

- A. Others ignored
- B. All cancelled (default)
- C. Silent pass
- D. Cached
- **Answer:** B

---

### 106. Best practice?

- A. Ignore exceptions
- B. `return_exceptions=True`
- C. Try/except outside
- D. Disable async
- **Answer:** B

---

### 107. Streaming LLM responses improve:

- A. Accuracy
- B. UX latency
- C. Cost
- D. Memory
- **Answer:** B

---

### 108. What breaks streaming?

- A. Long outputs
- B. Blocking sync code
- C. JSON formatting
- D. Temperature
- **Answer:** B

---

### 109. What is SSE?

- A. Secure Storage Engine
- B. Server-Sent Events
- C. Streaming SQL Engine
- D. Simple Sync Execution
- **Answer:** B

---

### 110. Streaming requires responses to be:

- A. Buffered fully
- B. Chunked
- C. Cached
- D. Embedded
- **Answer:** B

---

### 111. What causes race conditions?

- A. Async functions
- B. Shared mutable state
- C. Streaming
- D. Prompts
- **Answer:** B

---

### 112. How to avoid race conditions?

- A. Locks
- B. Immutable data
- C. Single-thread execution
- D. All of the above
- **Answer:** D

---

### 113. What is idempotency?

- A. Same request, same result
- B. Faster execution
- C. Lower cost
- D. Token reuse
- **Answer:** A

---

### 114. Why important for retries?

- A. UX
- B. Safety
- C. Performance
- D. Training
- **Answer:** B

---

### 115. What should timeout protect against?

- A. Creativity
- B. Hanging calls
- C. Token overflow
- D. Prompt injection
- **Answer:** B

---

### 116. Exponential backoff avoids:

- A. Latency
- B. Thundering herd
- C. Errors
- D. Tokens
- **Answer:** B

---

### 117. Which is unsafe?

- A. Retry with backoff
- B. Infinite retries
- C. Logging
- D. Circuit breaker
- **Answer:** B

---

### 118. Circuit breaker pattern prevents:

- A. Model drift
- B. Cascading failures
- C. Prompt injection
- D. Token overflow
- **Answer:** B

---

### 119. Best retry strategy?

- A. Fixed delay
- B. Exponential + jitter
- C. Immediate retry
- D. No retry
- **Answer:** B

---

### 120. Async code improves:

- A. CPU tasks
- B. I/O-bound tasks
- C. Training
- D. Prompting
- **Answer:** B

---

## Section 7: RAG & Embeddings Code Failures (121–140)

### 121. What is wrong?

```python
for doc in docs:
    embed(docs)
```

- A. Syntax
- B. Wrong variable
- C. Too slow
- D. Memory leak
- **Answer:** B

---

### 122. Why chunk before embedding?

- A. Faster model
- B. Context limits
- C. Better prompts
- D. UI
- **Answer:** B

---

### 123. Chunk overlap prevents:

- A. Cost
- B. Context loss
- C. Latency
- D. Drift
- **Answer:** B

---

### 124. What causes empty RAG answers?

- A. High temperature
- B. No retrieved docs
- C. Long prompts
- D. JSON output
- **Answer:** B

---

### 125. What breaks grounding?

- A. Strict prompt
- B. Missing context
- C. Low temperature
- D. Metadata
- **Answer:** B

---

### 126. Best practice for RAG prompts?

- A. Allow guessing
- B. Use “answer only from context”
- C. High creativity
- D. No system prompt
- **Answer:** B

---

### 127. Re-ranking is applied:

- A. Before retrieval
- B. After retrieval
- C. During ingestion
- D. In UI
- **Answer:** B

---

### 128. Cross-encoders are:

- A. Fast
- B. Accurate
- C. Stateless
- D. Cheap
- **Answer:** B

---

### 129. What improves precision most?

- A. Bigger model
- B. Better retrieval
- C. Longer prompts
- D. Higher temperature
- **Answer:** B

---

### 130. Best fallback if RAG fails?

- A. Guess
- B. Safe refusal
- C. Retry forever
- D. Increase temperature
- **Answer:** B

---

### 131. What is retrieval recall?

- A. Speed
- B. Relevant docs found
- C. Token usage
- D. UI
- **Answer:** B

---

### 132. Embedding drift occurs when:

- A. Prompt changes
- B. Model changes
- C. Data grows
- D. Tokens increase
- **Answer:** B

---

### 133. Fix embedding drift by:

- A. Caching
- B. Re-embedding
- C. Prompt rewrite
- D. Fine-tuning
- **Answer:** B

---

### 134. Metadata filtering helps:

- A. Cost
- B. Precision
- C. Latency
- D. Tokens
- **Answer:** B

---

### 135. What logs are critical for RAG?

- A. UI logs
- B. Retrieval logs
- C. Token logs
- D. Model logs
- **Answer:** B

---

### 136. What causes context stuffing?

- A. Too many chunks
- B. Short prompts
- C. Low temperature
- D. Metadata
- **Answer:** A

---

### 137. Best way to reduce context?

- A. Remove all chunks
- B. Summarize
- C. Increase model size
- D. Remove system prompt
- **Answer:** B

---

### 138. Map-reduce summarization is for:

- A. Short docs
- B. Long docs
- C. Images
- D. Audio
- **Answer:** B

---

### 139. RAG evaluation should measure:

- A. Creativity
- B. Faithfulness
- C. Speed only
- D. Tokens
- **Answer:** B

---

### 140. Production RAG requires:

- A. Prompt only
- B. Monitoring
- C. Fine-tuning
- D. Vision
- **Answer:** B

---

## Section 8: Agents, Safety & System Code (141–160)

### 141. What causes agent infinite loops?

- A. Async
- B. Missing stop condition
- C. Tools
- D. Prompts
- **Answer:** B

---

### 142. Best loop guard?

- A. High temperature
- B. Step counter
- C. Bigger model
- D. Streaming
- **Answer:** B

---

### 143. Why validate tool inputs?

- A. Speed
- B. Security
- C. Tokens
- D. Accuracy only
- **Answer:** B

---

### 144. Human-in-the-loop is used for:

- A. Latency
- B. Risk control
- C. Training
- D. Memory
- **Answer:** B

---

### 145. Self-reflection helps agents:

- A. Loop faster
- B. Improve outputs
- C. Reduce cost
- D. Cache responses
- **Answer:** B

---

### 146. What should agents log?

- A. Nothing
- B. Actions & decisions
- C. Weights
- D. Tokens only
- **Answer:** B

---

### 147. What is unsafe?

- A. Tool whitelisting
- B. Arbitrary code execution
- C. Rate limiting
- D. Validation
- **Answer:** B

---

### 148. Best agent error handling?

- A. Crash
- B. Silent ignore
- C. Retry with fallback
- D. Increase creativity
- **Answer:** C

---

### 149. Why rate limiting?

- A. UI
- B. Abuse prevention
- C. Prompting
- D. Memory
- **Answer:** B

---

### 150. Agents should be treated as:

- A. Deterministic
- B. Probabilistic systems
- C. Databases
- D. Rule engines
- **Answer:** B

---

### 151. What improves observability?

- A. UI only
- B. Traces + metrics
- C. Prompts only
- D. Training logs
- **Answer:** B

---

### 152. What causes hallucinations?

- A. Tools
- B. Missing constraints
- C. Async
- D. Cache
- **Answer:** B

---

### 153. Best production practice?

- A. Bigger models
- B. Strict constraints
- C. Creative prompts
- D. No validation
- **Answer:** B

---

### 154. Fallback strategy should:

- A. Guess
- B. Fail safely
- C. Retry forever
- D. Ignore error
- **Answer:** B

---

### 155. Batching requests improves:

- A. Accuracy
- B. Throughput
- C. Creativity
- D. Safety
- **Answer:** B

---

### 156. Caching reduces:

- A. Accuracy
- B. Cost
- C. Safety
- D. Memory
- **Answer:** B

---

### 157. What separates senior engineers?

- A. Prompt tricks
- B. System thinking
- C. Token math
- D. UI design
- **Answer:** B

---

### 158. GenAI systems must handle:

- A. Only success
- B. Failures gracefully
- C. Training
- D. Vision
- **Answer:** B

---

### 159. Most common production mistake?

- A. Using RAG
- B. Skipping evaluation
- C. Using async
- D. Logging
- **Answer:** B

---

### 160. GenAI code should be written assuming:

- A. Perfect outputs
- B. Probabilistic behavior
- C. Determinism
- D. Rule-based logic
- **Answer:** B
