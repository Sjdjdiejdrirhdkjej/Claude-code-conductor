import { Command } from 'commander';
import { registerSetupCommand } from '../src/commands/setup';
import { ProjectDiscovery, ProjectType } from '../src/services/ProjectDiscovery';
import { SetupWizard } from '../src/services/SetupWizard';
import { FileGenerator } from '../src/services/FileGenerator';

// Mock dependencies
jest.mock('../src/services/ProjectDiscovery');
jest.mock('../src/services/SetupWizard');
jest.mock('../src/services/FileGenerator');

describe('Setup Command (Unit)', () => {
  let program: Command;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    program = new Command();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should register the setup command on the program', () => {
    registerSetupCommand(program);
    
    const setupCommand = program.commands.find(cmd => cmd.name() === 'setup');
    expect(setupCommand).toBeDefined();
    expect(setupCommand?.description()).toContain('Initialize or adopt');
  });

  it('should orchestrate the setup flow: Discovery -> Wizard -> Generation', async () => {
    registerSetupCommand(program);
    
    // Mock return values
    (ProjectDiscovery.detectType as jest.Mock).mockResolvedValue(ProjectType.GREENFIELD);
    const mockDefinition = {
      productName: 'Test Product',
      productDescription: 'A test product',
      techStack: 'Node.js',
      guidelines: 'Fun'
    };
    (SetupWizard.collectProductDefinition as jest.Mock).mockResolvedValue(mockDefinition);
    (FileGenerator.generateFiles as jest.Mock).mockResolvedValue(undefined);

    // Execute command
    await program.parseAsync(['node', 'test', 'setup']);

    // Verify orchestration
    expect(ProjectDiscovery.detectType).toHaveBeenCalledWith(process.cwd());
    expect(SetupWizard.collectProductDefinition).toHaveBeenCalled();
    expect(FileGenerator.generateFiles).toHaveBeenCalledWith(process.cwd(), mockDefinition);
    
    // Verify console output
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Setup complete'));
  });

  it('should handle Brownfield detection correctly', async () => {
    registerSetupCommand(program);

    // Mock Brownfield detection
    (ProjectDiscovery.detectType as jest.Mock).mockResolvedValue(ProjectType.BROWNFIELD);
    (SetupWizard.collectProductDefinition as jest.Mock).mockResolvedValue({
        productName: 'Existing',
        productDescription: 'Existing',
        techStack: 'Existing',
        guidelines: 'Existing'
    });

    await program.parseAsync(['node', 'test', 'setup']);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Existing project structure detected'));
  });
});

