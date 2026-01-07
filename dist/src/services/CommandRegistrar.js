"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistrar = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class CommandRegistrar {
    static async ensureCommandsDir(cwd) {
        const commandsDir = path_1.default.join(cwd, '.claude/commands');
        await fs_extra_1.default.ensureDir(commandsDir);
        return commandsDir;
    }
    static async registerCommands(cwd) {
        const commandsDir = await this.ensureCommandsDir(cwd);
        const commands = ['setup', 'implement', 'status'];
        for (const cmd of commands) {
            const scriptPath = path_1.default.join(commandsDir, `conductor:${cmd}`);
            const content = `#!/bin/sh\nnpx claude-conductor ${cmd} "$@"\n`;
            await fs_extra_1.default.writeFile(scriptPath, content);
            await fs_extra_1.default.chmod(scriptPath, '755');
        }
    }
}
exports.CommandRegistrar = CommandRegistrar;
