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
    'README.md', // Presence of README often indicates an initialized project
    'README.txt'
];
class ProjectDiscovery {
    static async detectType(cwd) {
        // Check for specific indicator files/directories
        for (const indicator of BROWNFIELD_INDICATORS) {
            const exists = await fs_extra_1.default.pathExists(path_1.default.join(cwd, indicator));
            if (exists) {
                return ProjectType.BROWNFIELD;
            }
        }
        // Also check if directory is not empty (ignoring system files like .DS_Store if we wanted to be robust, but strict empty check is usually fine for "Greenfield")
        // For now, if no indicators are found, we assume Greenfield. 
        // Ideally, we might check if *any* file exists, but "Greenfield" usually implies we are setting up completely new structure.
        // However, the spec says "Check for .git... Check for package.json... If no indicators, classify as Greenfield".
        return ProjectType.GREENFIELD;
    }
}
exports.ProjectDiscovery = ProjectDiscovery;
