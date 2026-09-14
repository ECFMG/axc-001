import { describe, expect, it } from 'vitest';
import { createMemoryMongoUri, ServiceMongoose } from './index.ts';

describe('ServiceMongoose', () => {
	it('connects to mongodb-memory-server-core', async () => {
		const memory = await createMemoryMongoUri();
		const service = new ServiceMongoose(memory.uri);
		const connection = await service.connect();
		expect(connection.connection.readyState).toBe(1);
		await service.disconnect();
		await memory.stop();
	});
});
