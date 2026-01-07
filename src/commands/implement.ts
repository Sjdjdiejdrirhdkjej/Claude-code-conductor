import { Command } from 'commander';
import chalk from 'chalk';

export function registerImplementCommand(program: Command) {
  program
    .command('implement')
    .description('Implement a selected track')
    .action(() => {
      console.log(chalk.yellow('Implement command is not yet implemented.'));
    });
}
