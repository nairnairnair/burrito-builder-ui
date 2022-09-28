beforeEach(() => {
  cy.intercept('GET', "http://localhost:3001/api/v1/orders", {
    "orders": [
      {
        "id": 1,
        "name": "Philbus",
        "ingredients": ["beans", "hot sauce", "carnitas", "cilantro", "steak"]
      }
    ]
  })
  cy.intercept('POST', "http://localhost:3001/api/v1/orders", {
    "id": 2,
    "name": "Pagliacci",
    "ingredients": ["lettuce", "jalapenos", "sour cream", "guacamole", "queso fresco"]
  }
  )
  .visit(
    "http://localhost:3000/"
  );
})

describe('order GET and POST', () => {
  it('should be able to display existing orders before a new order is placed', () => {
    cy.get('.order')
    .should('exist')
    .should('have.length', 1)
    .children("h3")
    .should("contain", "Philbus")
    .get('.order')
    .children("ul")
    .children(0)
    .should("contain", "beans")
  })

  it('should be able to display existing and new orders after a new order is placed with a name and ingredients', () => {
    cy.get('input[placeholder="Name"]')
      .type("Pagliacci")
      .get('button[name="lettuce"]')
      .click()
      .get('button[name="jalapenos"]')
      .click()
      .get('button[name="sour cream"]')
      .click()
      .get('button[name="guacamole"]')
      .click()
      .get('button[name="queso fresco"]')
      .click()
      .get("button")
      .contains("Submit Order")
      .click()
      .get('.order')
      .should('exist')
      .should('have.length', 2)
      .get('.order').last()
      .children("h3")
      .should("contain", "Pagliacci")
      .get('.order').last()
      .children("ul")
      .children(0)
      .should("contain", "lettuce")
  })

  it('should not be able to display a new order without a name entered', () => {
    cy.get('button[name="lettuce"]')
      .click()
      .get('button[name="jalapenos"]')
      .click()
      .get('button[name="sour cream"]')
      .click()
      .get('button[name="guacamole"]')
      .click()
      .get('button[name="queso fresco"]')
      .click()
      .get("button")
      .contains("Submit Order")
      .click()
      cy.get('.order')
      .should('exist')
      .should('have.length', 1)
      .children("h3")
      .should("contain", "Philbus")
  })

  it('should not be able to display a new order without an ingredient entered', () => {
    cy.get('input[placeholder="Name"]')
    .type("Pagliacci")
    .get("button")
    .contains("Submit Order")
    .click()
    cy.get('.order')
    .should('exist')
    .should('have.length', 1)
    .children("h3")
    .should("contain", "Philbus")
  })
})