describe('LA6. Land-RU-begin-bottom', () => {
    before(() => {
            cy.visit(Cypress.config().landingUrl);
    });
    it('should click bottom begin button', function () {
        cy.wait(2000);
        cy.get('a[href*="register"]').eq(2).should('be.visible').click();
    });
})
