Feature: Douglas

  @douglas
  Scenario Outline: List Products
    When I navigate to 'Parfum' Category
    Then I filter perfumes
      | highlights   | brand   | productType   | forWhom   |
      | <highlights> | <brand> | <productType> | <forWhom> |
    Then I validate "<brand>" brand only in search results

    Examples:
      | highlights | brand   | productType   | forWhom  |
      | Sale       | Aigner  | Duschgel      | Weiblich |
      | NEU        | Amouage | Parfum        | Unisex   |
      | Limitiert  | Creed   | Eau de Parfum | Männlich |


  @douglas
  Scenario: Add Product to Cart and Checkout
    When I navigate to 'Parfum' Category
    Then I filter perfumes
      | highlights | brand  | productType | forWhom  |
      | Sale       | Aigner | Duschgel    | Weiblich |
    And I add Product to Cart
    Then I validate Product Brand Name as "Aigner" on Shopping Cart
    And I proceed to checkout


  @douglas
  Scenario: Register User
    When I navigate to login page
    Then I register user
      | firstName | lastName | dob        | gender | password |
      | Shubham   | Sharma   | 08.03.1994 | m      | Abc@987# |
    Then I validate welcome message as "Herzlich willkommen, Shubham Sharma!"
    And I click on complete registration button
    Then I validate Home Page welcome message as "Hallo Shubham Sharma,"


  @douglas
  Scenario: Login to application using valid credentials
    When I navigate to login page
    Then I login to app using email id as "test@demo.com" and password as "Xyz@786#"
    Then I validate Home Page welcome message as "Hallo Shubham Sharma,"


  @douglas
  Scenario: Login to application using invalid credentials
    When I navigate to login page
    Then I login to app using email id as "test1@demo1.com" and password as "abc123"
    Then I validate alert message as "Falsche Zugangsdaten"
