"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupWizard = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
class SetupWizard {
    static async collectProductDefinition() {
        const questions = [
            {
                type: 'input',
                name: 'productName',
                message: 'What is the name of your product?',
                validate: (input) => input.trim() !== '' ? true : 'Product name is required.'
            },
            {
                type: 'input',
                name: 'productDescription',
                message: 'Describe your product (one or two sentences):',
                validate: (input) => input.trim() !== '' ? true : 'Description is required.'
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
        const answers = await inquirer_1.default.prompt(questions);
        return answers;
    }
}
exports.SetupWizard = SetupWizard;
