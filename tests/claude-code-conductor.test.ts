import { exec } from 'child_process';
import path from 'path';

const cliPath = path.join(__dirname, '../bin/claude-code-conductor.ts');

describe('CLI Entry Point', () => {
  it('should display the version', (done) => {
    exec(`npx ts-node ${cliPath} --version`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).toMatch(/\d+\.\d+\.\d+/);
      done();
    });
  }, 10000); // Increase timeout for ts-node startup

  it('should display welcome message and help on default action', (done) => {
     exec(`npx ts-node ${cliPath}`, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stdout).toContain('Welcome to Claude Code Conductor!');
        expect(stdout).toContain('Usage:');
        done();
     });
  }, 10000);
});
