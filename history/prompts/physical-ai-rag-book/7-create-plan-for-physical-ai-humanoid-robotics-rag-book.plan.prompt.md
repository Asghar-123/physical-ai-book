---
id: 7
title: Create Plan for Physical AI & Humanoid Robotics RAG Book
stage: plan
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: physical-ai-rag-book
branch: master
user: user
command: /sp.plan
labels: ["plan","feature-planning"]
links:
  spec: specs/2-physical-ai-rag-book/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/2-physical-ai-rag-book/plan.md
tests:

---

## Prompt

/sp.plan

Create: architecture sketch, section structure, research approach, quality validation.

Project Title:
AI-Native Textbook + Integrated RAG Chatbot on Physical AI & Humanoid Robotics

Architecture Sketch (High-Level):
- Frontend (Book):
  - Docusaurus documentation site hosted on GitHub Pages
  - Modules become book sections (ROS 2, Gazebo/Unity, NVIDIA Isaac, VLA)
  - Code samples stored in `/examples/` with syntax-highlighting
- Backend (RAG Chatbot):
  - FastAPI application deployed as API endpoint
  - Qdrant Cloud Free Tier as vector store for semantic embeddings
  - Postgres (Neon Serverless) for metadata, user interactions, and query logs
  - OpenAI Agents / ChatKit SDK for retrieval-augmented generation
- Integration:
  - JavaScript widget mounted in Docusaurus pages (`/chat/`)
  - RAG context supports:
    - Page-level retrieval
    - User-selected text retrieval
    - Full-book retrieval with configurable search depth
- CI/CD:
  - GitHub Actions for build + deploy triggers
  - Spec-Kit Plus project folder structure for writing automation

Section Structure (Book Organization):
1. **Introduction to Physical AI**
   - Digital → Physical transition
   - Embodied intelligence overview
   - Why humanoids matter in 2025–2030
2. **Module 1: ROS 2 (Robotic Nervous System)**
   - Nodes, topics, services, actions
   - URDF for humanoids
   - Python agent → ROS bridge (`rclpy`)
3. **Module 2: Gazebo & Unity (Digital Twin)**
   - Physics simulation
   - Sensor simulation
   - LiDAR/Depth/IMU setup walkthroughs
4. **Module 3: NVIDIA Isaac & Isaac ROS (AI-Robot Brain)**
   - Perception and navigation
   - VSLAM
   - Nav2 locomotion
5. **Module 4: VLA — Vision Language Action**
   - GPT + Whisper voice-to-action
   - Cognitive robotics planning
6. **Capstone: Autonomous Humanoid System**
   - Voice command → plan → perception → navigation → manipulation
7. **Hardware Architecture Appendix**
   - Workstation specs
   - Jetson edge kits
   - Mini-lab deployment models (On-Prem & Cloud)
8. **RAG Chatbot Documentation**
   - Embedding strategy
   - Query pipeline
   - User selection mode
   - Evaluation metrics
9. **Glossary + References**

Research Approach:
- Research-concurrent writing (write section → gather sources in real-time)
- Each subsection must contain:
  - Primary source reference from official docs:
    - ROS 2, Gazebo, Unity, Isaac Sim, OpenAI VLA documentation
  - Hardware reference validation (NVIDIA, Intel RealSense, Unitree)
- Minimum 1 practical example per subsection (code snippet, URDF, launch file)
- Minimum 1 figure per major module (architecture diagram, flow illustration)

Decisions Needing Documentation (Options + Tradeoffs):
1. Vector Database:
   - **Qdrant** (cloud free tier) vs Pinecone vs Weaviate
   Tradeoff: cost vs performance vs query latency
2. Embedding Model:
   - OpenAI `text-embedding-3-large` vs local sentence-transformer
   Tradeoff: accuracy vs cost vs privacy
3. Retrieval Strategy:
   - Chunk size + overlap configuration
   - Multi-stage reranking vs single vector search
4. User-Selected Context Mode:
   - Browser DOM selection API vs custom annotation widget
5. CI/CD Strategy:
   - GitHub Pages vs Vercel static hosting
   - GitHub Actions build vs manual script
6. Cloud vs Local Simulation:
   - Isaac Sim on workstation vs AWS g5 instance
   Tradeoff: CapEx vs OpEx

Testing Strategy (Validation Checks):
- **Book Quality Validation**
  - All claims cite primary robotics documentation
  - No section without a diagram or code example
  - APA citation formatting consistent (per constitution)
  - Reading clarity check (Flesch-Kincaid target 11–12)
- **RAG Chatbot Validation**
  - Retrieve passages ONLY from book content
  - Confirm user-selected text prioritization works
  - Latency target: < 1.5s per query within 200-chunk corpus
  - Unit tests on:
    - Embedding creation
    - Qdrant insert/query
    - Postgres logging
- **Functional Acceptance Criteria**
  - Question → answer reproducible using stored content
  - No hallucinations (answer must link to book paragraph)
  - API uptime > 99% during testing phase

Technical Details:
- Use research-concurrent approach (gather sources while writing)
- Follow APA citation style from Constitution
- Organize by phases:
  1. Research (collect docs, papers, specs)
  2. Foundation (outline + architecture decisions)
  3. Analysis (tradeoffs + technology selection)
  4. Synthesis (full writing + chatbot deployment)

Deliverables:
- Docusaurus site with 9 sections (Modules 1-4 fully documented)
- GitHub Pages deployment with CI/CD
- FastAPI RAG backend with three retrieval modes
- Qdrant + Neon integration working
- Code repository with examples tested in ROS 2 Humble on Ubuntu 22.04

Success Criteria:
- Book must be readable by robotics students with no prior ROS experience
- Chatbot answers must be sourced entirely from book content
- All four course modules explicitly documented with labs and examples

## Response snapshot

Successfully created the implementation plan for "AI-Native Textbook + Integrated RAG Chatbot on Physical AI & Humanoid Robotics" at `specs/2-physical-ai-rag-book/plan.md`.

## Outcome

- ✅ Impact: Implementation plan created, including architecture, structure, research, and testing strategies.
- 🧪 Tests: N/A
- 📁 Files: Created specs/2-physical-ai-rag-book/plan.md
- 🔁 Next prompts: User can now proceed with further steps based on the plan.
- 🧠 Reflection: Successfully generated a comprehensive plan based on the user's input, incorporating all required sections and passing the constitution check. PowerShell script failure was handled gracefully.

## Evaluation notes (flywheel)

- Failure modes observed: `setup-plan.ps1` script failed.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure PowerShell scripts are executable in the environment or provide clearer fallback instructions.
