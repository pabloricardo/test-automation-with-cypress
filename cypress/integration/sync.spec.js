///<reference types="cypress" />

describe('Sync tests', ()=> {
    
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(()=>{
        cy.reload()
    })

    it('Use of timeout', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')

    })    
})