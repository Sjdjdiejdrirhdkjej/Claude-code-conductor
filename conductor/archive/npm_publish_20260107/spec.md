# Specification: NPM Publication & Slash Command Registration

## 1. Overview
This track prepares the `claude-conductor` package for NPM publication and implements a mechanism to register its functionalities as custom slash commands within the user's Claude Code environment. The goal is to allow users to install the package and easily set up commands like `/conductor:setup`, `/conductor:implement`, and `/conductor:status` to boost their workflow productivity.

## 2. Functional Requirements

### 2.1 NPM Configuration
-   **Package Metadata:** Ensure `package.json` is correctly configured for publication (name, version, description, main, bin).
-   **Executable Bin:** Verify `bin/claude-conductor.ts` is correctly mapped in `package.json` to be executable via `npx` or global install.
-   **Dependencies:** Audit dependencies to ensure `devDependencies` and `dependencies` are correctly separated.

### 2.2 Command Registration (`init` command)
-   **Trigger:** A new command `claude-conductor init` (or `npx claude-conductor init`) must be implemented.
-   **Functionality:**
    1.  **Detection:** Detect the presence of the `.claude/commands` directory in the user's workspace.
    2.  **Creation:** If the directory does not exist, create it.
    3.  **Registration:** Generate executable scripts or configuration files within `.claude/commands/` that map to the underlying `claude-conductor` CLI.
        -   **Target Commands:**
            -   `/conductor:setup` -> calls `claude-conductor setup`
            -   `/conductor:implement` -> calls `claude-conductor implement` (placeholder if not yet implemented)
            -   `/conductor:status` -> calls `claude-conductor status` (placeholder if not yet implemented)
    4.  **Idempotency:** If the commands already exist, update them or skip gracefully (do not break existing configs).
    5.  **Output:** Inform the user which commands were registered and how to use them.

## 3. Non-Functional Requirements
-   **Ease of Use:** The `init` process should be single-step and require minimal user intervention.
-   **Safety:** Do not overwrite unrelated files in `.claude/commands`.

## 4. Acceptance Criteria
-   [ ] `package.json` passes `npm publish --dry-run` checks.
-   [ ] Running `npx claude-conductor init` creates/updates the `.claude/commands` directory.
-   [ ] After running `init`, files exist in `.claude/commands` corresponding to `setup`, `implement`, and `status`.
-   [ ] These generated commands successfully invoke the `claude-conductor` CLI.
