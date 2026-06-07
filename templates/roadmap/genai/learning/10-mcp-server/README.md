## MCP Server

## 1. What is an MCP server?

**Answer (direct):**
An MCP server is a service that exposes tools, data, or capabilities to LLMs using the Model Context Protocol, so the model can safely interact with external systems.

**Practical explanation:**
Instead of hard-coding tools inside an LLM app, MCP standardizes how models discover and call tools like databases, APIs, file systems, or internal services.

The MCP server:

* Defines available tools
* Validates inputs
* Executes the action
* Returns structured results back to the model

**Real-world example:**
An internal MCP server might expose:

* “search_customer_by_email”
* “create_support_ticket”
* “fetch_recent_orders”

The LLM can call these without knowing backend details.

---

## 2. Why do we need MCP instead of custom tool integrations?

**Answer (direct):**
MCP reduces tight coupling between the LLM and backend systems and makes tool integrations reusable and safer.

**Practical explanation:**
Without MCP:

* Every app defines tools differently
* Tool schemas are inconsistent
* Security rules are scattered

With MCP:

* One standard protocol
* Tools are discoverable at runtime
* Easier to swap models or clients

**Trade-off:**
You add another service layer (the MCP server), which needs to be deployed and monitored.

---

## 3. How does an MCP server communicate with an LLM?

**Answer (direct):**
Through structured JSON messages over a transport like stdio, HTTP, or WebSockets.

**Practical explanation:**
The flow is usually:

1. Client connects to MCP server
2. Server advertises available tools and schemas
3. LLM chooses a tool based on user intent
4. Tool is executed
5. Result is returned in a structured format

The LLM never directly touches your database or internal API.

---

## 4. What kind of tools should be exposed via an MCP server?

**Answer (direct):**
Only high-level, safe, business-meaningful operations.

**Good examples:**

* “get_user_profile”
* “list_open_incidents”
* “run_readonly_sql_query”

**Bad examples:**

* Raw shell access
* Unbounded SQL execution
* Low-level infrastructure commands

**Why interviewers care:**
This shows you understand **security boundaries** and **blast radius control**.

---

## 5. How do you secure an MCP server?

**Answer (direct):**
By enforcing authentication, authorization, input validation, and strict tool scoping.

**Practical explanation:**
Common controls include:

* API keys or OAuth between client and MCP server
* Per-tool permission checks
* Input schema validation
* Read-only vs write tool separation
* Rate limiting

**Key point:**
Never trust the LLM. Treat it like an untrusted client.

---

## 6. How is MCP different from function calling in OpenAI-style APIs?

**Answer (direct):**
Function calling is model-specific, while MCP is a model-agnostic protocol.

**Practical explanation:**
Function calling:

* Defined inside a single API
* Tightly coupled to one provider

MCP:

* Works across models
* Tools live outside the model
* Can be reused by multiple clients

This makes MCP better for **platform teams** and **enterprise setups**.

---

## 7. What happens if an MCP tool fails?

**Answer (direct):**
The MCP server returns a structured error, and the LLM decides how to recover.

**Practical explanation:**
Failures might include:

* Validation errors
* Timeouts
* Permission denied
* Backend service down

A well-designed MCP server:

* Returns clear error messages
* Avoids leaking internal stack traces
* Allows the model to retry or ask the user for clarification

---

## 8. How would you deploy an MCP server in production?

**Answer (direct):**
Like any backend service, with observability and isolation.

**Typical setup:**

* Containerized service (Docker)
* Behind an internal API gateway
* Separate staging and prod MCP servers
* Logging tool calls and responses
* Metrics on latency and error rates

**Why this matters:**
Interviewers want to see that you treat MCP as **production infrastructure**, not a toy.

---

## 9. Who introduced MCP and why is it gaining adoption?

**Answer (direct):**
MCP was introduced by **Anthropic** to standardize how LLMs interact with tools and external context.

**Why it matters:**
As LLM apps grow:

* Tool sprawl becomes a problem
* Security risks increase
* Model portability matters

MCP addresses all three.

---

## 10. When would you *not* use an MCP server?

**Answer (direct):**
For very small prototypes or single-purpose scripts.

**Explanation:**
If you:

* Have one model
* One tool
* No security concerns

Then MCP may be overkill.

But once you have:

* Multiple tools
* Multiple models
* Multiple teams

MCP becomes worth it.

---

## 11. How do you design an MCP server from scratch?

**Answer (direct):**
I design it like a controlled API gateway specifically for LLMs.

**Core components:**

1. **Tool registry**

   * Tool name
   * Input schema
   * Output schema
2. **Execution layer**

   * Maps tools to backend services
3. **Security layer**

   * Auth, permissions, validation
4. **Transport layer**

   * HTTP / stdio / WebSocket
5. **Observability**

   * Logs, metrics, traces

**Key design rule:**
LLMs should never talk directly to internal systems.

---

## 12. How do you version tools in an MCP server?

**Answer (direct):**
By treating tools like public APIs with explicit versioning.

**Practical approach:**

* Tool names include versions
  `get_user_profile_v1`, `get_user_profile_v2`
* Never break existing schemas
* Deprecate old versions gradually

**Why interviewers care:**
LLMs may cache behavior. Breaking a schema silently causes hard-to-debug failures.

---

## 13. How do you handle long-running tools?

**Answer (direct):**
By making them asynchronous and returning job IDs.

**Pattern:**

1. LLM calls `start_data_export`
2. MCP returns `{ job_id }`
3. LLM later calls `get_job_status`
4. Final result is retrieved when ready

**Why:**
Blocking the model on long tasks leads to timeouts and wasted tokens.

---

## 14. How do you prevent prompt injection via MCP tools?

**Answer (direct):**
By enforcing strict input schemas and never passing raw prompts to backends.

**Key defenses:**

* Typed inputs (no free-form strings when possible)
* Field-level validation
* Explicit allowlists
* No tool that directly executes user text

**Important mindset:**
Prompt injection is not just a model problem—it’s a backend security problem.

---

## 15. How do you test an MCP server?

**Answer (direct):**
I test it like a normal backend plus model-simulation tests.

**Test layers:**

* Unit tests for tool handlers
* Schema validation tests
* Permission tests
* Mock LLM calls (tool selection + execution)
* Load tests for concurrency

**Good practice:**
Replay real production tool calls against staging.

---

## 16. How do you decide tool granularity?

**Answer (direct):**
Tools should represent **business actions**, not low-level operations.

**Too fine-grained (bad):**

* `select_from_users`
* `update_user_field`

**Well-designed:**

* `create_user`
* `suspend_account`
* `get_billing_summary`

**Rule of thumb:**
If a tool needs multiple backend calls, that’s usually correct.

---

## 17. How do you handle retries safely?

**Answer (direct):**
By making tools idempotent or explicitly marking non-idempotent actions.

**Techniques:**

* Idempotency keys
* Read vs write tool separation
* “Dry-run” tools for validation

**Why this matters:**
LLMs retry automatically when uncertain. Duplicate writes are a real risk.

---

## 18. How does MCP fit into a microservices architecture?

**Answer (direct):**
MCP sits in front of microservices as a controlled aggregation layer.

**Architecture:**

```
LLM Client
   ↓
MCP Server
   ↓
Auth / Billing / Orders / Search Services
```

**Benefits:**

* Centralized permissions
* Fewer services exposed to LLMs
* Easier auditing

---

## 19. How do you log MCP interactions safely?

**Answer (direct):**
By logging metadata, not raw user content.

**Log safely:**

* Tool name
* Execution time
* Status (success/failure)
* Sanitized inputs

**Avoid:**

* PII
* Full prompts
* Secrets

**Why interviewers ask this:**
It shows production maturity and compliance awareness.

---

## 20. What are common MCP server mistakes?

**Answer (direct):**
Treating MCP as a thin proxy instead of a safety boundary.

**Common mistakes:**

* Exposing raw databases
* Overly generic tools
* No permission model
* No rate limiting
* No versioning

**Result:**
Unpredictable model behavior and security risk.

---

## 21. How does MCP compare with agent frameworks?

**Answer (direct):**
MCP handles *tool access*, agents handle *decision logic*.

**Simplified view:**

* MCP = “What can you do?”
* Agent = “What should you do next?”

They are complementary, not competing.

---

## 22. Why platform teams like MCP

**Answer (direct):**
Because it standardizes LLM access across teams and models.

**Benefits:**

* One tool surface
* Multiple clients (chatbots, copilots, automations)
* Model portability
* Central governance

This is why MCP, introduced by **Anthropic**, is getting strong enterprise adoption.