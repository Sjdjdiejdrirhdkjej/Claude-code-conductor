import { Command } from 'commander';
import chalk from 'chalk';

export function registerSetupCommand(program: Command) {
  program
    .command('setup')
    .description('Initialize or adopt a project into the Conductor workflow')
    .action(() => {
      console.log(chalk.blue('Setup command initiated'));
    });
}
