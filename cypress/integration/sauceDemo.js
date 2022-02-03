/// <reference types= "Cypress" />

describe('Suacedemo page challenge', () => {

    it('Log in and add the highes item to basket and check', () => {

        let price;
        let productName;
        let highest;

        cy.visit('https://www.saucedemo.com');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        cy.get(`.inventory_item_price`).then(($elm) => {
            for (let i = 0; i <= $elm.length; i++) {
                let text = $elm.text();
                price = text.split('$');
            }
            highest = Math.max.apply(0, price);
            cy.get(`.inventory_item_price`).contains(highest)
                .parents(`.inventory_item_description`).find(`.inventory_item_name`)
                .then(($ele) => {
                    productName = $ele.text();
                }).then(() => {
                    cy.get(`.inventory_item_price`).contains(highest).parent().find(`button`).click();
                    cy.get(`.shopping_cart_link`).click();
                    cy.get(`.inventory_item_name`).should('contain', productName);
                });
        });
    });
});