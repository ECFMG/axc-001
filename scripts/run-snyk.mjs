#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

function hasSnykToken() {
	return Boolean(process.env.SNYK_TOKEN || process.env.SNYK_API_TOKEN);
}

function snykAvailable() {
	const which = spawnSync('snyk', ['--version'], { encoding: 'utf8' });
	return which.status === 0;
}

if (!snykAvailable()) {
	console.log('Snyk: SKIPPED (NON-BLOCKING) — snyk CLI is not on PATH. Install the global Snyk CLI and authenticate to enable this gate.');
	process.exit(0);
}

if (!hasSnykToken()) {
	const auth = spawnSync('snyk', ['config', 'get', 'api'], { encoding: 'utf8' });
	const configured = auth.status === 0 && auth.stdout.trim().length > 0;
	if (!configured) {
		console.log('Snyk: SKIPPED (NON-BLOCKING) — credentials are unavailable in this environment. Authenticate with `snyk auth` or set SNYK_TOKEN to make this gate blocking.');
		process.exit(0);
	}
}

const result = spawnSync('snyk', ['test', '--all-projects', '--exclude=dist,build,.turbo,coverage,target,reports,.docusaurus'], {
	stdio: 'inherit',
	encoding: 'utf8',
});

if (result.status !== 0) {
	console.error('Snyk: FAILED — see output above.');
	process.exit(result.status ?? 1);
}

console.log('Snyk: PASSED');
