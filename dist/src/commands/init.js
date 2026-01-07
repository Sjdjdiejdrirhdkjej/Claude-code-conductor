"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInitCommand = registerInitCommand;
const chalk_1 = __importDefault(require("chalk"));
const CommandRegistrar_1 = require("../services/CommandRegistrar");
function registerInitCommand(program) {
    program
        .command('init')
        .description('Initialize Conductor commands in the workspace')
        .action(async () => {
        console.log(chalk_1.default.blue('Init command initiated'));
        try {
            await CommandRegistrar_1.CommandRegistrar.registerCommands(process.cwd());
            console.log(chalk_1.default.green('Successfully registered Conductor commands in .claude/commands'));
        }
        catch (error) {
            console.error(chalk_1.default.red('Failed to register commands:'), error);
            process.exit(1);
        }
    });
}
