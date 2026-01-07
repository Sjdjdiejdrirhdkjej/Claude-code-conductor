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
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

program
  .version(packageJson.version)
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
