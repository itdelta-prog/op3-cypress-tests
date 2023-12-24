const {recurse} = require("cypress-recurse");
describe('1-Regi-RU-valid-email-followup.cy.js', () => {
    let userEmail;
    let pass;
    //let main = Cypress.config('baseUrl').split('.')[1]
    //let subject = 'Learning Center | Invitation to the Learning Center'
    //let confirmationLink;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            pass = user.pass;
            //userName = user.email.replace("@ethereal.email", "");
        })
        cy.visit('https://app.org-online.ru/register');
        cy.wait(1000);
        cy.get('[id="headlessui-menu-button-:r0:"]').click();
        cy.wait(1000);
        // Switch to RU
        cy.get('[id="headlessui-menu-item-:r4:"]').click();
        cy.wait(1000);
    });

    it('valid-email-input', function () {
        //const email = Cypress.env('authEmail');

        //cy.contains("Забыли пароль?").should('be.visible').click();

        //cy.wait(65000); //временное решение - org-online.ru высылает письмо сброса пароля  с ограничением, 1 раз в минуту

        cy.xpath("//input[@id='email']", {timeout: 10000}).type(userEmail);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains('Верификация');
        //cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        //cy.wait(1000);
        //cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
    });
})
