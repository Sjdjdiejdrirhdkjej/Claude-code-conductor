#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const setup_1 = require("../src/commands/setup");
const implement_1 = require("../src/commands/implement");
const status_1 = require("../src/commands/status");
const init_1 = require("../src/commands/init");
const program = new commander_1.Command();
// Read package.json securely
let version = '0.0.1';
try {
    // Try to find package.json relative to this file
    // In dev: bin/../package.json
    // In dist: dist/bin/../../package.json
    const possiblePaths = [
        path_1.default.join(__dirname, '../package.json'),
        path_1.default.join(__dirname, '../../package.json')
    ];
    for (const p of possiblePaths) {
        if (fs_1.default.existsSync(p)) {
            const packageJson = JSON.parse(fs_1.default.readFileSync(p, 'utf8'));
            version = packageJson.version;
            break;
        }
    }
}
catch (error) {
    // Fallback to default version if reading fails
}
program
    .version(version)
    .description(chalk_1.default.blue('Claude Code Conductor: A context-driven wrapper for Claude Code'));
(0, setup_1.registerSetupCommand)(program);
(0, implement_1.registerImplementCommand)(program);
(0, status_1.registerStatusCommand)(program);
(0, init_1.registerInitCommand)(program);
program.action(() => {
    console.log(chalk_1.default.green('Welcome to Claude Code Conductor!'));
    program.help();
});
program.parse(process.argv);
