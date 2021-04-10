///<reference types="cypress" />

describe('Helpers...', () => {
    it('wrap', () => {
        const obj = {
            nome: 'User',
            idade: 20
        }

        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el => {
            // $el.val('funciona via jquery')
            cy.wrap($el).type('funciona via cypress')
        })

        const promise = new Promise((resolve,reject) =>{
            setTimeout(() => {
                resolve(10)
            }, 500);
        })

        cy.get('#buttonSimple').then(()=>console.log('Encontrei o primeiro botao'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(res => console.log(res))
        cy.get('#buttonList').then(()=>console.log('Encontrei o segundo botao'))

        //[Using then]Return 2 because then possible change the element 1 received for 2
        cy.wrap(1).then(num =>{
            return 2
        }).should('be.equal', 2)

        //[Using should]Return 1 because should dont change the element received which is 1
        cy.wrap(1).should(num =>{
            return 2
        }).should('be.equal', 1)
    })
})