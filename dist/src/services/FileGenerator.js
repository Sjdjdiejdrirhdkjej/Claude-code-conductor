"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGenerator = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class FileGenerator {
    static async generateFiles(cwd, definition) {
        const conductorDir = path_1.default.join(cwd, 'conductor');
        await fs_extra_1.default.ensureDir(conductorDir);
        // 1. product.md
        const productContent = `# Product: ${definition.productName}

## Description
${definition.productDescription}
`;
        await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'product.md'), productContent);
        // 2. tech-stack.md
        const techStackContent = `# Tech Stack

${definition.techStack}
`;
        await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'tech-stack.md'), techStackContent);
        // 3. product-guidelines.md
        const guidelinesContent = `# Product Guidelines

## Tone & Style
${definition.guidelines}
`;
        await fs_extra_1.default.outputFile(path_1.default.join(conductorDir, 'product-guidelines.md'), guidelinesContent);
        // 4. setup_state.json
        const state = {
            setupComplete: true,
            generatedAt: new Date().toISOString(),
            productName: definition.productName
        };
        await fs_extra_1.default.outputJSON(path_1.default.join(conductorDir, 'setup_state.json'), state, { spaces: 2 });
    }
}
exports.FileGenerator = FileGenerator;
