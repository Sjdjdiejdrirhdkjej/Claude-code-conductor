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
  'README.md',
  'README.txt'
];

export class ProjectDiscovery {
  static async detectType(cwd: string): Promise<ProjectType> {
    if (!cwd) {
      return ProjectType.GREENFIELD;
    }

    try {
      // Check for specific indicator files/directories
      for (const indicator of BROWNFIELD_INDICATORS) {
        const indicatorPath = path.join(cwd, indicator);
        const exists = await fs.pathExists(indicatorPath);
        if (exists) {
          return ProjectType.BROWNFIELD;
        }
      }
    } catch (error) {
      // If error occurs during discovery, default to Greenfield
    }
    
    return ProjectType.GREENFIELD;
  }
}
