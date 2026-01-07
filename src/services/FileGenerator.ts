import fs from 'fs-extra';
import path from 'path';
import { ProductDefinition } from './SetupWizard';

export class FileGenerator {
  static async generateFiles(cwd: string, definition: ProductDefinition): Promise<void> {
    const conductorDir = path.join(cwd, 'conductor');
    await fs.ensureDir(conductorDir);

    // 1. product.md
    const productContent = `# Product: ${definition.productName}

## Description
${definition.productDescription}
`;
    await fs.outputFile(path.join(conductorDir, 'product.md'), productContent);

    // 2. tech-stack.md
    const techStackContent = `# Tech Stack

${definition.techStack}
`;
    await fs.outputFile(path.join(conductorDir, 'tech-stack.md'), techStackContent);

    // 3. product-guidelines.md
    const guidelinesContent = `# Product Guidelines

## Tone & Style
${definition.guidelines}
`;
    await fs.outputFile(path.join(conductorDir, 'product-guidelines.md'), guidelinesContent);

    // 4. setup_state.json
    const state = {
      setupComplete: true,
      generatedAt: new Date().toISOString(),
      productName: definition.productName
    };
    await fs.outputJSON(path.join(conductorDir, 'setup_state.json'), state, { spaces: 2 });
  }
}
