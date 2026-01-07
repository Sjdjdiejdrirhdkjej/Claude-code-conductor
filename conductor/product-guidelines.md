# Product Guidelines: Claude Code Conductor

## Prose & Tone
-   **Tone:** Professional, Minimalist, Direct.
-   **Voice:** The CLI should speak as a tool, not a person. Avoid "I will..." or "Let's...". Use imperative verbs (e.g., "Analyzing project...", "Generating plan...").
-   **Verbosity:** Concise. Provide only essential information. Success messages should be brief. Errors should be actionable.

## Visual Identity (CLI)
-   **Formatting:** Use standard ANSI colors for status indicators (Green=Success, Yellow=Warning, Red=Error).
-   **Structure:** Use whitespace effectively to separate distinct sections of output.
-   **Decorations:** Minimal. Avoid excessive emojis or ASCII art. Use standard loading spinners for long-running processes.

## Interaction Patterns
-   **Input:** Default to "Yes/No" or numeric selection for multiple choices.
-   **Defaults:** Always provide sensible defaults for prompts (displayed in brackets, e.g., `[Y/n]`).
-   **Confirmation:** Require explicit confirmation for destructive actions.
