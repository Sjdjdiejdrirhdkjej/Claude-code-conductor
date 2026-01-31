import fs from 'fs-extra';
import path from 'path';
import { ProductDefinition } from './SetupWizard';
import chalk from 'chalk';

export class FileGenerator {
  static async generateFiles(cwd: string, definition: ProductDefinition): Promise<void> {
    if (!cwd) {
      throw new Error('Current working directory is not defined.');
    }

    const conductorDir = path.join(cwd, 'conductor');
    
    try {
      await fs.ensureDir(conductorDir);

      // 1. product.md
      const productContent = `# Product: ${definition.productName}\n\n## Description\n${definition.productDescription}\n`;
      await fs.outputFile(path.join(conductorDir, 'product.md'), productContent);

      // 2. tech-stack.md
      const techStackContent = `# Tech Stack\n\n${definition.techStack}\n`;
      await fs.outputFile(path.join(conductorDir, 'tech-stack.md'), techStackContent);

      // 3. product-guidelines.md
      const guidelinesContent = `# Product Guidelines\n\n## Tone & Style\n${definition.guidelines}\n`;
      await fs.outputFile(path.join(conductorDir, 'product-guidelines.md'), guidelinesContent);

      // 4. setup_state.json
      const state = {
        setupComplete: true,
        generatedAt: new Date().toISOString(),
        productName: definition.productName
      };
      await fs.outputJSON(path.join(conductorDir, 'setup_state.json'), state, { spaces: 2 });
    } catch (error) {
      console.error(chalk.red('Failed to generate conductor files:'), (error as Error).message);
      throw error;
    }
  }
}
