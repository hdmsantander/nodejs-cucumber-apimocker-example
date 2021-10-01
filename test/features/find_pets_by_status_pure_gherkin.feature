Feature: Look for pets inside of the pet store in a JSON format

    This feature allows customers to find pets in the pet store in a JSON format.
    The syntax used here is in line with the Gherkin ideals to use DSL, we don't quite
    use the step definitions provided by Apickli as much here.

    Background: Set accepted content to JSON for all requests in this feature and enter the pet store
        Given I set 'Accept' header to 'application/json'
        And I go to the pet section

    Scenario: Finding pets that are available for adoption
        When I look for pets that are available for adoption
        Then I should get a list of pets
        And Every pet in the list of pets should be adoptable

    Scenario: Finding pets that were already adopted
        When I look for pets that were adopted
        Then I should get a list of pets
        And Every pet in the list of pets should be adopted

    Scenario: Finding pets that are in process of being adopted
        When I look for pets that are being adopted
        Then I should get a list of pets
        And Every pet in the list of pets should be in the process of being adopted

    Scenario: Finding pets that are sad
        When I look for pets that are sad
        Then I should get an empty list of pets
