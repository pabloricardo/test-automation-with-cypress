///<reference types="cypress" />

describe('Cypress basics', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Should visit a page and assert title', () => {

        //cy.title().debug()
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')
        //cy.pause()

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)
            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })


    it('Should find and interact with an element', () => {
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('typeTextWithDelay', { delay: 100 })

    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get('[name="formSexo"]').should('have.length', 2)
    })

    it('Checkbox', () => {

        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name = "formComidaFavorita"]')
            .click({ multiple: true })
            .should('be.checked')

        cy.get('#formComidaPizza').should('not.be.checked')

        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('#formEscolaridade')
            .select('2graucomp')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao','Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao','Corrida', 'nada'])



    })
})