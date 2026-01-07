import { SetupWizard } from '../../src/services/SetupWizard';
import inquirer from 'inquirer';

jest.mock('inquirer');

describe('SetupWizard Service', () => {
  it('should collect product definition from user', async () => {
    const mockAnswers = {
      productName: 'Test Product',
      productDescription: 'A test product description',
      techStack: 'Node.js, TypeScript',
      guidelines: 'Professional, Concise'
    };

    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockAnswers);

    const result = await SetupWizard.collectProductDefinition();

    expect(result).toEqual(mockAnswers);
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
    
    // Verify validation logic
    const questions = (inquirer.prompt as unknown as jest.Mock).mock.calls[0][0];
    
    // Test productName validation
    const nameQuestion = questions.find((q: any) => q.name === 'productName');
    expect(nameQuestion.validate('')).toBe('Product name is required.');
    expect(nameQuestion.validate('Valid Name')).toBe(true);

    // Test productDescription validation
    const descQuestion = questions.find((q: any) => q.name === 'productDescription');
    expect(descQuestion.validate('')).toBe('Description is required.');
    expect(descQuestion.validate('Valid Description')).toBe(true);
  });
});
