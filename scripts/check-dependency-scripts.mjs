#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const allowedScriptPackages = new Set(['esbuild', 'rolldown']);
const workspacePath = resolve(process.cwd(), 'pnpm-workspace.yaml');

if (!existsSync(workspacePath)) {
	console.error('Dependency script policy check FAILED: pnpm-workspace.yaml is missing.');
	process.exit(1);
}

const workspace = readFileSync(workspacePath, 'utf8');
const allowBlock = workspace.match(/allowBuilds:\n((?:  .+\n)+)/);
if (!allowBlock) {
	console.error('Dependency script policy check FAILED: pnpm-workspace.yaml must declare allowBuilds.');
	process.exit(1);
}

const enabled = [...allowBlock[1].matchAll(/^\s{2}([A-Za-z0-9@/._-]+):\s*true\s*$/gm)].map((match) => match[1]);
const unexpected = enabled.filter((name) => !allowedScriptPackages.has(name));
if (unexpected.length > 0) {
	console.error(`Dependency script policy check FAILED: install scripts are only allowed for ${[...allowedScriptPackages].join(', ')}. Offenders: ${unexpected.join(', ')}`);
	process.exit(1);
}

for (const required of allowedScriptPackages) {
	if (!enabled.includes(required)) {
		console.error(`Dependency script policy check FAILED: allowBuilds must enable native toolchain package "${required}".`);
		process.exit(1);
	}
}

console.log(`Dependency script policy check PASSED: install scripts allowed only for ${[...allowedScriptPackages].join(', ')}.`);
