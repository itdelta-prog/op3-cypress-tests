describe('LA2. Land-RU-read-more-study', () => {
    before(() => {
            cy.visit(Cypress.config().landingUrl);
    });

    it('should click study button', function () {
        cy.wait(2000);
        cy.get('a[href*="/learning-center"]').eq(0).should('be.visible').click();
    });
})


//href="/learning-center"