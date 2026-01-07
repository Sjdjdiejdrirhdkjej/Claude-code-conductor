import { registerSetupCommand } from '../../src/commands/setup';
import { ProjectDiscovery, ProjectType } from '../../src/services/ProjectDiscovery';
import { SetupWizard } from '../../src/services/SetupWizard';
import { FileGenerator } from '../../src/services/FileGenerator';
import { Command } from 'commander';

jest.mock('../../src/services/ProjectDiscovery');
jest.mock('../../src/services/SetupWizard');
jest.mock('../../src/services/FileGenerator');

describe('Setup Command Integration', () => {
  let program: Command;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    program = new Command();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should execute the full setup flow', async () => {
    registerSetupCommand(program);

    // Mock Service Responses
    (ProjectDiscovery.detectType as jest.Mock).mockResolvedValue(ProjectType.GREENFIELD);
    (SetupWizard.collectProductDefinition as jest.Mock).mockResolvedValue({
      productName: 'IntegrationApp',
      productDescription: 'Desc',
      techStack: 'Stack',
      guidelines: 'Guide'
    });
    (FileGenerator.generateFiles as jest.Mock).mockResolvedValue(undefined);

    // Execute command
    await program.parseAsync(['node', 'test', 'setup']);

    // Verify Discovery
    expect(ProjectDiscovery.detectType).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('GREENFIELD'));

    // Verify Wizard
    expect(SetupWizard.collectProductDefinition).toHaveBeenCalled();

    // Verify Generator
    expect(FileGenerator.generateFiles).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ productName: 'IntegrationApp' })
    );
  });
});
