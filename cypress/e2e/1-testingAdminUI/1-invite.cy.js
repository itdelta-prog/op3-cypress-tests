const { recurse } = require('cypress-recurse')

describe("C. Invite user by 2 ways", () => {
    let userEmail;
    let userName;
    let confirmationLink;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            expect(user.email).to.be.a("string");
            userEmail = user.email;
            userName = user.email.replace("@ethereal.email", "");
        })
    })

    it('should invite by user menu', function () {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });

        // Go to invite user page
        cy.xpath("//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50']").click();
        cy.xpath("//a[@href='https://qa-testing.learn.company-policy.com/invite-user']").click();

        // Input credentials
        cy.xpath("//*[@id='email']").type(userEmail);
        cy.xpath("//button[text()='Select groups']").click();
        cy.xpath("//li[text()='Heads']").click();
        cy.xpath("//button[text()='Save']").click();

        // Assert user have role
        cy.xpath("//li//button").should('be.visible');

        // Click on submit button
        cy.xpath("//button[@type='submit']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    it('getting last email', function () {
        recurse(
            () => cy.task('getLastEmail'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 60000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
        .its('html')
        .then((html) => {
            cy.document({ log: false }).invoke({ log: false }, 'write', html)
        })
        cy.xpath("//a[@class='button button-primary']").should('have.attr', 'href').then((href) => {
            confirmationLink = href;
        });
    });

    it('accept invitation', function () {
        cy.visit(confirmationLink);

        cy.xpath("//*[@id='first-name']").type('QA');
        cy.xpath("//*[@id='last-name']").type('TEST')
        cy.xpath("//*[@id='password']").type(Cypress.env('password'), { log: false });
        cy.xpath("//*[@id='new_password']").type(Cypress.env('password'), { log: false });

        cy.xpath("(//button[@type='submit'])[1]").click();

        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });

    it('delete invited user', function () {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });

        cy.xpath("//a[text()='Users']").click();
        cy.accessAllItems();

        cy.xpath("//div[text()='QA TEST']");
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
    });

    it('should invite by admin tools', function () {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });

        // Go to add user page
        cy.xpath("//a[text()='Users']").click();
        cy.xpath("//button[text()='Add user']").click();

        // Input credentials
        cy.xpath("(//input[@type='text'])[1]").type(String(Math.random() * 100));
        cy.xpath("(//input[@type='text'])[2]").type("QA");
        cy.xpath("//input[@type='email']").type("testAddUser+" + Math.random() * 100 + "@lc.com");
        cy.xpath("//input[@type='tel']").type("+7999" + Math.random() * 100);
        cy.xpath("(//input[@type='password'])[1]").type(Cypress.env('password'), { log: false });
        cy.xpath("(//input[@type='password'])[2]").type(Cypress.env('password'), { log: false });

        // Click on submit button
        cy.xpath("//button[text()='Save']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
