describe('M. Assert answers were checked by teacher', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'))
    })

    it('assert that answers were created', function () {
        // Find the course by name
        cy.xpath("//input[@id='search']").type(Cypress.env('courseName'));
        // Go to the course
        cy.xpath("//h3[text()='" + Cypress.env('courseName') + "']").click();
        // Assert that we're in the course
        cy.xpath("//h1[text()='" + Cypress.env('courseName') + "']");

        // Go to first lesson
        cy.xpath("//p[text()='" + Cypress.env('lessonCheckboxRadio') + "']").click();
        cy.xpath("//div[text()='" + Cypress.env('lessonSuccess') + "']").should('be.visible').click();
        // Go to second lesson
        cy.xpath("//p[text()='" + Cypress.env('lessonText') + "']").click();
        cy.xpath("//div[text()='" + Cypress.env('lessonSuccess') + "']").should('be.visible').click();
        // Go to success page
        cy.wait(1500);
        cy.xpath("//p[text()='SuccessScreen']").click();
        cy.xpath("//div[text()='Congratulations!']").should('be.visible').click();
    });
});