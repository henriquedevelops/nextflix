describe('Core functionality', () => {
  beforeEach(() => {
    cy.login()
  })

  it('watches a movie', () => {
    cy.intercept('api/movies*').as('moviesRequest')
    cy.wait('@moviesRequest')
    cy.get('[data-cy="movie-card"]').first().click()
    cy.get('[data-cy="watch-button"]').click()
    cy.get('video').should('exist')
  })
})
