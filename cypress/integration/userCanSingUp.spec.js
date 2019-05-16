describe('User can sign up', () => {
  it('successfully', () => {
    cy.visit('http://localhost:3001');
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth',
      response: 'fixture:signup.json',
      headers: {
        "uid": "another@mail.com"
      }
    })
    cy.get('#signup').click();
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('another@mail.com')
      cy.get('#password').type('password')
      cy.get('#password_confirmation').type('password')
      cy.get('button').click()
    })
    cy.contains('Hi another@mail.com')
  })

  it('with invalid credentials - invalid email', () => {
    cy.visit('http://localhost:3001');
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth',
      status: "401",
      response: {
        "errors": [
          "Invalid signup credentials. Please try again."
        ],
        "success":false
      }
    })
    cy.get('#signup').click();
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('another@mail')
      cy.get('#password').type('password')
      cy.get('#password_confirmation').type('password')
      cy.get('button').click()
    })
    cy.contains('Invalid signup credentials. Please try again.')
  })

  it('with invalid credentials - password confirmation failed', () => {
    cy.visit('http://localhost:3001');
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/auth',
      status: "401",
      response: {
        "errors": [
          "Invalid signup credentials. Please try again."
        ],
        "success":false
      }
    })
    cy.get('#signup').click();
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('another@mail.com')
      cy.get('#password').type('password')
      cy.get('#password_confirmation').type('badword')
      cy.get('button').click()
    })
    cy.contains('Invalid signup credentials. Please try again.')
  })
})