Feature: Douglas

  @douglas
  Scenario Outline: List Products
    When I navigate to 'Parfum' Category
    Then I filter perfumes
      | highlights   | brand   | productType   | forWhom   |
      | <highlights> | <brand> | <productType> | <forWhom> |
    And I list the products based on filters

    Examples:
      | highlights | brand   | productType   | forWhom  |
      | Sale       | Aigner  | Duschgel      | Weiblich |
      | NEU        | Amouage | Parfum        | Unisex   |
      | Limitiert  | Creed   | Eau de Parfum | Männlich |
