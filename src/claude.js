const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

async function runClaude(trackName) {
    const configPath = path.join('.claude-conductor', 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    const specPath = path.join('.claude-conductor', 'tracks', trackName, 'spec.md');
    const planPath = path.join('.claude-conductor', 'tracks', trackName, 'plan.md');

    const spec = fs.readFileSync(specPath, 'utf-8');
    const plan = fs.readFileSync(planPath, 'utf-8');

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is not set.');
    }

    const anthropic = new Anthropic({ apiKey });

    const prompt = `Based on the following specification and plan, please generate the code to implement the feature.

Specification:
${spec}

Plan:
${plan}
`;

    const message = await anthropic.messages.create({
        model: config.model,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
    });

    return message.content;
}

module.exports = { runClaude };
