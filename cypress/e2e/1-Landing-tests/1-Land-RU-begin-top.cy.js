describe('LA1. Land-RU-begin-top', () => {
    before(() => {
        cy.visit(Cypress.config().landingUrl);
    });

    it('should click top begin button', function () {
        cy.wait(2000);
        cy.get('a[href*="register"]').eq(1).should('be.visible').click();
    });
})