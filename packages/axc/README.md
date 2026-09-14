# @axc workspace

Application packages for agentCourses (`axc`).

| Package | Role |
| --- | --- |
| `@axc/domain` | DDD types and invariants. Must not import REST, Hono, Azure Functions, Mongoose, persistence implementations, or composition code. |
| `@axc/application-services` | Use cases. Injected with persistence abstractions, not infrastructure. |
| `@axc/rest` | Hono routes. Application services are injected from `apps/api`. |
| `@axc/persistence` | Data-source composition and repository ports. |
| `@axc/service-mongoose` | MongoDB/Mongoose infrastructure. Wired only from `apps/api`. |

`apps/api` is the composition root.
