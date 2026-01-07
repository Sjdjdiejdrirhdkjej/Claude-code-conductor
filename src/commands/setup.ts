import { Command } from 'commander';
import chalk from 'chalk';
import { ProjectDiscovery, ProjectType } from '../services/ProjectDiscovery';
import { SetupWizard } from '../services/SetupWizard';
import { FileGenerator } from '../services/FileGenerator';

export function registerSetupCommand(program: Command) {
  program
    .command('setup')
    .description('Initialize or adopt a project into the Conductor workflow')
    .action(async () => {
      console.log(chalk.blue('Setup command initiated'));

      // 1. Discovery
      const projectType = await ProjectDiscovery.detectType(process.cwd());
      console.log(chalk.green(`Detected Project Type: ${projectType}`));

      if (projectType === ProjectType.BROWNFIELD) {
          console.log(chalk.yellow('Note: Existing project structure detected. Setup will adopt existing files.'));
      }

      // 2. Wizard
      const productDefinition = await SetupWizard.collectProductDefinition();
      
      // 3. Generation
      console.log(chalk.blue('Generating Conductor files...'));
      await FileGenerator.generateFiles(process.cwd(), productDefinition);
      
      console.log(chalk.green('Setup complete! Welcome to Claude Code Conductor.'));
    });
}
