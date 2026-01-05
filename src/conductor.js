#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const { runClaude } = require('./claude');

yargs(hideBin(process.argv))
    .command('/conductor:setup', 'Initialize Claude Conductor in your project', () => {
    }, (argv) => {
        const conductorDir = '.claude-conductor';
        if (fs.existsSync(conductorDir)) {
            console.log('Claude Conductor is already set up.');
            return;
        }

        fs.mkdirSync(conductorDir, { recursive: true });
        const config = {
            model: 'claude-3-opus-20240229',
            apiKeyInstructions: 'Set your Claude API key as an environment variable: ANTHROPIC_API_KEY'
        };
        fs.writeFileSync(path.join(conductorDir, 'config.json'), JSON.stringify(config, null, 2) + '\n');
        console.log('Claude Conductor setup complete. The .claude-conductor directory has been created.');
    })
    .command('/conductor:newTrack <name>', 'Create a new track', (yargs) => {
        return yargs.positional('name', {
            describe: 'Name of the track to create',
            type: 'string'
        });
    }, (argv) => {
        const tracksDir = path.join('.claude-conductor', 'tracks');
        const trackDir = path.join(tracksDir, argv.name);

        if (!fs.existsSync(tracksDir)) {
            fs.mkdirSync(tracksDir, { recursive: true });
        }

        if (fs.existsSync(trackDir)) {
            console.log(`Track '${argv.name}' already exists.`);
            return;
        }

        fs.mkdirSync(trackDir, { recursive: true });
        fs.writeFileSync(path.join(trackDir, 'spec.md'), '# Specification\n\n');
        fs.writeFileSync(path.join(trackDir, 'plan.md'), '# Plan\n\n');
        console.log(`Track '${argv.name}' created successfully.`);
    })
    .command('/conductor:run <name>', 'Run a track and generate code', (yargs) => {
        return yargs.positional('name', {
            describe: 'Name of the track to run',
            type: 'string'
        });
    }, async (argv) => {
        try {
            console.log(`Running track '${argv.name}'...`);
            const generatedCode = await runClaude(argv.name);
            console.log('\nGenerated Code:\n');
            // The response from the SDK is an array of content blocks.
            // We'll concatenate the text from each block.
            const code = generatedCode.map(block => block.text).join('');
            console.log(code);
        } catch (error) {
            console.error('Error running track:', error.message);
        }
    })
    .demandCommand(1)
    .help()
    .argv;
