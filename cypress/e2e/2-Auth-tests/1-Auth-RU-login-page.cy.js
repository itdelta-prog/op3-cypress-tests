describe('1. Auth-login-page', () => {
    before(() => {
        cy.visit(Cypress.config().baseUrl);
        cy.wait(3000);
        cy.get('[id="headlessui-menu-button-:r0:"]').click();
        cy.wait(1000);
        // Switch to RU
        cy.get('[id="headlessui-menu-item-:r4:"]').click();
        cy.wait(1000);
    });

    it('should move to login page', function () {
        cy.wait(1000);
        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');

        cy.xpath("//h2[text()='Войти']").should('be.visible');

    });
})
