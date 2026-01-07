# Claude Code Conductor

> A context-driven wrapper for Claude Code to enforce spec-driven development.

**Claude Code Conductor** is a CLI tool that wraps [Claude Code](https://docs.anthropic.com/claude/docs/claude-code) to provide a structured, context-aware development workflow. It ensures that every session starts with the correct context (`product.md`, `tech-stack.md`, `plan.md`) and enforces a disciplined "Spec -> Plan -> Implement" cycle.

## Features

-   **Context Management:** Automatically loads relevant project documentation into Claude's context.
-   **Track System:** Manages feature development through "Tracks" (`tracks.md`) with dedicated specs and plans.
-   **Workflow Enforcement:** Guides users through the proper development lifecycle (Spec, Plan, Red, Green, Refactor).
-   **Slash Command Integration:** Registers commands like `/conductor:setup`, `/conductor:implement`, and `/conductor:status` directly in Claude Code.

## Installation

```bash
npm install -g claude-code-conductor
```

## Usage

### 1. Initialize a Project

In your project root:

```bash
claude-code-conductor setup
```

This will:
-   Analyze your project.
-   Create the `conductor/` directory.
-   Generate `product.md`, `tech-stack.md`, etc.

### 2. Register Slash Commands

To use Conductor inside Claude Code:

```bash
claude-code-conductor init
```

This registers `/conductor:setup`, `/conductor:implement`, etc., in your `.claude/commands/` directory.

### 3. Start a Track

```bash
claude-code-conductor implement
```

Or inside Claude Code:

```
/conductor:implement
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## License

ISC
