# GenAI Questions & Answers

## Part 1: Fundamentals & Prompt Engineering (1–50)

---

### Section 1: Generative AI Fundamentals (1–20)

#### 1. What is Generative AI?
Generative AI refers to models that can **create new content** such as text, images, audio, or code instead of just classifying or predicting labels. These models learn patterns from large datasets and generate outputs that statistically resemble the training data.

---

#### 2. How is Generative AI different from traditional machine learning?
Traditional ML focuses on prediction or classification (for example, spam vs not spam). Generative AI focuses on **content creation**, meaning it produces new outputs rather than selecting from predefined labels.

---

#### 3. What is an LLM?
A Large Language Model (LLM) is a neural network trained on massive text data to **predict the next token** in a sequence. Over time, this ability enables it to generate coherent language, follow instructions, and simulate reasoning.

---

#### 4. Why are LLMs called “large”?
They are called large because they have **billions of parameters**, are trained on **terabytes of data**, and require significant compute resources to train and run.

---

#### 5. What does “next token prediction” mean?
The model predicts the most likely next token based on previous tokens. Everything an LLM does—writing essays, answering questions, coding—is ultimately built on this simple mechanism.

---

#### 6. Are LLMs deterministic?
Not by default. LLMs use probabilistic sampling. However, they can be made mostly deterministic by setting parameters like **temperature to zero**.

---

#### 7. What is temperature in LLMs?
Temperature controls randomness in output generation.

* Low temperature → safer, more deterministic
* High temperature → more creative, more variation

---

#### 8. What is top-p (nucleus sampling)?
Top-p limits token selection to a subset whose cumulative probability is ≥ p. This balances creativity and coherence better than unrestricted sampling.

---

#### 9. What is top-k sampling?
Top-k restricts token selection to the top k most probable tokens. It prevents extremely unlikely tokens from being chosen.

---

#### 10. Why do LLMs hallucinate?
Because LLMs generate text based on probability, not factual verification. If the model lacks knowledge or context, it may confidently generate incorrect information.

---

#### 11. Can LLMs truly reason?
LLMs **simulate reasoning patterns** learned from data. They do not reason like humans but can produce reasoning-like outputs that are often useful.

---

#### 12. What is a token?
A token is a unit of text used by the model. It can be a word, part of a word, or punctuation. Tokenization varies by model.

---

#### 13. Why do tokens matter?
Tokens directly affect:

* Cost
* Latency
* Context window size
* Prompt truncation

---

#### 14. What is a context window?
The maximum number of tokens a model can process at one time, including system prompts, user messages, memory, and responses.

---

#### 15. What happens if context exceeds the limit?
Older tokens are truncated or ignored, which can cause loss of important instructions or memory.

---

#### 16. What is inference?
Inference is the process of generating outputs from a trained model using prompts and parameters.

---

#### 17. Is Generative AI supervised or unsupervised?
Pretraining is **self-supervised** (predict next token). Fine-tuning is typically **supervised** using instruction-response datasets.

---

#### 18. What is a foundation model?
A foundation model is a general-purpose pretrained model that can be adapted to many downstream tasks through prompting or fine-tuning.

---

#### 19. Are LLMs stateful?
No. LLMs are stateless. They only “remember” what is explicitly included in the prompt or retrieved via memory systems.

---

#### 20. How do you give an LLM memory?
By explicitly passing memory into the prompt using:

* Conversation history
* Summaries
* Embedding-based retrieval

---

### Section 2: Prompt Engineering (21–50)

#### 21. What is prompt engineering?
Prompt engineering is the practice of designing structured inputs to **control model behavior**, improve accuracy, and reduce hallucinations.

---

#### 22. What is a system prompt?
A system prompt defines the model’s role, behavior, and constraints. It has the highest priority in the prompt hierarchy.

---

#### 23. Why is the system prompt important?
Because it governs how the model behaves regardless of user input, making it critical for safety, tone, and correctness.

---

#### 24. What is few-shot prompting?
Few-shot prompting provides example inputs and outputs to guide the model toward the desired behavior.

---

#### 25. Zero-shot vs few-shot prompting?
Zero-shot relies only on instructions. Few-shot includes examples and usually produces more consistent results.

---

#### 26. What is instruction prompting?
Explicitly telling the model what task to perform, constraints to follow, and how to format the output.

---

#### 27. What is structured output prompting?
Forcing the model to respond in a defined structure like JSON or YAML to make outputs machine-readable.

---

#### 28. Why are JSON outputs preferred?
They reduce ambiguity, simplify parsing, and are safer for production systems.

---

#### 29. What is prompt injection?
When malicious user input attempts to override system instructions or manipulate the model’s behavior.

---

#### 30. How do you prevent prompt injection?
By using strong system prompts, input validation, output filtering, and strict separation of user input from instructions.

---

#### 31. What is chain-of-thought?
Intermediate reasoning steps generated by the model to arrive at an answer.

---

#### 32. Why is chain-of-thought often hidden?
To avoid exposing sensitive reasoning, reduce hallucinations, and prevent misuse.

---

#### 33. What is self-consistency prompting?
Generating multiple responses and selecting the most consistent or common answer.

---

#### 34. What is role prompting?
Assigning the model a role (e.g., “You are a doctor”) to influence tone and reasoning style.

---

#### 35. Does role prompting always work?
No. It improves alignment but does not guarantee correctness.

---

#### 36. What is a prompt template?
A reusable prompt structure with placeholders for dynamic content.

---

#### 37. How do prompts reduce hallucinations?
By limiting scope, enforcing grounding, and allowing the model to say “I don’t know”.

---

#### 38. What is prompt versioning?
Tracking prompt changes over time to detect regressions and improvements.

---

#### 39. Prompting vs fine-tuning?
Prompting changes behavior at runtime. Fine-tuning permanently changes model weights.

---

#### 40. When should you fine-tune instead of prompt?
When behavior must be consistent, domain-specific, and repeatedly reused.

---

#### 41. What does temperature = 0 do?
It makes outputs mostly deterministic and repeatable.

---

#### 42. What is a stop sequence?
A token pattern that tells the model when to stop generating text.

---

#### 43. Why do models give long answers?
Vague prompts, high temperature, or lack of output constraints.

---

#### 44. What is instruction hierarchy?
System > developer > user instructions.

---

#### 45. Can users override system prompts?
No, if the system prompt is enforced correctly.

---

#### 46. What is prompt leakage?
When the model reveals system or internal instructions.

---

#### 47. How do you prevent prompt leakage?
Explicitly instruct the model not to reveal prompts and validate outputs.

---

#### 48. What is hallucination-aware prompting?
Prompting the model to admit uncertainty instead of guessing.

---

#### 49. What is response grounding?
Forcing answers to rely only on provided context or sources.

---

#### 50. What is prompt chaining?
Breaking a task into multiple sequential prompts for better control.

---

## Part 2: Conversation, Memory, Embeddings & Vector Search (51–120)

---

### Section 3: Conversation & Memory (51–80)

#### 51. Are LLMs conversational by default?
No. LLMs are stateless. Conversation behavior is simulated by **passing previous messages** back into the prompt on each request.

---

#### 52. What is a conversation buffer?
A conversation buffer is the stored history of messages (system, user, assistant) that is sent with each new request to maintain continuity.

---

#### 53. What is sliding window memory?
A strategy where only the **last N messages or tokens** are kept in context to stay within the context window limit.

---

#### 54. Why do we prune conversation history?
To prevent context overflow, reduce cost, improve latency, and avoid irrelevant or outdated information influencing responses.

---

#### 55. What is short-term memory in GenAI systems?
Short-term memory is **session-scoped context**, such as recent messages or temporary preferences, usually stored in memory or cache.

---

#### 56. What is long-term memory?
Long-term memory is **persisted knowledge** across sessions, often implemented using embeddings and vector databases.

---

#### 57. How is long-term memory implemented?
By embedding memories, storing them in a vector database, and retrieving relevant ones based on similarity to the current query.

---

#### 58. What is memory injection?
The process of **retrieving relevant memory** and injecting it into the prompt before the user query.

---

#### 59. Memory vs RAG?
Memory focuses on **user-specific or conversational context**, while RAG focuses on **external knowledge sources** like documents or databases.

---

#### 60. What causes memory drift?
Accumulating outdated, irrelevant, or incorrect memories without pruning or validation.

---

#### 61. How do you expire memory?
Using TTL (time-to-live), relevance scoring, usage frequency, or manual cleanup strategies.

---

#### 62. Can memory hallucinate?
Yes. If incorrect or unverified information is stored as memory, the model will treat it as truth later.

---

#### 63. What is persona memory?
Memory scoped to a specific role or assistant persona, ensuring separation between different AI behaviors.

---

#### 64. What is global memory?
Memory shared across personas or sessions, typically containing stable user preferences or facts.

---

#### 65. What is memory poisoning?
When a user intentionally or unintentionally injects false information into memory to manipulate future responses.

---

#### 66. How do you prevent memory poisoning?
By validating memory before storing it, requiring confirmation, and separating facts from user opinions.

---

#### 67. What is memory summarization?
Compressing long conversations or memories into concise summaries to save tokens.

---

#### 68. Why summarize memory?
To reduce token usage, improve retrieval relevance, and keep context focused.

---

#### 69. What is episodic memory?
Memory of specific events or interactions, such as “user asked for help debugging React code.”

---

#### 70. What is working memory?
The active context the model uses during reasoning, usually composed of the prompt, recent messages, and injected memory.

---

#### 71. Do LLMs forget automatically?
No. Forgetting must be explicitly implemented by clearing or pruning memory.

---

#### 72. What is context injection order?
Typically: system prompt → memory → conversation history → user input.

---

#### 73. What is conversation reset?
Clearing conversation history and memory to start fresh.

---

#### 74. When should conversations be reset?
When topic changes drastically, context becomes polluted, or errors accumulate.

---

#### 75. What is memory relevance scoring?
Ranking memories based on similarity and usefulness before injecting them into the prompt.

---

#### 76. What is memory grounding?
Validating retrieved memory against trusted sources or context before using it.

---

#### 77. Can memory conflict with system prompts?
Yes. System prompts should always override memory to maintain safety and control.

---

#### 78. What is memory compression risk?
Loss of nuance or important details during summarization.

---

#### 79. What is the best memory strategy?
A hybrid approach: short-term buffer + long-term vector memory + periodic summarization.

---

#### 80. Is memory always necessary?
No, but it is critical for assistants, personalization, and multi-step tasks.

---

### Section 4: Embeddings & Vector Search (81–120)

#### 81. What are embeddings?
Embeddings are numerical vector representations of text that capture semantic meaning.

---

#### 82. Why use embeddings instead of keywords?
Embeddings capture **meaning**, not exact words, enabling semantic search and similarity matching.

---

#### 83. What is cosine similarity?
A metric that measures the angle between two vectors to determine similarity, independent of magnitude.

---

#### 84. Why is cosine similarity preferred for text?
Because text embeddings vary in magnitude, and cosine similarity focuses on direction (meaning).

---

#### 85. What is a vector database?
A database optimized for storing and searching high-dimensional vectors efficiently.

---

#### 86. Examples of vector databases?
FAISS, Pinecone, Weaviate, Milvus, Qdrant.

---

#### 87. What is vector indexing?
Techniques used to speed up similarity search, such as HNSW or IVF indexes.

---

#### 88. What is approximate nearest neighbor (ANN) search?
A fast search technique that trades slight accuracy loss for performance.

---

#### 89. Recall vs precision?
Recall measures how many relevant items were found. Precision measures how accurate the results are.

---

#### 90. What is document chunking?
Splitting large documents into smaller pieces before embedding.

---

#### 91. Ideal chunk size?
Typically 200–1000 tokens, depending on model and content structure.

---

#### 92. What is chunk overlap?
Shared content between adjacent chunks to preserve context continuity.

---

#### 93. Why is overlap important?
To prevent important information from being split across chunks and lost during retrieval.

---

#### 94. What is metadata in embeddings?
Additional information such as document ID, page number, section title, or timestamp.

---

#### 95. Why is metadata important?
It enables filtering, attribution, and better control over retrieval results.

---

#### 96. What is embedding drift?
When embeddings change due to model upgrades, making old embeddings incompatible.

---

#### 97. How do you handle embedding drift?
By re-embedding documents using the updated model.

---

#### 98. What is hybrid search?
Combining keyword-based search (BM25) with vector-based semantic search.

---

#### 99. Why is hybrid search effective?
It balances semantic understanding with exact keyword matching.

---

#### 100. What is re-ranking?
Reordering retrieved results using a more accurate but slower model.

---

#### 101. What is a cross-encoder?
A model that scores query-document pairs together for high accuracy.

---

#### 102. Cross-encoder vs bi-encoder?
Cross-encoders are more accurate but slower; bi-encoders are faster but less precise.

---

#### 103. What is similarity thresholding?
Discarding results below a certain similarity score to reduce noise.

---

#### 104. What is embedding normalization?
Scaling vectors to unit length to improve similarity calculations.

---

#### 105. What is vector dimensionality?
The number of dimensions in an embedding vector, often 384–3072.

---

#### 106. Does higher dimensionality mean better embeddings?
Not always. Higher dimensions increase cost and complexity without guaranteed gains.

---

#### 107. What is the cold start problem?
Lack of data or embeddings when a system is first deployed.

---

#### 108. Can embeddings leak sensitive data?
Yes. Embeddings may encode sensitive information implicitly.

---

#### 109. How do you secure embeddings?
By encrypting storage, restricting access, and avoiding sensitive content ingestion.

---

#### 110. Can embeddings hallucinate?
No. Embeddings retrieve data; hallucination happens during generation.

---

#### 111. What causes poor retrieval?
Bad chunking, weak embeddings, poor queries, or missing metadata.

---

#### 112. What is query embedding?
Embedding the user query to compare it with stored document embeddings.

---

#### 113. Should queries be rewritten?
Yes. Query rewriting often improves retrieval quality significantly.

---

#### 114. What is embedding caching?
Storing embeddings to avoid recomputation and reduce cost.

---

#### 115. When should documents be re-embedded?
When content changes or the embedding model is updated.

---

#### 116. What is vector compression?
Reducing vector size to save memory and improve performance.

---

#### 117. What is semantic clustering?
Grouping similar embeddings to discover patterns or topics.

---

#### 118. Embeddings vs fine-tuning?
Embeddings handle retrieval; fine-tuning changes model behavior.

---

#### 119. How are embeddings used in memory systems?
To retrieve relevant long-term memories based on semantic similarity.

---

#### 120. Are embeddings deterministic?
Yes, given the same model and input, embeddings are deterministic.

---

## Part 3: RAG, Agents, Safety & Evaluation (121–180)

---

### Section 5: Retrieval-Augmented Generation (RAG) (121–150)

#### 121. What is Retrieval-Augmented Generation (RAG)?
RAG is an architecture that combines **information retrieval** with **LLM generation**. Instead of relying only on the model’s internal knowledge, it retrieves relevant external documents and uses them as context for generation.

---

#### 122. Why is RAG important?
RAG reduces hallucinations, improves factual accuracy, and allows systems to answer questions using **up-to-date or private data** without retraining the model.

---

#### 123. What are the main steps in a RAG pipeline?
Ingest documents → chunk → embed → store in vector DB → retrieve relevant chunks → inject into prompt → generate answer.

---

#### 124. What does “grounding” mean in RAG?
Grounding means forcing the model to answer **only using retrieved context**, not its internal knowledge or assumptions.

---

#### 125. Why should RAG answers include citations?
Citations increase trust, allow verification, and help debug retrieval or hallucination issues.

---

#### 126. What causes hallucinations in RAG systems?
Poor retrieval, irrelevant chunks, insufficient context, or prompts that allow the model to speculate beyond provided data.

---

#### 127. What is context stuffing?
Injecting too much or irrelevant context into the prompt, which confuses the model and degrades answer quality.

---

#### 128. How do you optimize RAG context?
By filtering chunks, re-ranking results, summarizing long documents, and enforcing strict grounding instructions.

---

#### 129. What is multi-source RAG?
A RAG system that retrieves context from multiple sources such as PDFs, APIs, databases, and web services.

---

#### 130. What is query rewriting in RAG?
Using an LLM to rewrite user queries into clearer or more search-friendly forms before retrieval.

---

#### 131. What is map-reduce summarization?
Summarizing chunks individually (map) and then combining them into a final summary (reduce).

---

#### 132. Long-context models vs RAG?
Long-context models increase token limits, but RAG scales better, is cheaper, and keeps knowledge modular and updateable.

---

#### 133. When should you NOT use RAG?
For general knowledge questions that the model already answers well or when latency must be extremely low.

---

#### 134. What is retrieval recall in RAG?
How many relevant documents are successfully retrieved for a query.

---

#### 135. What is answer faithfulness?
How closely the generated answer matches the retrieved context without adding unsupported information.

---

#### 136. How do you evaluate RAG quality?
Using golden question sets, measuring retrieval recall, answer faithfulness, citation correctness, and user feedback.

---

#### 137. What is retrieval latency?
The time taken to fetch relevant context from storage before generation.

---

#### 138. How do you reduce RAG latency?
Use approximate nearest neighbor search, caching, smaller embeddings, and precomputed indexes.

---

#### 139. What is document freshness?
Ensuring retrieved documents reflect the most recent data available.

---

#### 140. What happens if RAG data becomes outdated?
The system may give factually incorrect answers even though it is technically grounded.

---

#### 141. Can RAG replace fine-tuning?
Often yes. RAG is preferred when knowledge changes frequently or must remain external.

---

#### 142. Can RAG introduce security risks?
Yes. If documents are poisoned or malicious, the model can generate unsafe outputs.

---

#### 143. How do you sanitize RAG inputs?
Validate documents, remove unsafe content, enforce strict output rules, and monitor retrieval logs.

---

#### 144. What is adaptive RAG?
A system that dynamically adjusts retrieval strategies based on query type or confidence.

---

#### 145. What is retrieval routing?
Selecting different data sources or retrieval pipelines depending on the query intent.

---

#### 146. What is hybrid RAG?
Combining keyword search, vector search, and re-ranking for higher retrieval accuracy.

---

#### 147. What is RAG caching?
Storing retrieval results or final answers to reduce repeated computation.

---

#### 148. What is citation hallucination?
When the model invents sources or references that were not retrieved.

---

#### 149. How do you prevent citation hallucination?
Force citations to be selected only from retrieved document IDs and validate references.

---

#### 150. When is a RAG system production-ready?
When it has monitoring, evaluation pipelines, fallback strategies, and security controls.

---

### Section 6: Agents, Safety & Evaluation (151–180)

---

#### 151. What is an AI agent?
An AI agent is an LLM combined with **tools, memory, and goals**, capable of making decisions and taking actions.

---

#### 152. Planner vs executor agent?
The planner decides what steps to take, while the executor performs those steps using tools or APIs.

---

#### 153. What is tool calling?
Allowing an LLM to call predefined functions with structured inputs.

---

#### 154. Why is tool input validation critical?
To prevent incorrect execution, security vulnerabilities, and unintended side effects.

---

#### 155. What is an agent loop?
A cycle of plan → act → observe → reflect → repeat until the goal is achieved.

---

#### 156. What is an autonomous agent?
An agent that operates without continuous human input, guided by goals and constraints.

---

#### 157. Why are guardrails needed for agents?
To prevent unsafe actions, runaway loops, or unauthorized operations.

---

#### 158. What is human-in-the-loop?
A design where humans approve or intervene in critical agent decisions.

---

#### 159. What is agent self-reflection?
When an agent evaluates its own output and attempts to improve it before finalizing.

---

#### 160. What is a multi-agent system?
A system where multiple specialized agents collaborate, each handling part of a task.

---

#### 161. Agent vs workflow?
Agents reason dynamically; workflows follow predefined, deterministic steps.

---

#### 162. When should agents NOT be used?
For simple, predictable tasks that can be solved with fixed logic.

---

#### 163. What is hallucination detection?
Techniques used to identify incorrect or unsupported model outputs.

---

#### 164. What is confidence scoring?
Assigning a confidence level to model outputs based on consistency or verification checks.

---

#### 165. What is regression testing for LLMs?
Testing prompts and outputs over time to detect behavior drift after changes.

---

#### 166. What is prompt regression?
When changes to prompts unintentionally degrade model performance.

---

#### 167. What is model regression?
When updating the model changes outputs in undesired ways.

---

#### 168. How do you monitor LLM systems?
Through logging, metrics, evaluation pipelines, and user feedback loops.

---

#### 169. What is observability in GenAI?
The ability to understand why a model produced a specific output in production.

---

#### 170. What is a fallback strategy?
Alternative behavior when the primary AI flow fails, such as returning a safe response or escalating to a human.

---

#### 171. What is retry logic?
Automatically retrying failed requests due to transient errors.

---

#### 172. What is rate limiting?
Restricting request frequency to prevent abuse and control costs.

---

#### 173. How do you secure API keys?
Using secret managers, environment variables, and strict access controls.

---

#### 174. What is cost optimization in GenAI?
Reducing token usage, caching results, batching requests, and choosing appropriate models.

---

#### 175. What is batching?
Processing multiple requests together to improve throughput and reduce cost.

---

#### 176. What is caching in LLM systems?
Storing previous responses or retrieval results to reuse them.

---

#### 177. What is fine-tuning?
Training a model on task-specific data to permanently adjust its behavior.

---

#### 178. When should you fine-tune an LLM?
When consistent behavior is required across many prompts and prompting alone is insufficient.

---

#### 179. LoRA vs full fine-tuning?
LoRA is cheaper and faster; full fine-tuning offers more flexibility but costs more.

---

#### 180. What is responsible AI?
Building AI systems that are safe, reliable, transparent, and aligned with human values.

---

## Part 4: Vision, Diffusion, Multimodal & System Design (181–220)

---

### Section 7: Computer Vision & Vision + LLM (181–200)

#### 181. What is computer vision?
Computer vision enables machines to **understand and interpret images or videos**. Instead of text tokens, inputs are pixel values transformed into tensors and learned representations.

---

#### 182. How is computer vision different from NLP?
Vision works with **spatial data (pixels)**, while NLP works with **sequential text tokens**. Vision models focus on patterns like edges, shapes, and objects rather than language structure.

---

#### 183. What is an image represented as in ML?
An image is represented as a **tensor** with dimensions corresponding to height, width, and color channels (RGB).

---

#### 184. What is object detection?
Object detection identifies **what objects are present and where they are located** using bounding boxes and class labels.

---

#### 185. What is YOLO?
YOLO (You Only Look Once) is a real-time object detection model that predicts bounding boxes and classes in a **single forward pass**, making it extremely fast.

---

#### 186. What is IOU (Intersection over Union)?
IOU measures how much two bounding boxes overlap. It’s used to evaluate detection accuracy.

---

#### 187. What is confidence score in object detection?
It represents how confident the model is that a detected object belongs to a certain class.

---

#### 188. What is real-time inference?
Processing input (images or video frames) fast enough to keep up with live streams, typically measured in FPS (frames per second).

---

#### 189. What challenges exist in real-time vision systems?
Latency, hardware constraints, memory usage, and accuracy-speed tradeoffs.

---

#### 190. How do LLMs integrate with vision systems?
Vision models detect or extract visual features, and LLMs **reason, describe, summarize, or explain** those results in natural language.

---

#### 191. What is visual grounding?
Ensuring that language outputs directly reference detected visual elements rather than hallucinated details.

---

#### 192. Vision-only vs Vision + LLM systems?
Vision-only systems detect objects; Vision + LLM systems **interpret, reason, and communicate** about those detections.

---

#### 193. What is multimodal input?
Input that includes more than one data type, such as text + image or image + audio.

---

#### 194. Why is multimodal AI important?
Real-world data is multimodal. Combining modalities improves understanding and usability.

---

#### 195. What is OCR?
Optical Character Recognition extracts text from images or scanned documents.

---

#### 196. OCR + LLM use case?
Understanding scanned PDFs, invoices, forms, or handwritten documents.

---

#### 197. What are common OCR challenges?
Noise, poor image quality, layout complexity, and incorrect character recognition.

---

#### 198. How do LLMs improve OCR pipelines?
By correcting errors, understanding document structure, and reasoning over extracted text.

---

#### 199. What is video understanding?
Analyzing video by extracting frames and reasoning across time to understand events or scenes.

---

#### 200. Why is video understanding hard?
Because it requires **temporal reasoning**, large compute, and multimodal fusion.

---

### Section 8: Diffusion Models & Generative Vision (201–215)

---

#### 201. What is a diffusion model?
A generative model that learns to **remove noise step by step** from random noise to generate images.

---

#### 202. How does diffusion differ from GANs?
Diffusion models are more stable and controllable, while GANs are faster but harder to train.

---

#### 203. What is Stable Diffusion?
A popular open-source diffusion model that generates images from text prompts.

---

#### 204. What does “text-to-image” mean?
Generating images directly from natural language descriptions.

---

#### 205. What is guidance scale?
Controls how strongly the image follows the text prompt versus creative freedom.

---

#### 206. What is sampling step?
The number of denoising iterations. More steps improve quality but increase latency.

---

#### 207. What is negative prompting?
Specifying what the image **should not contain**, improving control and quality.

---

#### 208. What is image-to-image generation?
Transforming an existing image using a text prompt while preserving structure.

---

#### 209. What is inpainting?
Filling missing or masked regions of an image based on surrounding context.

---

#### 210. What is LoRA in diffusion?
A lightweight fine-tuning technique that adapts diffusion models using minimal parameters.

---

#### 211. What is DreamBooth?
A technique for personalizing diffusion models with a small set of images.

---

#### 212. What are risks of diffusion models?
Bias, misuse, copyright issues, and generating harmful or misleading images.

---

#### 213. How do you control diffusion outputs in production?
Prompt validation, content filtering, watermarking, and safety checks.

---

#### 214. Diffusion vs LLM use cases?
Diffusion is best for images; LLMs are best for language and reasoning.

---

#### 215. Why diffusion matters in GenAI systems?
It enables **creative, visual, and design-driven applications** at scale.

Below are **technical interview questions for a GenAI / AI CTO round**, written in **clear, simple English**, but still **deep enough for senior leadership**.

These questions test **architecture decisions, technical judgment, scalability, safety, cost, and long-term thinking** — not coding trivia.

---

### 1. How would you design a production-ready GenAI system?

**What interviewer looks for:**
Understanding of **end-to-end system design**, not just models.

A production GenAI system needs:

* Input validation
* Prompt management
* Retrieval (RAG) if data is needed
* Model layer (replaceable)
* Output validation
* Monitoring and logging
* Fallback and error handling
  Models should be **one part of the system**, not the whole system.

---

### 2. How do you decide between RAG, fine-tuning, or prompt-only?


* Prompt-only for simple tasks
* RAG when answers must come from changing data
* Fine-tuning only when behavior must be very consistent
  Most systems start with RAG.

---

### 3. How would you design a GenAI system that can switch models easily?

I put models behind an internal API.
Prompts, evaluation, and business logic stay the same.
Only the model adapter changes.

---

### 4. What are the core components of a RAG system?


* Data ingestion and cleaning
* Chunking and embeddings
* Vector database
* Retrieval logic
* Prompt that forces answers from context
* Evaluation and monitoring

---

### 5. Where do most RAG systems fail?

Bad chunking, weak retrieval, no evaluation, and allowing the model to guess when data is missing.

---

### 6. How do you scale GenAI systems to millions of users?


* Async requests
* Caching responses and embeddings
* Batching calls
* Rate limiting
* Model selection based on task complexity
  Scale the system, not just the model.

---

### 7. How do you control GenAI costs?


* Cache results
* Use smaller models where possible
* Limit context size
* Monitor cost per request
* Set hard cost limits

---

### 8. What causes unexpected cost explosions in GenAI systems?

Long prompts, missing caching, retry loops, uncontrolled agent actions, and lack of monitoring.

---

### 9. How do you handle latency in GenAI systems?


* Streaming responses
* Parallel retrieval
* Async calls
* Caching
* Fast fallback answers

---

### 10. When would you use smaller models instead of large ones?

For simple tasks like classification, extraction, or routing.
Large models are for complex reasoning only.

---

## 3. Reliability, Safety & Risk

### 11. How do you reduce hallucinations in production?


* Ground answers using RAG
* Force structured output
* Add confidence checks
* Return “I don’t know” when data is missing

---

### 12. How do you design safe fallback behavior?

If AI is unsure or fails, return a safe message, ask for clarification, or route to a human.

---

### 13. How do you monitor GenAI systems?

I monitor:

* Output quality
* Hallucination rate
* Cost per request
* Latency
* Error rates
  Monitoring is more important than training.

---

### 14. How do you test GenAI systems?


* Golden test cases
* Regression testing on prompts
* Compare old vs new model outputs
* Human review for critical flows

---

### 15. How do you prevent prompt injection?


* Strict input sanitization
* Separate system instructions from user input
* Limit tool permissions
* Validate outputs

---

## 4. Agents & Tool Use

### 16. When should you use AI agents?

Only when tasks need multiple steps, decisions, or tool usage.
Most problems do not need agents.

---

### 17. What are the biggest risks of AI agents?

Infinite loops, high costs, unsafe tool usage, and unpredictable behavior.

---

### 18. How do you control agent behavior?


* Step limits
* Clear goals
* Tool permissions
* Human approval for risky actions
* Strong logging

---

### 19. How do you evaluate agent performance?

By task success rate, cost, safety, and consistency — not just output quality.

---

### 20. When should you stop using an agent?

If a simpler workflow or rule-based system works better and safer.

---

## 5. Data, Privacy & Compliance

### 21. How do you protect sensitive data in GenAI?


* Minimize data sent to models
* Mask or remove PII
* Encrypt storage
* Control access strictly

---

### 22. How do you handle data freshness in RAG?

I design re-ingestion pipelines and re-embedding strategies with clear ownership.

---

### 23. How do you make GenAI systems auditable?

Log inputs, outputs, model versions, prompts, and retrieval sources.

---

### 24. How do you handle regulatory changes?

By building systems that are transparent, explainable, and easy to audit.

---

### 25. What is the biggest mistake companies make with GenAI?

Focusing on models instead of systems and shipping without evaluation.

---

### 26. How do you future-proof a GenAI platform?

Assume models will change.
Design for modularity, monitoring, and replaceability.

---

### 27. What skills should an AI engineering team have?

System design, backend engineering, debugging, and production experience — not just ML skills.

---

### 28. How do you know when a GenAI system is ready for production?

When it is monitored, tested, cost-controlled, safe, and has clear ownership.

---

### 29. How do you explain GenAI risks to the board?

I explain risks in business terms: cost, reputation, compliance, and trust.

---

**“Why should we trust your technical judgment?”**

Because I design AI systems that are **safe, measurable, scalable, and replaceable**, not just impressive demos.


---

# Advanced GenAI Questions

---

### 31. How do you separate GenAI logic from business logic?
I keep prompts, models, and retrieval logic in a separate AI layer.
Business rules should not depend directly on the model.
This makes the system easier to change and safer.

---

### 32. How do you version prompts in production?
I store prompts like code:

* Versioned
* Reviewed
* Tested
  Every production request logs which prompt version was used.

---

### 33. What happens if an LLM API goes down?
The system should:

* Fail gracefully
* Use cached answers or smaller models
* Show a safe fallback message
  AI should never block the whole product.

---

### 34. How do you design GenAI systems for high availability?

* Multiple model providers (if needed)
* Timeouts and retries
* Circuit breakers
* Fallback paths
  Never depend on a single model call.

---

### 35. How do you test prompts before releasing them?
I test prompts on:

* Known test cases
* Edge cases
* Bad user inputs
  I compare old vs new outputs before release.

---

### 36. How do you detect silent quality degradation?
By tracking:

* Output quality scores
* User feedback
* Changes in behavior over time
  If quality slowly drops, alerts should fire.

---

### 37. How do you decide prompt length vs context length?
Only include what is truly needed.
Long prompts increase cost, latency, and errors.

---

### 38. How do you know if RAG is actually helping?
I compare:

* Answers with RAG vs without RAG
* Accuracy and hallucination rate
  If RAG doesn’t improve results, it should be redesigned or removed.

---

### 39. How do you handle conflicting documents in RAG?
I surface sources clearly or ask the model to explain differences instead of guessing.

---

### 40. How do you prevent outdated data in RAG?
I schedule re-ingestion and re-embedding and track document freshness.

---

### 41. How do you limit context size in RAG?

* Top-k retrieval
* Re-ranking
* Summarization
  Never dump all documents into the prompt.

---

### 42. How do you debug bad RAG answers?
I inspect:

* Retrieved chunks
* Prompt
* Final answer
  Most issues come from retrieval, not the model.

---

### 43. When should RAG not be used?
When answers do not depend on external data or must be extremely consistent.

---

### 44. How do you decide if a problem needs an agent?
Only when the task has:

* Multiple steps
* Decisions
* Tool usage
  Simple workflows do not need agents.

---

### 45. How do you stop agents from looping forever?

* Max step limits
* Time limits
* Goal completion checks
  No agent should run without guards.

---

### 46. How do you control what tools an agent can use?
I whitelist tools and restrict permissions.
Agents should never have full system access.

---

### 47. How do you handle agent mistakes?
I log everything, fail safely, and require human approval for risky actions.

---

### 48. How do you test agent behavior?
I simulate real tasks and measure:

* Success rate
* Cost
* Safety
  Not just “does it work once?”

---

### 49. When should agents be disabled?
If they become too expensive, unpredictable, or unsafe.

---

### 50. How do you estimate GenAI costs before launch?
I estimate:

* Tokens per request
* Requests per day
* Model cost
  Then I add safety limits.

---

### 51. How do you enforce cost limits?

* Per-user limits
* Per-feature budgets
* Hard stops
  No unlimited AI usage.

---

### 52. What causes GenAI cost spikes?
Long prompts, retry loops, agent loops, missing caching, and no monitoring.

---

### 53. How do you choose the right model for a task?
Use the smallest model that meets quality requirements.
Bigger models are not always better.

---

### 54. How do you reduce latency for users?

* Streaming
* Async calls
* Caching
* Parallel retrieval
  Users care about speed.

---

### 55. How do you scale GenAI without scaling cost equally?
Reuse results, batch requests, and use tiered models.

---

## 11. Security, Privacy & Compliance

### 56. How do you protect against prompt injection?

* Separate system instructions from user input
* Validate outputs
* Restrict tool access
  Never trust user input.

---

### 57. How do you handle PII in GenAI systems?
Mask or remove PII before sending data to models whenever possible.

---

### 58. How do you audit GenAI decisions?
By logging:

* Inputs
* Outputs
* Prompt versions
* Model versions
* Retrieval sources

---

### 59. How do you handle compliance reviews?
I prepare documentation and logs so auditors can clearly see how decisions are made.

---

### 60. How do you handle user trust?
Be transparent.
Explain limitations.
Never oversell AI capabilities.

---

### 61. How do you decide when GenAI should NOT be used?
When:

* Risk is high
* Data is weak
* Rules work better
  AI is not always the answer.

---

### 62. What makes a GenAI system “enterprise-ready”?
Monitoring, safety, cost control, ownership, and clear documentation.

---

### 63. How do you manage AI failures publicly?
Acknowledge the issue, explain the fix, and improve safeguards.

---

### 64. What technical debt is unique to GenAI?
Untracked prompts, silent behavior changes, and missing evaluation.

---

### 65. What is your most important technical principle in GenAI?
Design for failure first, not success.

---

### 66. What will separate successful AI companies from failed ones?
System quality, safety, and discipline—not model size.

---

### 67. How do you keep GenAI systems understandable to engineers?
Clear documentation, clean architecture, and strong logging.

---

### 68. How do you evaluate new GenAI tools or vendors?
I test reliability, cost, security, and lock-in risk—not marketing claims.

---

### 69. How do you ensure long-term ownership of AI systems?
Clear owners, clear documentation, and automated testing.

---

### 70. What is your role when GenAI goes wrong?”
I take responsibility, protect users, and fix the system—not blame the model.