import { Command } from 'commander';
import { registerInitCommand } from '../../src/commands/init';

describe('Init Command', () => {
  let program: Command;

  beforeEach(() => {
    program = new Command();
  });

  it('should register init command', () => {
    registerInitCommand(program);
    const cmd = program.commands.find(c => c.name() === 'init');
    expect(cmd).toBeDefined();
    expect(cmd?.description()).toContain('workspace');
  });
});
