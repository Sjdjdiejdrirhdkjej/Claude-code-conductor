import { ProjectDiscovery, ProjectType } from '../../src/services/ProjectDiscovery';
import fs from 'fs-extra';
import path from 'path';

jest.mock('fs-extra');

describe('ProjectDiscovery Service', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const testPath = '/test/path';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect GREENFIELD if no indicators are found', async () => {
    // Mock pathExists to return false for all checks
    (mockFs.pathExists as jest.Mock).mockResolvedValue(false);

    const type = await ProjectDiscovery.detectType(testPath);
    expect(type).toBe(ProjectType.GREENFIELD);
  });

  it('should detect BROWNFIELD if package.json exists', async () => {
    // Mock pathExists to return true for package.json
    (mockFs.pathExists as jest.Mock).mockImplementation(async (p: string) => {
        if (p.endsWith('package.json')) return true;
        return false;
    });

    const type = await ProjectDiscovery.detectType(testPath);
    expect(type).toBe(ProjectType.BROWNFIELD);
  });
  
  it('should detect BROWNFIELD if .git directory exists', async () => {
    (mockFs.pathExists as jest.Mock).mockImplementation(async (p: string) => {
        if (p.endsWith('.git')) return true;
        return false;
    });

    const type = await ProjectDiscovery.detectType(testPath);
    expect(type).toBe(ProjectType.BROWNFIELD);
  });

  it('should detect BROWNFIELD if other common config files exist (e.g., pom.xml)', async () => {
     (mockFs.pathExists as jest.Mock).mockImplementation(async (p: string) => {
        if (p.endsWith('pom.xml')) return true;
        return false;
    });

    const type = await ProjectDiscovery.detectType(testPath);
    expect(type).toBe(ProjectType.BROWNFIELD);
  });
});

