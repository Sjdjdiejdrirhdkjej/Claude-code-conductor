import { exec } from 'child_process';
import path from 'path';
import { Command } from 'commander';
import { registerSetupCommand } from '../src/commands/setup';

const cliPath = path.join(__dirname, '../bin/claude-conductor.ts');

describe('Setup Command (Integration)', () => {
  it('should register and execute the setup command', (done) => {
    exec(`npx ts-node ${cliPath} setup`, (error, stdout, stderr) => {
      expect(stdout).toContain('Setup command initiated'); 
      done();
    });
  }, 10000);
});

describe('Setup Command (Unit)', () => {
  it('should register the setup command on the program', () => {
    const program = new Command();
    const commandSpy = jest.spyOn(program, 'command');
    
    registerSetupCommand(program);
    
    expect(commandSpy).toHaveBeenCalledWith('setup');
    const setupCommand = program.commands.find(cmd => cmd.name() === 'setup');
    expect(setupCommand).toBeDefined();
    expect(setupCommand?.description()).toContain('Initialize or adopt');
  });

  it('should execute the action handler', () => {
     const program = new Command();
     registerSetupCommand(program);
     const setupCommand = program.commands.find(cmd => cmd.name() === 'setup');
     
     // Mock console.log to suppress output and verify call
     const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
     
     // Manually invoke the action handler
     // Commander stores the action handler in private properties or listeners, 
     // but we can trigger it by parsing args if we want to simulate properly, 
     // OR we can just execute the action if we can access it.
     // Accessing internal action handler is tricky in Commander 7+. 
     // Easier to just run program.parse with arguments.
     
     program.parse(['node', 'test', 'setup']);
     
     expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Setup command initiated'));
     consoleSpy.mockRestore();
  });
});

