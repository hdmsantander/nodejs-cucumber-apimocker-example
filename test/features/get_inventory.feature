Feature: Get store inventory and orders in JSON format

  This feature allows for customers to retrieve the inventory and store orders in JSON format
  the syntax used here is more in line with Apickli's default step definitions and does not use
  custom step definitions.

  Background: Set Accept header to JSON
    Given I set 'Accept' header to 'application/json'

  Scenario: Retrieving the store inventory
    When I GET /store/inventory
    Then response code should be 200
    And response body should be valid json
    And response body path $.available should be ^\d{0,}$

  Scenario: Retrieving a valid store order
    When I GET /store/order/1
    Then response code should be 200
    And response body should be valid json
    And response body path $.id should be ^1$

  Scenario: Retrieving an invalid store order
    When I GET /store/order/90
    Then response code should be 404
    And response body should be valid json
    And response body path $.type should be ^error$
