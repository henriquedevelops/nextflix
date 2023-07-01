describe('Core functionality', () => {
  it('authenticates and watches a movie', () => {
    cy.visit('/')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
    cy.contains('button', 'Sign in').click()
    cy.wait(10000)
    cy.contains('The Destroyer of Worlds').click()
    cy.contains('button', 'Watch now').click()
    cy.get('video').should('exist')
  })
})
