"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGenerator = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
class FileGenerator {
    static async generateFiles(cwd, definition) {
        if (!cwd) {
            throw new Error('Current working directory is not defined.');
        }
        const conductorDir = path_1.default.join(cwd, 'conductor');
        try {
            await fs_extra_1.default.ensureDir(conductorDir);
            // 1. product.md
            const productContent = `# Product: ${definition.productName}\n\n## Description\n${definition.productDescription}\n`;
            await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'product.md'), productContent);
            // 2. tech-stack.md
            const techStackContent = `# Tech Stack\n\n${definition.techStack}\n`;
            await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'tech-stack.md'), techStackContent);
            // 3. product-guidelines.md
            const guidelinesContent = `# Product Guidelines\n\n## Tone & Style\n${definition.guidelines}\n`;
            await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'product-guidelines.md'), guidelinesContent);
            // 4. setup_state.json
            const state = {
                setupComplete: true,
                generatedAt: new Date().toISOString(),
                productName: definition.productName
            };
            await fs_extra_1.default.outputJSON(path_1.default.join(conductorDir, 'setup_state.json'), state, { spaces: 2 });
        }
        catch (error) {
            console.error(chalk_1.default.red('Failed to generate conductor files:'), error.message);
            throw error;
        }
    }
}
exports.FileGenerator = FileGenerator;
