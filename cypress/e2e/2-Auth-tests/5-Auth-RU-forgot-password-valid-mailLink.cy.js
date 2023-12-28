const {recurse} = require("cypress-recurse");
describe('5-Auth-RU-forgot-password-valid-mail-link.cy.js', () => {
    let main = Cypress.config('baseUrl').split('.')[1]
    let subject = 'Уведомление о сбросе пароля';
    const email = Cypress.env('authEmail')
    before(() => {
        cy.visit(Cypress.config().baseUrl)
        cy.changeLangAuth();
    });

    it('requesting reset-password-email', function () {

        cy.contains("Забыли пароль?").should('be.visible').click();

       // cy.wait(65000); //временное решение - org-online.ru высылает письмо сброса пароля  с ограничением, 1 раз в минуту

        cy.xpath("//input[@id='email']", {timeout: 10000}).type(email);
        cy.wait(1000);
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        cy.wait(1000);
        cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
    });

    it('getting last email', function () {
        cy.wait(1000);
        recurse( //эта рекурсия не работает - таск возвращает таймаут
            () => {
                if(main === 'release') return  cy.task('getAccount', {subject, email})
                if(main === 'org-online') return cy.task('getLastEmail', {});
            }, // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 180000, // retry up to 3 minutes
                delay: 5000, // wait 5 seconds between attempts
            },
        )
            .its('html')
            .then((html) => {
                console.log(html);
                cy.document({log: false}).invoke({log: false}, 'write', html)
            })
        cy.get('[class="button button-primary"]').should('have.attr', 'href').then(($btn) => {
            console.log($btn);
            cy.visit($btn);
        });
    });
})