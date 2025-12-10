# Implementation Plan: AI-Native Textbook + Integrated RAG Chatbot on Physical AI & Humanoid Robotics

**Branch**: `2-physical-ai-rag-book` | **Date**: 2025-12-04 | **Spec**: specs/2-physical-ai-rag-book/spec.md
**Input**: Feature specification from `/specs/2-physical-ai-rag-book/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the architecture, section structure, research approach, and quality validation for the "AI-Native Textbook + Integrated RAG Chatbot on Physical AI & Humanoid Robotics" project. The primary goal is to create a complete, structured course textbook that teaches Physical AI and Humanoid Robotics, integrated with a RAG chatbot for interactive learning.

## Technical Context

**Language/Version**: Python, TypeScript (for frontend widget)
**Primary Dependencies**: ROS 2, Gazebo, Unity, Isaac Sim, NVIDIA Isaac ROS, SLAM, Whisper, OpenAI GPT, FastAPI, Neon serverless Postgres, Qdrant Cloud, OpenAI Agents / ChatKit SDK, Docusaurus.
**Storage**: Neon serverless Postgres (metadata, user interactions, query logs), Qdrant Cloud (vector store for semantic embeddings).
**Testing**: All examples must be tested at least once in Ubuntu 22.04 environment with ROS 2 Humble or Iron.
**Target Platform**: Docusaurus documentation site hosted on GitHub Pages (Frontend), FastAPI application deployed as API endpoint (Backend), Jetson Orin Nano / NX (Edge robotics brain), RTX 4070 Ti minimum (Workstation GPU).
**Project Type**: Web application (Docusaurus frontend, FastAPI backend for chatbot)
**Performance Goals**: RAG chatbot latency target: < 1.5s per query within a 200-chunk corpus.
**Constraints**: Book format: Docusaurus 3.x website with sidebar navigation; Deployment: Must build successfully on GitHub Pages; Length: Minimum 80 pages, 10+ chapters; RAG Functionality: Local contextual retrieval (selected text only), Persistent query logging, Automatic passage citation; Tech Stack constraints: FastAPI (backend), OpenAI Agents OR ChatKit SDK, Neon Postgres, Qdrant Cloud (free tier), TypeScript frontend widget, Python backend; Build using Spek-Kit Plus & Claude Code; Zero hallucination allowed in code explanation.
**Scale/Scope**: Create a complete, structured course textbook (12–14 chapters) and an integrated RAG chatbot. Teach students how to design, simulate, and deploy humanoid robots.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-driven writing**: All chapters originate from approved specs created using Spec-Kit Plus. (The book creation is spec-driven, aligning with this principle.)
- [x] **Technical accuracy**: Every explanation must reflect current practice in OpenAI Agents SDK, FastAPI, Neon Postgres, and Qdrant Cloud. (The plan explicitly lists these technologies and emphasizes accuracy and primary sources.)
- [x] **Developer clarity**: Content is targeted at junior-to-intermediate AI engineers. (The target audience is clearly defined in the spec.)
- [x] **Reproducibility**: Readers must be able to follow steps and reproduce the entire book + chatbot setup. (The plan includes runnable code blocks, environment variable setup, and testing requirements for reproducibility.)

## Project Structure

### Documentation (this feature)

```text
specs/2-physical-ai-rag-book/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

db/
└── migrations/

qdrant/
└── setup_scripts/

examples/
└── ros2_packages/
└── gazebo_simulations/
└── isaac_sim_projects/
└── whisper_llm_actions/

```

**Structure Decision**: The project will follow a monorepo-like structure with `frontend/` for the Docusaurus book, `backend/` for the FastAPI RAG chatbot, and dedicated directories for `db/` migrations, `qdrant/` setup scripts, and `examples/` for all practical code snippets and project files.

## Complexity Tracking

> **No constitution violations detected that require justification at this stage.**

## Research Approach

- Research-concurrent writing (write section → gather sources in real-time)
- Each subsection must contain:
  - Primary source reference from official docs:
    - ROS 2, Gazebo, Unity, Isaac Sim, OpenAI VLA documentation
  - Hardware reference validation (NVIDIA, Intel RealSense, Unitree)
- Minimum 1 practical example per subsection (code snippet, URDF, launch file)
- Minimum 1 figure per major module (architecture diagram, flow illustration)

## Decisions Needing Documentation (Options + Tradeoffs):

1.  **Vector Database:**
    - **Qdrant** (cloud free tier) vs Pinecone vs Weaviate
    Tradeoff: cost vs performance vs query latency
2.  **Embedding Model:**
    - OpenAI `text-embedding-3-large` vs local sentence-transformer
    Tradeoff: accuracy vs cost vs privacy
3.  **Retrieval Strategy:**
    - Chunk size + overlap configuration
    - Multi-stage reranking vs single vector search
4.  **User-Selected Context Mode:**
    - Browser DOM selection API vs custom annotation widget
5.  **CI/CD Strategy:**
    - GitHub Pages vs Vercel static hosting
    - GitHub Actions build vs manual script
6.  **Cloud vs Local Simulation:**
    - Isaac Sim on workstation vs AWS g5 instance
    Tradeoff: CapEx vs OpEx

## Testing Strategy (Validation Checks):

-   **Book Quality Validation**
    -   All claims cite primary robotics documentation
    -   No section without a diagram or code example
    -   APA citation formatting consistent (per constitution)
    -   Reading clarity check (Flesch-Kincaid target 11–12)
-   **RAG Chatbot Validation**
    -   Retrieve passages ONLY from book content
    -   Confirm user-selected text prioritization works
    -   Latency target: < 1.5s per query within 200-chunk corpus
    -   Unit tests on:
        -   Embedding creation
        -   Qdrant insert/query
        -   Postgres logging
-   **Functional Acceptance Criteria**
    -   Question → answer reproducible using stored content
    -   No hallucinations (answer must link to book paragraph)
    -   API uptime > 99% during testing phase

## Technical Details:

- Use research-concurrent approach (gather sources while writing)
- Follow APA citation style from Constitution
- Organize by phases:
  1. Research (collect docs, papers, specs)
  2. Foundation (outline + architecture decisions)
  3. Analysis (tradeoffs + technology selection)
  4. Synthesis (full writing + chatbot deployment)

## Deliverables:

- Docusaurus site with 9 sections (Modules 1-4 fully documented)
- GitHub Pages deployment with CI/CD
- FastAPI RAG backend with three retrieval modes
- Qdrant + Neon integration working
- Code repository with examples tested in ROS 2 Humble on Ubuntu 22.04

## Success Criteria:

- Book must be readable by robotics students with no prior ROS experience
- Chatbot answers must be sourced entirely from book content
- All four course modules explicitly documented with labs and examples
