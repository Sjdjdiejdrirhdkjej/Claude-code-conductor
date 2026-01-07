import { Command } from 'commander';
import chalk from 'chalk';

export function registerInitCommand(program: Command) {
  program
    .command('init')
    .description('Initialize Conductor commands in the workspace')
    .action(() => {
      console.log(chalk.blue('Init command initiated'));
    });
}
