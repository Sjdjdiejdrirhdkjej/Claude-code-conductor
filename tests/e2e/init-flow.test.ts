import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';

describe('End-to-End: Init and Command Execution', () => {
  const tmpDir = path.join(__dirname, 'tmp-e2e');
  const binPath = path.resolve(__dirname, '../../bin/claude-conductor.ts');
  const commandsDir = path.join(tmpDir, '.claude/commands');

  beforeAll(async () => {
    await fs.ensureDir(tmpDir);
  });

  afterAll(async () => {
    await fs.remove(tmpDir);
  });

  it('should initialize commands and make them executable', (done) => {
    exec(`npx ts-node ${binPath} init`, { cwd: tmpDir }, async (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        done(error);
        return;
      }
      expect(stdout).toContain('Successfully registered');

      const statusCmd = path.join(commandsDir, 'conductor:status');
      const exists = await fs.pathExists(statusCmd);
      expect(exists).toBe(true);

      // Verify content
      const content = await fs.readFile(statusCmd, 'utf8');
      expect(content).toContain('npx claude-conductor status');

      done();
    });
  }, 10000);
});
