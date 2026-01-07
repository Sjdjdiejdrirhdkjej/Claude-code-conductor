import fs from 'fs-extra';
import path from 'path';

export class CommandRegistrar {
  static async ensureCommandsDir(cwd: string): Promise<string> {
    const commandsDir = path.join(cwd, '.claude/commands');
    await fs.ensureDir(commandsDir);
    return commandsDir;
  }
}
