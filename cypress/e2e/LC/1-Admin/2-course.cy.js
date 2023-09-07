describe('LC.A2. Create course', () => {
    // const skipCookie = Cypress.env('shouldSkipEduTests');

    // before(() => {
    //     if ( Cypress.browser.isHeaded ) {
    //         cy.clearCookie(skipCookie)
    //     } else {
    //         cy.getCookie(skipCookie).then(cookie => {
    //             if (
    //                 cookie &&
    //                 typeof cookie === 'object' &&
    //                 cookie.value === 'true'
    //             ) {
    //                 Cypress.runner.stop();
    //             }
    //         });
    //     }
    // });
    
    beforeEach(() => {
        cy.admin();
    });

    it('should create course', function () {

        // Go to add courses page
        cy.xpath("//a[text()='Courses']").click();
        cy.contains('Add Course').click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('courseName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit.")
        // Set course as active
        cy.xpath("//button[text()='Select']").click();
        cy.wait(500);
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/div[1]/div[2]/input").type('QA');
        cy.wait(1500);
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div[2]/div/div").click();
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/button").click();
        cy.wait(500);
        cy.xpath("//button[text()='Save']").click();
        cy.wait(5000);
        cy.contains("Success").should('be.visible');
    });

    // it('should delete course', function () {
    //     cy.visit('/admin');
    //
    //     cy.visit('/admin/lc/courses');
    //     cy.xpath(`//div[text()='${Cypress.env('courseName')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    // });
    //
    // it('should delete lessons', function () {
    //     cy.visit('/admin');
    //
    //     cy.visit('/admin/lc/lessons');
    //     cy.xpath(`//div[text()='${Cypress.env('lessonText')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    //     cy.visit('/admin/lc/lessons');
    //     cy.xpath(`//div[text()='${Cypress.env('lessonCheckboxRadio')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    //
    // });

    // afterEach(function onAfterEach() {
    //     if (this.currentTest.state === 'failed') {
    //         cy.setCookie(skipCookie, 'true');
    //     }
    // });
});