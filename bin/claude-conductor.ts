#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .version('0.0.1')
  .description(chalk.blue('Conductor: A context-driven wrapper for Claude Code'));

program.action(() => {
  console.log(chalk.green('Welcome to Conductor!'));
});

program.parse(process.argv);
