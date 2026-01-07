import fs from 'fs-extra';
import path from 'path';

describe('NPM Configuration', () => {
  const packageJsonPath = path.join(__dirname, '../../package.json');
  let packageJson: any;

  beforeAll(async () => {
    packageJson = await fs.readJSON(packageJsonPath);
  });

  it('should have correct metadata', () => {
    expect(packageJson.name).toBe('claude-conductor');
    expect(packageJson.version).toBeDefined();
    expect(packageJson.description).toBeDefined();
    expect(packageJson.license).toBeDefined();
  });

  it('should point bin to a dist file or be executable', () => {
     // Ideally, it should point to dist/bin/claude-conductor.js for production
     // But currently it points to ts file. We should update this to point to the compiled version
     // AND ensure we have a build script.
     expect(packageJson.bin['claude-conductor']).toMatch(/dist\/bin\/claude-conductor\.js/);
  });

  it('should have a files allowlist', () => {
    expect(packageJson.files).toBeDefined();
    expect(packageJson.files).toContain('dist');
    // expect(packageJson.files).toContain('bin'); // Source bin not needed if compiled
    expect(packageJson.files).toContain('README.md');
  });

  it('should have a build script', () => {
    expect(packageJson.scripts.build).toBeDefined();
  });
});
