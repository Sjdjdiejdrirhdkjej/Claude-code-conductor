"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistrar = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
class CommandRegistrar {
    static async ensureCommandsDir(cwd) {
        if (!cwd) {
            throw new Error('Current working directory is not defined.');
        }
        const commandsDir = path_1.default.join(cwd, '.claude/commands');
        try {
            await fs_extra_1.default.ensureDir(commandsDir);
            return commandsDir;
        }
        catch (error) {
            throw new Error(`Failed to create directory at ${commandsDir}: ${error.message}`);
        }
    }
    static async registerCommands(cwd) {
        const commandsDir = await this.ensureCommandsDir(cwd);
        const commands = ['setup', 'implement', 'status'];
        for (const cmd of commands) {
            const scriptPath = path_1.default.join(commandsDir, `conductor:${cmd}`);
            const content = `#!/bin/sh\nnpx claude-code-conductor ${cmd} "$@"\n`;
            try {
                await fs_extra_1.default.writeFile(scriptPath, content);
                await fs_extra_1.default.chmod(scriptPath, '755');
            }
            catch (error) {
                console.error(chalk_1.default.red(`Error registering command "${cmd}" at ${scriptPath}:`), error.message);
                throw error;
            }
        }
    }
}
exports.CommandRegistrar = CommandRegistrar;
