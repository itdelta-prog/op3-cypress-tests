describe('LA3. Land-RU-read-more-reglaments', () => {
    before(() => {
            cy.visit(Cypress.config().landingUrl);
    });

    it('should move to login page', function () {
        cy.wait(2000);
        cy.get('a[href*="/policy"]').eq(0).should('be.visible').click();
    });
})