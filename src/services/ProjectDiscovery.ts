import fs from 'fs-extra';
import path from 'path';

export enum ProjectType {
  GREENFIELD = 'GREENFIELD',
  BROWNFIELD = 'BROWNFIELD',
}

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

export class ProjectDiscovery {
  static async detectType(cwd: string): Promise<ProjectType> {
    // Check for specific indicator files/directories
    for (const indicator of BROWNFIELD_INDICATORS) {
      const exists = await fs.pathExists(path.join(cwd, indicator));
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
