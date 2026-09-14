# SRTM: Healthcheck

| Requirement | Specification | Test |
| --- | --- | --- |
| Health endpoint | `GET /health` returns 200 with `status`, `service`, `projectCode`, `environment`, `timestamp` | `packages/axc-verification/acceptance-api/features/healthcheck.feature` |
| Service identity | `service` is `agentCourses-api`, `projectCode` is `axc` | Domain unit tests and Serenity assertions |
| Environment | `environment` is `local`, `test`, or `production` | API composition tests |
