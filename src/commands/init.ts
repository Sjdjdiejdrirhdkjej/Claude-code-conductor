import { Command } from 'commander';
import chalk from 'chalk';
import { CommandRegistrar } from '../services/CommandRegistrar';

export function registerInitCommand(program: Command) {
  program
    .command('init')
    .description('Initialize Conductor commands in the workspace')
    .action(async () => {
      console.log(chalk.blue('Init command initiated'));
      try {
        await CommandRegistrar.registerCommands(process.cwd());
        console.log(chalk.green('Successfully registered Conductor commands in .claude/commands'));
      } catch (error) {
        console.error(chalk.red('Failed to register commands:'), error);
        process.exit(1);
      }
    });
}
