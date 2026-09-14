import { createApiApp } from '@apps/api/composition';
import { AfterAll, BeforeAll, setWorldConstructor } from '@cucumber/cucumber';
import { type ServerType, serve } from '@hono/node-server';
import { type Actor, type Cast, engage, TakeNotes } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';

let server: ServerType | undefined;
let baseUrl = '';

class ApiCast implements Cast {
	prepare(actor: Actor): Actor {
		return actor.whoCan(CallAnApi.at(baseUrl), TakeNotes.usingAnEmptyNotepad());
	}
}

class World {}

setWorldConstructor(World);

BeforeAll(() => {
	const app = createApiApp({ AXC_ENVIRONMENT: 'test', NODE_ENV: 'test' });
	server = serve({ fetch: app.fetch, port: 0 });
	const address = server.address();
	if (!address || typeof address === 'string') {
		throw new Error('Failed to bind healthcheck acceptance server');
	}
	baseUrl = `http://127.0.0.1:${address.port}`;
	engage(new ApiCast());
});

AfterAll(async () => {
	await new Promise<void>((resolve, reject) => {
		if (!server) {
			resolve();
			return;
		}
		server.close((error) => {
			if (error) {
				reject(error);
				return;
			}
			resolve();
		});
	});
});
