# VLA Capstone Project

This directory is intended to hold an example project for the Vision-Language-Action (VLA) pipeline.

This project would typically consist of a set of ROS 2 packages that implement the full VLA stack:
-   **Speech-to-Text**: A node that uses Whisper to transcribe speech.
-   **LLM Planner**: A node that takes the transcribed text and generates a plan using an LLM.
-   **Action Executor**: An action server that takes the plan and executes it by calling various robotics modules.
-   **Robot Skills**: A collection of services and action servers that implement the basic skills of the robot (e.g., navigation, manipulation).

Due to the complexity of a full VLA pipeline, this directory is currently a placeholder.
