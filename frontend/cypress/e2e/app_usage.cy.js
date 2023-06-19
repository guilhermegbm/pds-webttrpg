describe('App Usage By User', () => {
  // Separate this later. If we have time.
  it('goes through the entire workflow of the site', () => {
    cy.visit('/')

    cy.contains('Sign in').click()

    cy.url().should('include', '/signin')

    cy.contains('Username').type('Joshark')

    cy.contains('Password').type('12345')

    cy.contains('Log in').click()

    cy.url().should('include', '/dashboard')

    // Adds a new game, still need to see how to clear the DB every time a test is run...

    // cy.get('.options-image-btn').click()

    // cy.contains('Nome da campanha *').should('be.visible').type('Tyranny of Dragons')
    // cy.contains('Número máximo de jogadores *').type(4)
    // cy.contains('Descrição da campanha *').type('Tyranny of Dragons Campaign')
    // cy.contains('Data de início *').clear()
    // cy.contains('Data de início *').type('30/06/2023')
    // cy.contains('Selecione o mapa principal').selectFile('./src/assets/dashboard/default-map.png')
    // cy.contains('Submit').click()

    cy.contains('Tyranny of Dragons').scrollIntoView()
    cy.contains('Mais informações').click()

    // Can't click conditional elements
    cy.contains('Entrar no Jogo')
  })
})