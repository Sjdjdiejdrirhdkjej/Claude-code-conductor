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
});
