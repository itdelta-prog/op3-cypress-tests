describe('LA5. Land-RU-contact-techsupport', () => {
    before(() => {
            cy.visit(Cypress.config().landingUrl);
    });

    it('Click contact tech-support to check for modal box', function () {
        cy.wait(2000);
        cy.get('[class="text-base font-medium text-blue-700 hover:text-blue-600"]').eq(1).contains("Связаться").click();
        cy.wait(1000);
        cy.contains("Отправить нам сообщение");
    });
})
