#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { registerSetupCommand } from '../src/commands/setup';
import { registerImplementCommand } from '../src/commands/implement';
import { registerStatusCommand } from '../src/commands/status';
import { registerInitCommand } from '../src/commands/init';

const program = new Command();

// Read package.json securely
let version = '0.0.1';
try {
  // Try to find package.json relative to this file
  // In dev: bin/../package.json
  // In dist: dist/bin/../../package.json
  const possiblePaths = [
    path.join(__dirname, '../package.json'),
    path.join(__dirname, '../../package.json')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      const packageJson = JSON.parse(fs.readFileSync(p, 'utf8'));
      version = packageJson.version;
      break;
    }
  }
} catch (error) {
  // Fallback to default version if reading fails
}

program
  .version(version)
  .description(chalk.blue('Claude Code Conductor: A context-driven wrapper for Claude Code'));

registerSetupCommand(program);
registerImplementCommand(program);
registerStatusCommand(program);
registerInitCommand(program);

program.action(() => {
  console.log(chalk.green('Welcome to Claude Code Conductor!'));
  program.help();
});

program.parse(process.argv);
