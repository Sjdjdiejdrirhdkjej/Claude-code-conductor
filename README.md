# Claude Code Conductor

`claude-code-conductor` is a command-line tool for context-driven development with Claude. It helps you specify, plan, and implement software features using a structured workflow.

## Installation

To install the dependencies and create a symbolic link to the executable, run the following commands from the project root:

```bash
npm install
npm link
```

## Usage

### 1. Setup

Initialize the conductor in your project:

```bash
claude-code-conductor /conductor:setup
```

This will create a `.claude-conductor` directory in your project root.

### 2. Set API Key

Set your Anthropic API key as an environment variable:

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

### 3. Create a New Track

Create a new track for a feature or bug fix:

```bash
claude-code-conductor /conductor:newTrack <track-name>
```

This will create a new directory in `.claude-conductor/tracks/<track-name>` with `spec.md` and `plan.md` files.

### 4. Define the Specification and Plan

Edit the `spec.md` and `plan.md` files to describe the feature and the implementation plan.

### 5. Run the Track

Run the track to generate the code:

```bash
claude-code-conductor /conductor:run <track-name>
```

The generated code will be printed to the console.
