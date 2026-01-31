"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDiscovery = exports.ProjectType = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
var ProjectType;
(function (ProjectType) {
    ProjectType["GREENFIELD"] = "GREENFIELD";
    ProjectType["BROWNFIELD"] = "BROWNFIELD";
})(ProjectType || (exports.ProjectType = ProjectType = {}));
const BROWNFIELD_INDICATORS = [
    '.git',
    'package.json',
    'pom.xml',
    'build.gradle',
    'build.gradle.kts',
    'requirements.txt',
    'Pipfile',
    'pyproject.toml',
    'Cargo.toml',
    'go.mod',
    'composer.json',
    'Gemfile',
    'mix.exs',
    'Makefile',
    'README.md',
    'README.txt'
];
class ProjectDiscovery {
    static async detectType(cwd) {
        if (!cwd) {
            return ProjectType.GREENFIELD;
        }
        try {
            // Check for specific indicator files/directories
            for (const indicator of BROWNFIELD_INDICATORS) {
                const indicatorPath = path_1.default.join(cwd, indicator);
                const exists = await fs_extra_1.default.pathExists(indicatorPath);
                if (exists) {
                    return ProjectType.BROWNFIELD;
                }
            }
        }
        catch (error) {
            // If error occurs during discovery, default to Greenfield
        }
        return ProjectType.GREENFIELD;
    }
}
exports.ProjectDiscovery = ProjectDiscovery;
