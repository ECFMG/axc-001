import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';
import { getDirnameFromImportMetaUrl } from './dirname.ts';

it('returns the directory name for a given import.meta.url string', () => {
	const absPath = fileURLToPath(import.meta.url);
	const result = getDirnameFromImportMetaUrl(import.meta.url);
	expect(result).toBe(path.dirname(absPath));
});
