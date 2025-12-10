---
id: 4
title: Update Constitution to v1.0.0
stage: constitution
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: ["constitution","update"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:

---

## Prompt

 Update the constitution with this     # /sp.constitution

## Project
**AI-Native Technical Book + Integrated RAG Chatbot**
Authoring platform: Docusaurus + Spec-Kit Plus + Claude Code
Deployment target: GitHub Pages

---

## Core Principles

- **Spec-driven writing**: All chapters originate from approved specs created using Spec-Kit Plus.
- **Technical accuracy**: Every explanation must reflect current practice in OpenAI Agents SDK, FastAPI, Neon Postgres, and Qdrant Cloud.
- **Developer clarity**: Content is targeted at junior-to-intermediate AI engineers.
- **Reproducibility**: Readers must be able to follow steps and reproduce the entire book + chatbot setup.

---

## Key Standards

### Content Requirements
- Chapters must follow a **spec → implementation → example** template.
- Each chapter must contain:
  - Definitions
  - Code samples in Python and TypeScript
  - Deployment instructions
  - Troubleshooting guidance

### Technical Verification
- Code samples must:
  - Be runnable as provided
  - Include environment variable setup
  - Reference required packages (`requirements.txt`, `package.json`)
  - Provide real API endpoint examples

### RAG Chatbot Standards
- Must implement:
  - Retrieval-Augmented Generation (RAG)
  - Qdrant Cloud vector index
  - Neon Serverless Postgres for logging and metadata
  - FastAPI backend with `/query` endpoint
  - OpenAI Agents / ChatKit tool-calling support

- Chatbot must be able to answer questions:
  - Based on book-wide content
  - Based on specific user-selected text
  - With source snippet display

### Documentation Standards
- Use fenced code blocks:
  ```python
  ```ts
  ```bash

- Each chapter ends with:
  - **Task Checklist**
  - **Implementation Steps**

---

## Sources & Citations

- Minimum **60% primary sources**, including:
  - Official OpenAI Agents documentation
  - Qdrant docs
  - Neon Postgres docs
  - FastAPI docs
  - Panaverse Spec-Kit Plus docs

- Allowed sources:
  - Official documentation
  - GitHub repositories
  - RFCs
  - Research white papers

- Disallowed sources:
  - StackOverflow answers
  - Unverified blog posts

**Citation style:** Markdown links with inline references
Example:
> "The Agents SDK provides tool-based handoffs" [[OpenAI Docs](#)].

---

## Constraints

- **Book Format:** Docusaurus 3.x website with sidebar navigation
- **Deployment:** Must build successfully on GitHub Pages
- **Length:** Minimum 80 pages, 10+ chapters
- **RAG Functionality:**
  - Local contextual retrieval (selected text only)
  - Persistent query logging
  - Automatic passage citation

**Tech Stack constraints:**
- FastAPI (backend)
- OpenAI Agents OR ChatKit SDK
- Neon Postgres
- Qdrant Cloud (free tier)
- TypeScript frontend widget
- Python backend

---

## Success Criteria

A valid final submission MUST satisfy:

1. Book published and publicly accessible on GitHub Pages
2. Fully operational RAG chatbot embedded in Docusaurus
3. Chatbot supports:
   - Book-wide queries
   - Selected-text queries
   - Citation display
4. Repository includes:
   - `/frontend` (Docusaurus book)
   - `/backend` (FastAPI app)
   - `/db` migrations for Neon Postgres
   - `/qdrant` setup script
5. Documentation covers:
   - Build + deployment instructions
   - Environment variables
   - Database schema
6. Chatbot does NOT hallucinate on book-related queries

---

## Deliverables Checklist

- [ ] `/sp.constitution`
- [ ] `/sp.specify`
- [ ] `/sp.plan`
- [ ] `/sp.tasks`
- [ ] `/sp.implementations`
- [ ] GitHub repository (public)
- [ ] Live deployed RAG chatbot

---

## Writing Style Rules

- Flesch-Kincaid grade **8–10**
- Define technical terms on first mention
- Include at least **one diagram per chapter** (Mermaid format)

Example diagram:
```mermaid
flowchart TD
User --> FastAPI --> Qdrant --> FastAPI --> User
```

## Response snapshot

Updated the project constitution to version 1.0.0, incorporating the new content provided. Flagged dependent templates for manual follow-up.

## Outcome

- ✅ Impact: Constitution updated with new content and version.
- 🧪 Tests: N/A
- 📁 Files: Modified .specify/memory/constitution.md
- 🔁 Next prompts: User to acknowledge update and potentially proceed with further commands.
- 🧠 Reflection: Successfully updated the constitution and generated an impact report. The PHR script failure was handled gracefully by using agent-native file writing.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script not found.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure PHR creation script is available or improve agent-native PHR creation.
