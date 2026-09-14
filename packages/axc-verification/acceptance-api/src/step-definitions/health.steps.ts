import { API_SERVICE_NAME, PROJECT_CODE } from '@axc/domain';
import { Then, When } from '@cucumber/cucumber';
import { Ensure, equals, property } from '@serenity-js/assertions';
import { actorCalled } from '@serenity-js/core';
import { GetRequest, LastResponse, Send } from '@serenity-js/rest';

When('an operator requests GET \\/health', async () => {
	await actorCalled('Operator').attemptsTo(Send.a(GetRequest.to('/health')));
});

Then('the response status is {int}', async (status: number) => {
	await actorCalled('Operator').attemptsTo(Ensure.that(LastResponse.status(), equals(status)));
});

Then('the response body matches the healthcheck contract for environment {string}', async (environment: string) => {
	await actorCalled('Operator').attemptsTo(
		Ensure.that(LastResponse.body<Record<string, unknown>>(), property('status', equals('ok'))),
		Ensure.that(LastResponse.body<Record<string, unknown>>(), property('service', equals(API_SERVICE_NAME))),
		Ensure.that(LastResponse.body<Record<string, unknown>>(), property('projectCode', equals(PROJECT_CODE))),
		Ensure.that(LastResponse.body<Record<string, unknown>>(), property('environment', equals(environment))),
	);
	const body = await actorCalled('Operator').answer(LastResponse.body<{ timestamp: string }>());
	if (Number.isNaN(Date.parse(body.timestamp))) {
		throw new Error(`timestamp is not ISO-8601: ${body.timestamp}`);
	}
});
