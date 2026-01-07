# Plan: NPM Publication & Slash Command Registration

## Phase 1: NPM & CLI Configuration [checkpoint: 7daa017]
- [x] Task: Audit and update `package.json` metadata (bin, main, files) and dependencies [5a699a6]
- [x] Task: Implement `status` and `implement` command stubs in CLI to ensure targets exist [1e4a317]
- [x] Task: Conductor - User Manual Verification 'NPM & CLI Configuration' (Protocol in workflow.md) [7daa017]
- [ ] Task: Conductor - User Manual Verification 'NPM & CLI Configuration' (Protocol in workflow.md)

## Phase 2: Init Command Implementation
- [ ] Task: Create `init` command structure and register it in `bin/claude-conductor.ts`
- [ ] Task: Implement `CommandRegistrar` service to handle `.claude/commands` directory detection and creation
- [ ] Task: Implement logic to generate shell scripts/configs for `/conductor:*` commands
- [ ] Task: Conductor - User Manual Verification 'Init Command Implementation' (Protocol in workflow.md)

## Phase 3: Validation & Polish
- [ ] Task: Verify `npm publish --dry-run` succeeds
- [ ] Task: End-to-end test: Run `init` and verify generated commands invoke the CLI correctly
- [ ] Task: Conductor - User Manual Verification 'Validation & Polish' (Protocol in workflow.md)
