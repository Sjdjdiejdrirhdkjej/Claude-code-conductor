# Plan: Initialize CLI & Core Setup Command

## Phase 1: Project Scaffolding
- [x] Task: Initialize npm project with `package.json` [1d8258b]
- [x] Task: Configure TypeScript (`tsconfig.json`) with strict mode [251aaf6]
- [x] Task: Configure ESLint and Prettier [14073fe]
- [ ] Task: Create project directory structure (`bin`, `src`, `templates`)
- [ ] Task: Conductor - User Manual Verification 'Project Scaffolding' (Protocol in workflow.md)

## Phase 2: Core CLI Infrastructure
- [ ] Task: Install runtime dependencies (`commander`, `inquirer`, `chalk`, `ora`, `fs-extra`)
- [ ] Task: Create CLI entry point `bin/claude-conductor.ts` and verify execution
- [ ] Task: Implement basic `commander` program setup with version and help
- [ ] Task: Conductor - User Manual Verification 'Core CLI Infrastructure' (Protocol in workflow.md)

## Phase 3: Project Discovery & Setup Wizard
- [ ] Task: Implement `conductor:setup` command stub and registration
- [ ] Task: Implement `ProjectDiscovery` service (Greenfield/Brownfield detection logic)
- [ ] Task: Implement `SetupWizard` class with interactive prompts for Product Definition
- [ ] Task: Implement `FileGenerator` service to write `conductor/*.md` files
- [ ] Task: Integrate Discovery, Wizard, and Generator into `conductor:setup` command
- [ ] Task: Conductor - User Manual Verification 'Project Discovery & Setup Wizard' (Protocol in workflow.md)
