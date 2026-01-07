import { FileGenerator } from '../../src/services/FileGenerator';
import { ProductDefinition } from '../../src/services/SetupWizard';
import fs from 'fs-extra';
import path from 'path';

jest.mock('fs-extra');

describe('FileGenerator Service', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const testCwd = '/test/project';
  const mockDefinition: ProductDefinition = {
    productName: 'TestApp',
    productDescription: 'A testing app',
    techStack: 'TypeScript',
    guidelines: 'Clean code'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create conductor directory and generate all required files', async () => {
    await FileGenerator.generateFiles(testCwd, mockDefinition);

    const conductorPath = path.join(testCwd, 'conductor');
    
    // Check if directory creation was called
    expect(mockFs.ensureDir).toHaveBeenCalledWith(conductorPath);

    // Check if files were written
    expect(mockFs.outputFile).toHaveBeenCalledTimes(3);
    
    // Check product.md content
    expect(mockFs.outputFile).toHaveBeenCalledWith(
        path.join(conductorPath, 'product.md'),
        expect.stringContaining('# Product: TestApp')
    );
    expect(mockFs.outputFile).toHaveBeenCalledWith(
        path.join(conductorPath, 'product.md'),
        expect.stringContaining('A testing app')
    );

    // Check tech-stack.md content
    expect(mockFs.outputFile).toHaveBeenCalledWith(
        path.join(conductorPath, 'tech-stack.md'),
        expect.stringContaining('TypeScript')
    );

    // Check product-guidelines.md content
    expect(mockFs.outputFile).toHaveBeenCalledWith(
        path.join(conductorPath, 'product-guidelines.md'),
        expect.stringContaining('Clean code')
    );

    // Check setup_state.json content
    expect(mockFs.outputJSON).toHaveBeenCalledWith(
        path.join(conductorPath, 'setup_state.json'),
        expect.objectContaining({
            setupComplete: true,
            generatedAt: expect.any(String)
        }),
        expect.anything() // options
    );
  });
});
