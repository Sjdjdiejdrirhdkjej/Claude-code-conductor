import fs from 'fs-extra';
import path from 'path';
import { CommandRegistrar } from '../../src/services/CommandRegistrar';

jest.mock('fs-extra');

describe('CommandRegistrar', () => {
  const mockCwd = '/mock/cwd';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should ensure the commands directory exists', async () => {
    const commandsDir = path.join(mockCwd, '.claude/commands');
    (fs.ensureDir as jest.Mock).mockResolvedValue(undefined);

    await CommandRegistrar.ensureCommandsDir(mockCwd);

    expect(fs.ensureDir).toHaveBeenCalledWith(commandsDir);
  });

  it('should generate command scripts', async () => {
    const commandsDir = path.join(mockCwd, '.claude/commands');
    (fs.ensureDir as jest.Mock).mockResolvedValue(undefined);
    (fs.writeFile as unknown as jest.Mock).mockResolvedValue(undefined);
    (fs.chmod as unknown as jest.Mock).mockResolvedValue(undefined);

    await CommandRegistrar.registerCommands(mockCwd);

    const commands = ['setup', 'implement', 'status'];
    for (const cmd of commands) {
      const expectedPath = path.join(commandsDir, `conductor:${cmd}`);
      expect(fs.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.stringContaining(`npx claude-code-conductor ${cmd}`)
      );
      expect(fs.chmod).toHaveBeenCalledWith(expectedPath, '755');
    }
  });
});
