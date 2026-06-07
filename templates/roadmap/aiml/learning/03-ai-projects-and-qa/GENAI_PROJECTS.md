# GenAI Projects – Hands-On Learning Path

This repository is a **project-driven roadmap for mastering Generative AI by building real systems**.

Every project:

* Solves a concrete problem
* Introduces **one core concept at a time**
* Produces **reusable, production-ready components**
* Builds directly on previous projects

This is not a demo collection.
This is a **system-building curriculum**.

---

## Phase 1: Foundations & Core Concepts

> Goal: Remove the “black box” feeling of LLMs.

---

### 1. GenAI Fundamentals Playground

**Folder:** `01-genai-fundamentals-playground`

**Goal**
Understand what Generative AI is and how LLMs work at a system level.

**You build**

* Minimal LLM request–response pipeline
* Same prompt executed in Python and Node.js

**You learn**

* What Generative AI actually is
* What an LLM does internally
* Tokens vs words
* Input → model → output flow

**Outcome**
You clearly understand what happens when you call an LLM API.

---

### 2. LLM Chat Basics

**Folder:** `02-llm-chat-basics`

**Goal**
Understand how chat-based LLMs behave across turns.

**You build**

* CLI or script-based chat interface
* Single-turn and multi-turn conversations

**You learn**

* Chat message structure
* Assistant behavior across turns
* Deterministic vs creative outputs

**Outcome**
You understand how chat-based models maintain conversational context.

---

### 3. Tokenization & Context Window

**Folder:** `03-tokenization-context-window`

**Goal**
Understand why prompts fail, truncate, or become expensive.

**You build**

* Token counter utility
* Prompt length visualizer
* Context overflow demo

**You learn**

* Tokenization mechanics
* Context window limits
* Prompt truncation behavior
* Cost vs token tradeoffs

**Outcome**
You can design prompts that fit reliably within context limits.

---

### 4. Prompt Roles & Hierarchy

**Folder:** `04-prompt-roles-system-user-assistant`

**Goal**
Learn how model behavior is controlled using prompt roles.

**You build**

* Identical user prompts with different system messages
* Behavior comparison experiments

**You learn**

* System prompt authority
* User instruction scope
* Prompt hierarchy rules

**Outcome**
You gain precise control over LLM behavior and safety.

---

## Phase 2: Prompt Engineering & Conversation

> Goal: Build reliable, reusable prompting systems.

---

### 5. Prompt Engineering Patterns

**Folder:** `05-prompt-engineering-patterns`

**Goal**
Design structured and repeatable prompts.

**You build**

* Instruction-based prompts
* Few-shot examples
* Structured JSON output prompts

**You learn**

* Zero-shot vs few-shot prompting
* Output constraints
* Prompt templating

**Outcome**
You can create predictable, reusable prompt patterns.

---

### 6. Conversation State Management

**Folder:** `06-conversation-state-management`

**Goal**
Maintain conversation continuity correctly.

**You build**

* Chat history manager
* Sliding window conversation logic

**You learn**

* Conversation buffers
* Context pruning strategies
* Reset vs continuation logic

**Outcome**
Your conversations remain stable as they grow longer.

---

### 7. Short-Term Conversation Memory

**Folder:** `07-conversation-memory-short-term`

**Goal**
Persist memory within a session.

**You build**

* In-memory session store
* User-scoped memory injection

**You learn**

* Session memory design
* Memory expiration strategies

**Outcome**
Your assistant can remember information within a session.

---

## Phase 3: Embeddings & Search

> Goal: Teach machines semantic meaning.

---

### 8. Text Embeddings Basics

**Folder:** `08-text-embeddings-basics`

**Goal**
Understand how meaning is represented numerically.

**You build**

* Embedding generation pipeline
* Similarity comparison tool

**You learn**

* Vector embeddings
* Cosine similarity
* Semantic distance

**Outcome**
You understand how semantic similarity works under the hood.

---

### 9. Semantic Search from Scratch

**Folder:** `09-semantic-search-from-scratch`

**Goal**
Build a meaning-based search system.

**You build**

* Vector index
* Semantic search engine

**You learn**

* Vector storage
* Ranking strategies
* Query embeddings

**Outcome**
You can replace keyword search with semantic search.

---

### 10. Document Chunking Strategies

**Folder:** `10-document-chunking-strategies`

**Goal**
Understand how chunking affects retrieval quality.

**You build**

* Multiple chunking strategies
* Retrieval quality comparison

**You learn**

* Chunk size tradeoffs
* Overlap strategies
* Metadata tagging

**Outcome**
You can design chunking strategies that improve RAG quality.

---

## Phase 4: Retrieval-Augmented Generation (RAG)

> Goal: Ground LLMs in real data.

---

### 11. Basic RAG (PDF Q&A)

**Folder:** `11-rag-basic-pdf-qa`

**Goal**
Answer questions using document-backed context.

**You build**

* PDF loader
* RAG-based Q&A pipeline

**You learn**

* Retrieval + generation flow
* Context grounding

**Outcome**
Your LLM answers are grounded in documents.

---

### 12. Metadata-Aware RAG

**Folder:** `12-rag-metadata-filtering`

**Goal**
Improve retrieval precision using metadata.

**You build**

* Metadata-based filtering
* Source attribution

**You learn**

* Metadata-aware retrieval
* Context control

**Outcome**
Your RAG system retrieves more accurate context.

---

### 13. RAG Query Rewriting

**Folder:** `13-rag-query-rewriting`

**Goal**
Automatically improve user queries.

**You build**

* Query rewriting pipeline
* Multi-step retrieval

**You learn**

* Query expansion
* Retrieval optimization

**Outcome**
Your system compensates for poorly phrased user queries.

---

## Phase 5: Agents & Tooling

> Goal: Move from responses to actions.

---

### 14. Tool Calling Basics

**Folder:** `14-tool-calling-basics`

**Goal**
Enable LLMs to interact with external systems.

**You build**

* Tool/function calling interface
* Tool execution layer

**You learn**

* Structured tool calls
* Input validation
* Error handling

**Outcome**
Your LLM can safely perform real actions.

---

### 15. Task-Oriented AI Agent

**Folder:** `15-task-oriented-ai-agent`

**Goal**
Create a goal-driven AI agent.

**You build**

* Planner–executor agent
* Task decomposition logic

**You learn**

* Planning
* Reasoning
* Tool usage
* Memory

**Outcome**
Your agent can break down and execute tasks.

---

### 16. Multi-Agent Collaboration

**Folder:** `16-multi-agent-collaboration`

**Goal**
Coordinate multiple specialized agents.

**You build**

* Research agent
* Writer agent
* Reviewer agent

**You learn**

* Role separation
* Agent communication

**Outcome**
You can solve complex problems using multiple agents.

---

## Phase 6: Reliability & Safety

---

### 17. Hallucination Detection

**Folder:** `17-hallucination-detection`

**Goal**
Detect and reduce incorrect answers.

**You build**

* Answer verification logic
* Confidence scoring

**You learn**

* Grounding checks
* Self-consistency

**Outcome**
Your system can detect unreliable outputs.

---

### 18. Evaluation & Regression Testing

**Folder:** `18-llm-evaluation-regression-testing`

**Goal**
Prevent behavior drift over time.

**You build**

* Prompt test suite
* Regression evaluation pipeline

**You learn**

* Prompt versioning
* Automated evaluation

**Outcome**
Your AI system becomes testable and stable.

---

## Phase 7: Advanced RAG & Knowledge Systems

---

### 21. Hybrid Search

**Folder:** `21-hybrid-search-keyword-vector`

**Goal**
Combine keyword and semantic search.

**You build**

* BM25 + vector search
* Weighted ranking logic

**You learn**

* Sparse vs dense retrieval
* Hybrid ranking

**Outcome**
You build production-grade retrieval systems.

---

### 22. Re-Ranking with Cross-Encoders

**Folder:** `22-rag-re-ranking-cross-encoder`

**Goal**
Improve retrieval precision.

**You build**

* Two-stage retrieval pipeline
* Re-ranking logic

**You learn**

* Precision vs latency tradeoffs

**Outcome**
Your RAG answers become significantly more accurate.

---

### 23. Long-Context RAG

**Folder:** `23-long-context-rag-summarization`

**Goal**
Handle very large documents.

**You build**

* Hierarchical summarization
* Context compression

**You learn**

* Long-context strategies

**Outcome**
You can handle documents larger than context windows.

---

### 24. Knowledge Graph + RAG

**Folder:** `24-knowledge-graph-rag`

**Goal**
Add structured reasoning to RAG.

**You build**

* Entity extraction
* Graph-based retrieval

**You learn**

* Knowledge graphs
* Entity relationships

**Outcome**
Your system supports reasoning-heavy queries.

---

### 25. Multi-Source RAG

**Folder:** `25-multi-source-rag`

**Goal**
Query multiple knowledge sources.

**You build**

* RAG over PDFs, APIs, and databases

**You learn**

* Source routing
* Context merging

**Outcome**
Your system can reason across multiple data sources.

---

## Phase 8: Advanced Agents & Autonomy

> Goal: Build agents that act independently **with control and safety**.

---

### 30. Autonomous Agent with Guardrails

**Folder:** `30-autonomous-agent-with-guardrails`

**Goal**
Enable controlled autonomy while preventing unsafe behavior.

**You build**

* Goal-driven autonomous agent
* Guardrail and approval checks

**You learn**

* Autonomy vs control tradeoffs
* Failure containment strategies
* Safety boundaries

**Outcome**
You can build agents that act independently without causing damage.

---

### 31. Tool-Choosing Agent (Dynamic Tools)

**Folder:** `31-dynamic-tool-selection-agent`

**Goal**
Allow agents to dynamically choose which tools to use.

**You build**

* Tool registry
* Tool relevance scoring logic

**You learn**

* Tool abstraction
* Dynamic planning
* Prompt minimization

**Outcome**
Your agent can scale its capabilities without prompt bloat.

---

### 32. Agent Workflow Orchestration

**Folder:** `32-agent-workflow-orchestration`

**Goal**
Coordinate complex, multi-step agent workflows.

**You build**

* DAG-based workflow engine
* Conditional branching logic

**You learn**

* Workflow orchestration
* State machines
* Task dependencies

**Outcome**
Your agents can execute non-linear, real-world workflows.

---

### 33. Self-Reflective Agent

**Folder:** `33-self-reflective-agent`

**Goal**
Enable agents to critique and improve their own outputs.

**You build**

* Output review loop
* Self-correction mechanism

**You learn**

* Reflection techniques
* Iterative improvement strategies

**Outcome**
Your agent produces higher-quality, more reliable results.

---

## Phase 9: Multimodal & Voice Systems

> Goal: Move beyond text-only AI.

---

### 34. Multimodal RAG (Text + Images)

**Folder:** `34-multimodal-rag`

**Goal**
Retrieve and reason across text and images together.

**You build**

* Image embedding pipeline
* Multimodal retrieval system

**You learn**

* Cross-modal reasoning
* Image grounding techniques

**Outcome**
Your system can answer questions using both text and images.

---

### 35. Voice AI Agent (Speech-to-Speech)

**Folder:** `35-voice-ai-agent`

**Goal**
Build a real-time voice-based AI assistant.

**You build**

* Speech-to-text pipeline
* LLM reasoning layer
* Text-to-speech output

**You learn**

* Voice latency constraints
* Conversational voice UX

**Outcome**
You can build production-ready voice AI agents.

---

# Advanced Model, Vision & Diffusion Projects

---

## Phase 14: Model Fine-Tuning & Adaptation

> Goal: Move from prompting to model adaptation.

---

### 41. LLM Fine-Tuning Fundamentals

**Folder:** `41-llm-fine-tuning-fundamentals`

**Goal**
Understand how LLM fine-tuning works end to end.

**You build**

* Instruction–response dataset
* Fine-tuning pipeline (or mock workflow)

**You learn**

* Pretraining vs fine-tuning
* Instruction tuning
* Overfitting risks

**Outcome**
You understand when and why fine-tuning is needed.

---

### 42. Supervised Fine-Tuning (SFT) Pipeline

**Folder:** `42-supervised-fine-tuning-pipeline`

**Goal**
Build a clean, reproducible SFT workflow.

**You build**

* Dataset validation pipeline
* Training and evaluation loop
* Model versioning

**You learn**

* Train/validation splits
* Loss curves
* Checkpoint management

**Outcome**
You can reliably fine-tune and evaluate LLMs.

---

### 43. LoRA / PEFT Fine-Tuning

**Folder:** `43-lora-peft-fine-tuning`

**Goal**
Fine-tune models efficiently with limited resources.

**You build**

* LoRA-based fine-tuning setup
* Base vs adapted model comparison

**You learn**

* Parameter-efficient fine-tuning
* Memory and compute tradeoffs

**Outcome**
You can fine-tune large models on modest hardware.

---

### 44. Domain-Specific LLM

**Folder:** `44-domain-specific-llm`

**Goal**
Adapt an LLM to a specialized domain.

**You build**

* Domain-specific dataset
* Evaluation prompts
* Error analysis tooling

**You learn**

* Domain shift
* Specialized vocabulary handling
* Hallucination risks

**Outcome**
You can build LLMs optimized for specific industries.

---

### 45. Fine-Tuned Model Deployment

**Folder:** `45-fine-tuned-model-deployment`

**Goal**
Serve a fine-tuned model in production.

**You build**

* Inference API
* CPU vs GPU deployment setup
* Scaling strategy

**You learn**

* Model serving
* Latency optimization
* Cost vs accuracy tradeoffs

**Outcome**
You can deploy and scale your own models.

---

## Phase 15: Computer Vision & YOLO

> Goal: Add real-world visual understanding.

---

### 46. Computer Vision Fundamentals

**Folder:** `46-computer-vision-fundamentals`

**Goal**
Understand core computer vision concepts.

**You build**

* Image preprocessing pipeline
* Feature extraction demo

**You learn**

* Images as tensors
* Normalization
* Augmentation

**Outcome**
You understand how vision models process images.

---

### 47. YOLO Object Detection Basics

**Folder:** `47-yolo-object-detection-basics`

**Goal**
Detect objects in images using YOLO.

**You build**

* YOLO inference pipeline
* Bounding box visualization

**You learn**

* Object detection fundamentals
* Confidence thresholds
* IOU

**Outcome**
You can run object detection on images.

---

### 48. YOLO Custom Dataset Training

**Folder:** `48-yolo-custom-dataset-training`

**Goal**
Train YOLO on custom data.

**You build**

* Dataset labeling pipeline
* YOLO training workflow

**You learn**

* Annotation formats
* Data augmentation
* Training metrics

**Outcome**
You can train object detection models on your own data.

---

### 49. YOLO Real-Time Inference

**Folder:** `49-yolo-real-time-inference`

**Goal**
Run object detection in real time.

**You build**

* Webcam or video stream inference
* FPS optimization logic

**You learn**

* Streaming inference
* Latency constraints

**Outcome**
You can deploy real-time vision systems.

---

### 50. Vision + LLM Integration

**Folder:** `50-vision-llm-integration`

**Goal**
Combine visual perception with language reasoning.

**You build**

* Object detection → LLM description pipeline

**You learn**

* Multimodal pipelines
* Visual grounding

**Outcome**
You can build vision-aware AI assistants.

---

## Phase 16: Diffusion & Generative Vision

> Goal: Generate and edit images using AI.

---

### 51. Diffusion Model Fundamentals

**Folder:** `51-diffusion-model-fundamentals`

**Goal**
Understand how diffusion models work.

**You build**

* Noise-to-image visualization
* Sampling step demo

**You learn**

* Forward and reverse diffusion
* Sampling schedules

**Outcome**
You understand how modern image generation works.

---

### 52. Stable Diffusion Text-to-Image

**Folder:** `52-stable-diffusion-text-to-image`

**Goal**
Generate images from text prompts.

**You build**

* Text-to-image generation pipeline
* Prompt comparison experiments

**You learn**

* Text conditioning
* Guidance scale
* Sampling steps

**Outcome**
You can generate images from natural language.

---

### 53. Stable Diffusion Prompt Engineering

**Folder:** `53-stable-diffusion-prompt-engineering`

**Goal**
Control image generation using prompts.

**You build**

* Style prompts
* Negative prompts

**You learn**

* Prompt weighting
* Style control

**Outcome**
You can precisely control image generation results.

---

### 54. Stable Diffusion Fine-Tuning

**Folder:** `54-stable-diffusion-fine-tuning`

**Goal**
Customize diffusion models.

**You build**

* LoRA or DreamBooth fine-tuning
* Personalized image generation

**You learn**

* Image fine-tuning
* Overfitting control

**Outcome**
You can create customized image generation models.

---

### 55. Image-to-Image & Inpainting

**Folder:** `55-image-to-image-inpainting`

**Goal**
Edit existing images using AI.

**You build**

* Image-to-image pipeline
* Mask-based inpainting

**You learn**

* Conditional diffusion
* Controlled image editing

**Outcome**
You can modify images using natural language.

---

## Phase 17: Multimodal & Advanced Systems

> Goal: Build full AI products.

---

### 56. Multimodal Assistant

**Folder:** `56-multimodal-assistant`

**Goal**
Build a unified multimodal AI assistant.

**You build**

* Text, image, and PDF reasoning pipeline

**You learn**

* Cross-modal context handling
* Unified embeddings

**Outcome**
You can build assistants that reason across modalities.

---

### 57. OCR + LLM Document Understanding

**Folder:** `57-ocr-llm-document-understanding`

**Goal**
Understand scanned and unstructured documents.

**You build**

* OCR extraction pipeline
* LLM-based reasoning layer

**You learn**

* OCR noise handling
* Layout-aware parsing

**Outcome**
You can extract insights from scanned documents.

---

### 58. Video Understanding with AI

**Folder:** `58-video-understanding-ai`

**Goal**
Reason over video content.

**You build**

* Frame extraction pipeline
* Scene summarization system

**You learn**

* Temporal reasoning
* Multimodal summarization

**Outcome**
You can analyze and summarize video data.

---

### 59. Synthetic Data Generation

**Folder:** `59-synthetic-data-generation`

**Goal**
Generate AI-created training data.

**You build**

* Synthetic text and image datasets
* Quality evaluation logic

**You learn**

* Data augmentation
* Bias risks

**Outcome**
You can reduce labeling costs using synthetic data.

---

### 60. Full-Stack AI Product

**Folder:** `60-full-stack-ai-product`

**Goal**
Build an end-to-end AI product.

**You build**

* Backend AI services
* Frontend UI
* Vision, LLM, and diffusion pipelines

**You learn**

* Product architecture
* End-to-end deployment

**Outcome**
You complete a **startup-level, portfolio-ready AI system**.
