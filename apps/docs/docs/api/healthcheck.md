# Healthcheck API

`GET /health` is the published readiness contract. Reuse this payload in the API, README, Serenity feature file, and task-set validation.

## Request

```http
GET /health HTTP/1.1
```

## Response

HTTP `200`:

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```

`environment` is one of `local`, `test`, or `production`. `timestamp` is an ISO-8601 string.

## Local usage

With Portless:

```sh
pnpm run dev
curl https://api.agentcourses.localhost:1355/health
```

Without the proxy, the Node runtime listens on `PORT` (default `7071`).
