#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const program = new Command();

// Read package.json securely
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

program
  .version(packageJson.version)
  .description(chalk.blue('Conductor: A context-driven wrapper for Claude Code'));

program.action(() => {
  console.log(chalk.green('Welcome to Conductor!'));
  program.help();
});

program.parse(process.argv);
