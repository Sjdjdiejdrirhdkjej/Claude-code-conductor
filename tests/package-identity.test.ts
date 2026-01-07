import fs from 'fs';
import path from 'path';

describe('Package Identity', () => {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  it('should have the correct package name', () => {
    expect(packageJson.name).toBe('claude-code-conductor');
  });

  it('should have the correct description', () => {
     // Optional, but good practice if we change description too
     expect(packageJson.description).toBeDefined(); 
  });
  
  it('should point to the correct bin file', () => {
      expect(packageJson.bin['claude-code-conductor']).toBeDefined();
  });
});
