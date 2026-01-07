# Specification: Initialize CLI & Core Setup Command

## 1. Overview
This track establishes the foundation of the `claude-conductor` npm package. It covers project scaffolding, TypeScript configuration, CLI entry point creation, and the implementation of the primary `conductor:setup` command. This command is responsible for initializing new projects or "adopting" existing ones (Brownfield) into the Conductor workflow.

## 2. Requirements

### 2.1 Project Scaffolding
-   **Package Manager:** `npm`
-   **Language:** TypeScript (Strict mode enabled)
-   **Linter:** ESLint (with TypeScript support)
-   **Formatter:** Prettier
-   **Directory Structure:**
    -   `bin/`: Executable entry points.
    -   `src/`: Source code.
    -   `conductor/`: Default templates (if applicable).
    -   `dist/`: Compiled output.

### 2.2 Core CLI Infrastructure
-   **Dependencies:**
    -   `commander`: For command-line argument parsing.
    -   `inquirer`: For interactive command-line prompts.
    -   `chalk`: For terminal styling.
    -   `ora`: For loading spinners.
    -   `fs-extra`: For file system operations.
-   **Entry Point:** `bin/claude-conductor.ts` (mapped to `bin` in `package.json`).
-   **Execution:** The CLI should be executable via `npx claude-conductor` or globally installed.

### 2.3 Feature: Project Discovery
-   **Logic:**
    -   Check for `.git` directory to detect version control.
    -   Check for `package.json`, `pom.xml`, etc., to detect "Brownfield" status.
    -   If no indicators are found, classify as "Greenfield".
-   **Output:** Display the detected project status to the user.

### 2.4 Feature: Interactive Setup Wizard (`conductor:setup`)
-   **Flow:**
    1.  **Welcome Message:** Display "Welcome to Conductor..."
    2.  **Project Discovery:** Run discovery logic (2.3).
    3.  **Brownfield Handling:**
        -   If Brownfield, warn about uncommitted changes.
        -   Ask for permission to scan.
    4.  **Product Definition:**
        -   Ask "What do you want to build?" (Greenfield) or analyze `README.md` (Brownfield).
        -   Generate `conductor/product.md`.
    5.  **Tech Stack:**
        -   Inquire about or detect the tech stack.
        -   Generate `conductor/tech-stack.md`.
    6.  **Product Guidelines:**
        -   Inquire about tone/style.
        -   Generate `conductor/product-guidelines.md`.
    7.  **Finalization:**
        -   Create `conductor/setup_state.json`.
        -   Summary of actions.

## 3. Implementation Details

### 3.1 `package.json` Scripts
-   `build`: `tsc`
-   `start`: `node dist/index.js`
-   `dev`: `ts-node src/index.ts`
-   `lint`: `eslint src/**/*.ts`

### 3.2 File Generation Templates
-   The setup command should have embedded templates or write logic for:
    -   `conductor/product.md`
    -   `conductor/tech-stack.md`
    -   `conductor/product-guidelines.md`
    -   `conductor/setup_state.json`

## 4. Acceptance Criteria
-   [ ] `npm install` installs all required dependencies.
-   [ ] `npm run build` compiles TypeScript without errors.
-   [ ] Running the CLI executable works.
-   [ ] `conductor:setup` correctly identifies an empty folder as Greenfield.
-   [ ] `conductor:setup` correctly identifies a folder with `package.json` as Brownfield.
-   [ ] The setup wizard successfully generates all required markdown files in the `conductor/` directory.
-   [ ] `conductor/setup_state.json` is created with the correct completion state.
