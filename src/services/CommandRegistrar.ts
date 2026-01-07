import fs from 'fs-extra';
import path from 'path';

export class CommandRegistrar {
  static async ensureCommandsDir(cwd: string): Promise<string> {
    const commandsDir = path.join(cwd, '.claude/commands');
    await fs.ensureDir(commandsDir);
    return commandsDir;
  }

  static async registerCommands(cwd: string): Promise<void> {
    const commandsDir = await this.ensureCommandsDir(cwd);
    const commands = ['setup', 'implement', 'status'];

    for (const cmd of commands) {
      const scriptPath = path.join(commandsDir, `conductor:${cmd}`);
      const content = `#!/bin/sh\nnpx claude-conductor ${cmd} "$@"\n`;
      
      await fs.writeFile(scriptPath, content);
      await fs.chmod(scriptPath, '755');
    }
  }
}
