describe('Core functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.location('pathname').should('equal', '/login')
  })

  it('watches a movie', () => {
    cy.intercept('api/auth').as('authRequest')
    cy.intercept('api/movies*').as('moviesRequest')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="password"]').type('testpassword')
    cy.get('[data-cy="sigin-button"]').click().should('be.disabled')
    cy.wait('@authRequest')
    cy.location('pathname').should('equal', '/')
    cy.wait('@moviesRequest')
    cy.get('[data-cy="movie-card"]').first().click()
    cy.get('[data-cy="watch-button"]').click()
    cy.get('video').should('exist')
  })
})
