///<reference types="cypress" />

describe('Sync tests', ()=> {
    
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(()=>{
        cy.reload()
    })

    it('Use of timeout passed', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout:5000}).should('exist')
    })    

    it('Use of timeout reported in configuration', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist')
    })    

    it('Use wait', () => {
        cy.get('#buttonDelay').click()
        cy.wait(5000)
        cy.get('#novoCampo').should('exist')

    })  
})