import { Command } from 'commander';
import chalk from 'chalk';

export function registerStatusCommand(program: Command) {
  program
    .command('status')
    .description('Check the status of project tracks')
    .action(() => {
      console.log(chalk.yellow('Status command is not yet implemented.'));
    });
}
