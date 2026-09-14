Feature: API healthcheck

  The GET /health contract is shared by the API, README, docs site, and future task-set validation.

  Scenario: GET /health returns the published contract
    When an operator requests GET /health
    Then the response status is 200
    And the response body matches the healthcheck contract for environment "test"
