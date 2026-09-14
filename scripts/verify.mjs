#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const gates = [
	{ name: 'dependency script policy', command: 'pnpm', args: ['run', 'check:scripts'] },
	{ name: 'biome', command: 'pnpm', args: ['exec', 'biome', 'check', '.'] },
	{ name: 'TypeScript compilation', command: 'pnpm', args: ['run', 'typecheck'] },
	{ name: 'knip', command: 'pnpm', args: ['run', 'knip'] },
	{ name: '@e18e/cli', command: 'pnpm', args: ['run', 'analyze'] },
	{ name: 'architecture tests', command: 'pnpm', args: ['run', 'test:arch'] },
	{ name: 'unit/integration tests', command: 'pnpm', args: ['exec', 'turbo', 'run', 'test'] },
	{ name: 'Serenity acceptance tests', command: 'pnpm', args: ['run', 'test:acceptance'] },
	{ name: 'pnpm audit', command: 'pnpm', args: ['run', 'audit'] },
	{ name: 'Snyk', command: 'pnpm', args: ['run', 'snyk'] },
];

let failed = false;

for (const gate of gates) {
	console.log(`\n======== GATE: ${gate.name} ========`);
	const result = spawnSync(gate.command, gate.args, { stdio: 'inherit', env: process.env });
	if (result.status !== 0) {
		console.error(`GATE FAILED: ${gate.name}`);
		failed = true;
		break;
	}
	console.log(`GATE PASSED: ${gate.name}`);
}

if (failed) {
	process.exit(1);
}

console.log('\nAll verification gates completed. Snyk may report SKIPPED (NON-BLOCKING) on first scaffold if credentials are unavailable.');
