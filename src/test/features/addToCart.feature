Feature: Add products to cart

  Background:
    Given User navigates to the application
    And User click on the login link

  
  @test
  Scenario Outline: Authenticated Users - Add to cart
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the login button
    When user search for a "<book>"
    And user add the book to the cart
    Then the cart badge should get updated
    #And user should get logout from page

    Examples:
      | username | password  | book            |
      | ortonikc   | pass1234 | Roomies         |
      | ortoni11 | Pass1234  | The Simple Wild |

#   @fail
#   Scenario: UnAuthenticated User - Add to cart
#     When user search for a "All of Us with Wings"
#     And user add the book to the cart
#     Then the cart badge should get updated