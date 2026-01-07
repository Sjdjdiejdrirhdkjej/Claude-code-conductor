"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStatusCommand = registerStatusCommand;
const chalk_1 = __importDefault(require("chalk"));
function registerStatusCommand(program) {
    program
        .command('status')
        .description('Check the status of project tracks')
        .action(() => {
        console.log(chalk_1.default.yellow('Status command is not yet implemented.'));
    });
}
