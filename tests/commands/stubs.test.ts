import { Command } from 'commander';
import { registerImplementCommand } from '../../src/commands/implement';
import { registerStatusCommand } from '../../src/commands/status';

describe('CLI Command Stubs', () => {
  let program: Command;

  beforeEach(() => {
    program = new Command();
  });

  it('should register implement command', () => {
    registerImplementCommand(program);
    const cmd = program.commands.find(c => c.name() === 'implement');
    expect(cmd).toBeDefined();
    expect(cmd?.description()).toContain('Implement');
  });

  it('should register status command', () => {
    registerStatusCommand(program);
    const cmd = program.commands.find(c => c.name() === 'status');
    expect(cmd).toBeDefined();
    expect(cmd?.description()).toContain('status');
  });
});
