import inquirer from 'inquirer';

export interface ProductDefinition {
  productName: string;
  productDescription: string;
  techStack: string;
  guidelines: string;
}

export class SetupWizard {
  static async collectProductDefinition(): Promise<ProductDefinition> {
    const questions = [
      {
        type: 'input',
        name: 'productName',
        message: 'What is the name of your product?',
        validate: (input: string) => input.trim() !== '' ? true : 'Product name is required.'
      },
      {
        type: 'input',
        name: 'productDescription',
        message: 'Describe your product (one or two sentences):',
        validate: (input: string) => input.trim() !== '' ? true : 'Description is required.'
      },
      {
        type: 'input',
        name: 'techStack',
        message: 'What is your primary tech stack? (e.g., Node.js, React, Python)',
        default: 'Node.js, TypeScript'
      },
      {
        type: 'input',
        name: 'guidelines',
        message: 'What is the desired tone and style for the product? (e.g., Professional, Playful)',
        default: 'Professional, Concise, User-Centric'
      }
    ];

    const answers = await inquirer.prompt(questions);
    return answers as ProductDefinition;
  }
}
