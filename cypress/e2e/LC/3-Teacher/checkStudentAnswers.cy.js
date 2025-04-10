const { recurse } = require('cypress-recurse')

describe('LC.C1. Check student answers', () => {
    // const skipCookie = Cypress.env('shouldSkipEduTests');

    let main = Cypress.config('baseUrl').split('.')[1];
    let subject = 'Learning Center | Your answer has been reviewed!';
    let userEmail;

    before(() => {
        // if ( Cypress.browser.isHeaded ) {
        //     cy.clearCookie(skipCookie)
        // } else {
        //     cy.getCookie(skipCookie).then(cookie => {
        //         if (
        //             cookie &&
        //             typeof cookie === 'object' &&
        //             cookie.value === 'true'
        //         ) {
        //             Cypress.runner.stop();
        //         }
        //     });
        // }
        //
        // cy.admin();
        cy.task("getEmailAccount").then((email) => {
            cy.log(email);
            userEmail = email;
        })
    });

    beforeEach(() => {
        cy.admin();
    });

   it('Check first answer', function () {
      //  Go to the students answers page
        cy.wait(1500);
        cy.visit('lc/admin/teacher/lessons');
       cy.xpath("//div[@class='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto']").find(':contains("Learning Center")').click({multiple: true});
       cy.xpath("//div[@class='flex flex-col flex-grow pt-5 pb-4 overflow-y-auto']").find(':contains("Student answers")').click({multiple: true});
        cy.wait(1500);

       cy.contains('QA Test').click()
       cy.wait(500);

        cy.wait(1500);
        cy.xpath("//span[text()='Comment']").next().type("Comment");

        cy.xpath("//span[text()='Comment']").next().next().click();
        cy.wait(500);
        cy.contains('Success!').should('be.visible');
        // Save Comment

       cy.xpath("//span[text()='Comment for student']").next().type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium " +
           "ad beatae consectetur consequuntur dicta est et incidunt magni maxime minima natus nihil numquam " +
           "perferendis rem sequi, temporibus, totam. Eligendi, eos?");

       cy.xpath("//span[text()='Success']").click();

        cy.xpath("//button[text()='Restart']").next().click();
        cy.xpath(3000);
        // Assert answer saved
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    it('Should get complete the lesson email', function() {
        cy.wait(2500);
        recurse(
            () => {
                if(main === 'release') return  cy.task('getAccount', {subject, userEmail})
                if(main === 'org-online') return cy.task('getEmailData')
            }, // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 60000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
        .its('html')
        .then((html) => {
            cy.document({ log: false }).invoke({ log: false }, 'write', html)
        });
        cy.xpath("//span[@class='course-title']").should('be.visible')

    });

});
