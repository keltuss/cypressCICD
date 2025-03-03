describe('login test', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('passes', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('user locked', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#user-name').type('locked_out_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy
            .get('.error-message-container h3')
            .should('have.text', "Epic sadface: Sorry, this user has been locked out.")
    })

    it('login without password', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#login-button').click()

        cy.get('.error-message-container.error > h3')
            .should('have.text', "Epic sadface: Password is required")
    })

    it('login without username', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        cy.get('.error-message-container.error > h3')
            .should('have.text', "Epic sadface: Username is required")
    })

    it('login without username amd password', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#login-button').click()

        cy.get('.error-message-container.error > h3')
            .should('have.text', "Epic sadface: Username is required")
    })

    it('login with wrong username', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#user-name').type('1234567890')
        cy.get('#password').type('secret_sauce')

        cy.get('#login-button').click()

        cy.get('.error-message-container.error > h3')
            .should('have.text', "Epic sadface: Username and password do not match any user in this service")
    })

    it('login with wrong password', {
        defaultCommandTimeout: 10000
    }, () => {
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('1234567890')

        cy.get('#login-button').click()

        cy.get('.error-message-container.error > h3')
            .should('have.text', "Epic sadface: Username and password do not match any user in this service")
    })
})

