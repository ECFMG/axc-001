import { spawnSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiDir = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const deployDir = path.join(apiDir, 'deploy');
const zipPath = path.join(deployDir, 'agentCourses-api.zip');

await mkdir(deployDir, { recursive: true });

const zip = spawnSync('zip', ['-r', zipPath, 'dist', 'host.json', 'package.json'], {
	cwd: deployDir,
	stdio: 'inherit',
});

if (zip.status !== 0) {
	throw new Error('Failed to create Azure Functions run-from-package zip at deploy/agentCourses-api.zip');
}

console.log(`Wrote ${zipPath}`);
