# Specification: Rename to Claude Code Conductor

## 1. Overview
The project needs to be renamed from `claude-conductor` to `claude-code-conductor` because the former name is already taken on npm. This change will affect the package metadata, the CLI executable command, and user-facing documentation/strings. This is a "Surface Refactor," meaning internal code identifiers will largely remain unchanged to ensure stability.

## 2. Functional Requirements
1.  **Package Identity:**
    *   Update `package.json` name to `claude-code-conductor`.
    *   Update `package.json` description if necessary to reflect the new identity.
2.  **CLI Command:**
    *   Replace the `claude-conductor` binary command with `claude-code-conductor`.
    *   Rename the bin script (e.g., `bin/claude-conductor.ts` -> `bin/claude-code-conductor.ts`).
    *   Ensure `npm link` or `npm install -g` exposes the new command.
3.  **User Interface:**
    *   Update CLI output headers, help text, and welcome messages to read "Claude Code Conductor".
    *   Update error messages that reference the tool name.

## 3. Documentation
1.  **README:** Update all references to the installation and usage commands.
2.  **Conductor Docs:** Update `conductor/` context files (e.g., `product.md`, `tech-stack.md`) if they reference the CLI command explicitly.

## 4. Out of Scope
1.  Deep refactoring of internal TypeScript classes (e.g., `class ClaudeConductor` will remain as is).
2.  Renaming of internal source files (other than the main bin entry point).
3.  Backward compatibility aliases (the old command will be removed).
