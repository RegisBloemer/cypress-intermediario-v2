describe('Login', () => {
  it('successfully login', () => {
    cy.login()
    cy.get('.header-user-avatar').should('be.visible')
  })
})
