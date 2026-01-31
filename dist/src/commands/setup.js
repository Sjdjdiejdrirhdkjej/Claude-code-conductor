"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSetupCommand = registerSetupCommand;
const chalk_1 = __importDefault(require("chalk"));
const ProjectDiscovery_1 = require("../services/ProjectDiscovery");
const SetupWizard_1 = require("../services/SetupWizard");
const FileGenerator_1 = require("../services/FileGenerator");
function registerSetupCommand(program) {
    program
        .command('setup')
        .description('Initialize or adopt a project into the Conductor workflow')
        .action(async () => {
        console.log(chalk_1.default.blue('Setup command initiated'));
        // 1. Discovery
        const projectType = await ProjectDiscovery_1.ProjectDiscovery.detectType(process.cwd());
        console.log(chalk_1.default.green(`Detected Project Type: ${projectType}`));
        if (projectType === ProjectDiscovery_1.ProjectType.BROWNFIELD) {
            console.log(chalk_1.default.yellow('Note: Existing project structure detected. Setup will adopt existing files.'));
        }
        // 2. Wizard
        const productDefinition = await SetupWizard_1.SetupWizard.collectProductDefinition();
        // 3. Generation
        console.log(chalk_1.default.blue('Generating Conductor files...'));
        await FileGenerator_1.FileGenerator.generateFiles(process.cwd(), productDefinition);
        console.log(chalk_1.default.green('Setup complete! Welcome to Claude Code Conductor.'));
    });
}
