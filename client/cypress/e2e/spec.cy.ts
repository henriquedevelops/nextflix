describe('Home page', () => {
  it('sucessfully loads', () => {
    cy.visit('/')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
  })
})
