"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImplementCommand = registerImplementCommand;
const chalk_1 = __importDefault(require("chalk"));
function registerImplementCommand(program) {
    program
        .command('implement')
        .description('Implement a selected track')
        .action(() => {
        console.log(chalk_1.default.yellow('Implement command is not yet implemented.'));
    });
}
