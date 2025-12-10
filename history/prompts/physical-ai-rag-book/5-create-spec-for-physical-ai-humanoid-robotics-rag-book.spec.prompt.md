---
id: 5
title: Create Spec for Physical AI & Humanoid Robotics RAG Book
stage: spec
date: 2025-12-04
surface: agent
model: claude-sonnet-4-5-20250929
feature: physical-ai-rag-book
branch: master
user: user
command: /sp.specify
labels: ["spec","feature-creation"]
links:
  spec: specs/2-physical-ai-rag-book/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/2-physical-ai-rag-book/spec.md
 - specs/2-physical-ai-rag-book/checklists/requirements.md
tests:

---

## Prompt

   update the specs with this         # /sp.constitution
Project: Physical AI & The AI-Robot Brain (NVIDIA Isaac)**
- Isaac Sim synthetic data generation
- Isaac ROS perception stack (VSLAM, Nav2, object detection)
- Path planning for humanoid locomotion and manipulation

### **Module 4 — Vision-Language-Action (VLA)**
- Whisper for speech-to-command
- LLMs for cognitive planning and task decomposition
- Multi-modal robotic action pipeline

> Final Capstone: A humanoid robot that **hears → plans → navigates → identifies → manipulates** an object using an integrated simulation + physical deployment pipeline.

---

## Writing Principles
- **Accuracy:** All robotics claims must align with official documentation (ROS 2, Isaac Sim, Unity, Gazebo, Nav2, Whisper, RealSense).
- **Reproducibility:** Code should be runnable end-to-end on Ubuntu 22.04 wHumanoid Robotics — Docusaurus Book + RAG Chatbot

## Core Theme
Physical AI: AI systems that operate in the real world with an understanding of physics, embodiment, and human–robot interaction.

Goal: Bridge the gap between **digital intelligence** (LLMs, planning, perception) and the **physical body** (humanoid robot locomotion, manipulation, and simulation).

Focus: Teach students how to design, simulate, and deploy humanoid robots using **ROS 2, Gazebo, NVIDIA Isaac, and Vision-Language-Action systems**.

---

## Modules (Must be fully covered)

### **Module 1 — The Robotic Nervous System (ROS 2)**
- ROS 2 nodes, topics, services, and actions
- URDF for humanoid morphology
- Python control via rclpy
- Real-time messaging middleware for robot control

### **Module 2 — The Digital Twin (Gazebo & Unity)**
- Physics simulation (gravity, collisions, joints, kinematics)
- Sensor simulation: LiDAR, depth cameras, IMU
- High-fidelity visualization for human-robot interaction

### **Module 3 — ith ROS 2 Humble or Iron.
- **Technical clarity:** Audience = robotics students + AI developers.

---

## Evidence & Citation Standards
- Minimum **40% documentation** from:
  - ROS 2 docs
  - NVIDIA Isaac Sim docs
  - Gazebo and Unity docs
  - RealSense depth camera docs
- Minimum **30 Ros2 + Isaac example repos referenced**
- No unverified robotics blog sources

---

## Platform Requirements (Book + Chatbot Integration)
- **Docusaurus** for book creation and chapters
- **GitHub Pages** deployment
- **FastAPI** backend
- **Neon serverless Postgres** for chat logging
- **Qdrant Cloud Free Tier** for embeddings storage
- **OpenAI Agents / ChatKit SDK** for chatbot orchestration

Chatbot required features:
- Answer questions strictly from book text
- Selected-text question answering (context window from user highlight)
- Citation snippets to chapter/page reference

---

## Hardware Specification Standards (Must teach properly)
- **Workstation GPU:** RTX 4070 Ti minimum (4090 ideal)
- **RAM:** 32–64 GB
- **OS:** Ubuntu 22.04 LTS
- **Edge robotics brain:** Jetson Orin Nano / NX
- **Sensors:** RealSense D435i depth + IMU
- **Robot options:**
  - Unitree Go2 (proxy)
  - Robotis OP3 (mini humanoid)
  - Unitree G1 (full humanoid)

> Must include **both a Simulation Pipeline** and a **Physical Deployment Pipeline**.

---

## Course Structure (Must be represented as chapters)

### Weeks 1–2 — Physical AI Foundations
### Weeks 3–5 — ROS 2 Fundamentals
### Weeks 6–7 — Gazebo Digital Twin Simulation
### Weeks 8–10 — NVIDIA Isaac Perception & Sim-to-Real
### Weeks 11–12 — Humanoid locomotion & manipulation
### Week 13 — Conversational robotics (VLA)

---

## Required Artifacts (Book Deliverables)

- 10+ chapters with runnable code blocks
- 5+ ROS 2 Python packages
- 2+ Gazebo simulation worlds
- 1 Isaac Sim synthetic data project
- 1 Whisper + LLM → actions planner
- 1 capstone pipeline with step-by-step tutorial
- Complete hardware buying guide & cloud alternative guide

---

## Constraints
- Format: Markdown in Docusaurus
- Build using Spek-Kit Plus & Claude Code
- Zero hallucination allowed in code explanation
- All examples must be tested at least once in Ubuntu 22.04 environment

---

## Success Criteria

A reader can:

✔ Create ROS 2 packages (Python) with nodes/topics/services
✔ Simulate a humanoid robot in Gazebo using URDF
✔ Run Isaac Sim for camera & VSLAM pipelines
✔ Execute Nav2 path planning
✔ Control a robot using natural language via Whisper + LLM
✔ Deploy inference to Jetson edge hardware

And the embedded RAG chatbot can:

✔ Answer queries **only** from book content
✔ Provide **citation snippets**
✔ Handle **highlighted user selection RAG**
✔ Run on FastAPI + Neon + Qdrant Cloud

---

## Non-Scope (Explicitly excluded)

- Mechanical fabrication tutorials
- Custom actuator or servo design
- PCB electronics or ARM firmware writing
- Full humanoid building from raw components
- Large-scale cloud robotics optimization

Only **software-side robotics AI** (simulation → control → plan → deploy) is in scope.

---

## Response snapshot

Created the feature specification for "Physical AI & Humanoid Robotics — Docusaurus Book + RAG Chatbot" at `specs/2-physical-ai-rag-book/spec.md` and updated the `requirements.md` checklist.

## Outcome

- ✅ Impact: Feature specification created and validated.
- 🧪 Tests: N/A
- 📁 Files: Created specs/2-physical-ai-rag-book/spec.md and specs/2-physical-ai-rag-book/checklists/requirements.md
- 🔁 Next prompts: The user can now proceed with `/sp.clarify` or `/sp.plan`.
- 🧠 Reflection: Successfully generated the spec and checklist using agent-native tools due to script execution failures. The spec is comprehensive and passed all checklist validations.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script not found.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure PHR creation script is available or improve agent-native PHR creation.
