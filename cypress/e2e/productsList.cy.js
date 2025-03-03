describe('products list', () => {
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('passes', function () {
        cy.get('.btn_inventory').eq(1).click()
        cy.get('.btn_inventory').eq(2).click()

        cy.get('.inventory_item_price').eq(1).then(item => {
            cy.wrap(parseFloat(item.text().replace('$', ''))).as('firstPrice')
        })
        cy.get('.inventory_item_price').eq(2).then(item => {
            cy.wrap(parseFloat(item.text().replace('$', ''))).as('secondPrice')
        })

        cy.get('.shopping_cart_link').click()
        cy.get('#checkout').click()
        cy.get('#first-name').type('Ivan')
        cy.get('#last-name').type('Ivanov')
        cy.get('#postal-code').type('999000')
        cy.get('#continue').click()

        cy.get('.summary_subtotal_label').then(item => {
            cy.wrap(parseFloat(item.text().match(/[+-]?\d+(\.\d+)?/g)[0])).as('totalPriceWithoutTaxes')
        })

        cy.get('@totalPriceWithoutTaxes').then(totalPriceWithoutTaxes => {
            cy.get('@firstPrice').then(firstPrice => {
                cy.get('@secondPrice').then(secondPrice => {
                    expect(totalPriceWithoutTaxes).eq(firstPrice + secondPrice)
                })
            })
        })
    })
})

