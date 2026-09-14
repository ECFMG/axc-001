import { MongoMemoryServer } from 'mongodb-memory-server-core';
import mongoose from 'mongoose';

export class ServiceMongoose {
	private readonly uri: string;

	public constructor(uri: string) {
		this.uri = uri;
	}

	public async connect(): Promise<typeof mongoose> {
		return await mongoose.connect(this.uri);
	}

	public async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}

export async function createMemoryMongoUri(): Promise<{ uri: string; stop: () => Promise<boolean> }> {
	const server = await MongoMemoryServer.create();
	return {
		uri: server.getUri(),
		stop: () => server.stop(),
	};
}
