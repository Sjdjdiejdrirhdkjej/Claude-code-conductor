# Product Guide: Claude Conductor

## Initial Concept
Create an npm package for Claude code to be a wrapper around Claude code. Make it be exactly like Gemini cli conductor. Research multiple websites and sources before building.

## Product Vision
To provide a structured, context-driven development workflow for Claude Code users, mirroring the functionality of the Gemini CLI Conductor. This tool will act as a project manager, ensuring AI agents adhere to consistent documentation and plans.

## Core Features
-   **Project Initialization:** Interactive wizard to classify projects (Greenfield/Brownfield) and set up the `conductor/` directory structure.
-   **Command Integration:** Automated registration of `conductor` commands (`setup`, `implement`, `status`) as native slash commands in the Claude Code environment.
-   **Context Management:** Automated generation and maintenance of `product.md`, `tech-stack.md`, and `product-guidelines.md`.
-   **Track System:** A "Tracks" based workflow (`tracks.md`) to manage feature development.
-   **Planning Engine:** Automated generation of detailed `plan.md` and `spec.md` files for each track.
-   **CLI Wrapper:** A unified CLI command (e.g., `claude-code-conductor`) that wraps the underlying Claude Code execution.

## User Experience
-   **Interactive Mode:** CLI prompts for setup and decision-making.
-   **Automated Execution:** "Implement" mode to execute plans step-by-step.
-   **Transparency:** All context and state are stored in readable Markdown/JSON files within the user's project.
