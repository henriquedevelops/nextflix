describe('Core functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.location('pathname').should('equal', '/login')
  })

  it('watches a movie', () => {
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
    cy.get('[data-cy="sigin-button"]').click().should('be.disabled')
    cy.wait(10000)
    cy.location('pathname').should('equal', '/')
    cy.get('[data-cy="movie-card"]').first().click()
    cy.get('[data-cy="watch-button"]').click()
    cy.get('video').should('exist')
  })
})
