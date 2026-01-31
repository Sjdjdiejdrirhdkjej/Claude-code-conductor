import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export class CommandRegistrar {
  static async ensureCommandsDir(cwd: string): Promise<string> {
    if (!cwd) {
      throw new Error('Current working directory is not defined.');
    }
    const commandsDir = path.join(cwd, '.claude/commands');
    try {
      await fs.ensureDir(commandsDir);
      return commandsDir;
    } catch (error) {
      throw new Error(`Failed to create directory at ${commandsDir}: ${(error as Error).message}`);
    }
  }

  static async registerCommands(cwd: string): Promise<void> {
    const commandsDir = await this.ensureCommandsDir(cwd);
    const commands = ['setup', 'implement', 'status'];

    for (const cmd of commands) {
      const scriptPath = path.join(commandsDir, `conductor:${cmd}`);
      const content = `#!/bin/sh\nnpx claude-code-conductor ${cmd} "$@"\n`;
      
      try {
        await fs.writeFile(scriptPath, content);
        await fs.chmod(scriptPath, '755');
      } catch (error) {
        console.error(chalk.red(`Error registering command "${cmd}" at ${scriptPath}:`), (error as Error).message);
        throw error;
      }
    }
  }
}
