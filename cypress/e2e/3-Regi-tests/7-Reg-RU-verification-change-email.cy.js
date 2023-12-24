const {recurse} = require("cypress-recurse");
describe('7-Reg-RU-verification-change-email.cy.js', () => {
    let userEmail;
    let pass;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            pass = user.pass;
        })
        cy.visit('https://app.org-online.ru/register');
        cy.wait(1000);
        cy.get('[id="headlessui-menu-button-:r0:"]').click();
        cy.wait(1000);
        // Switch to RU
        cy.get('[id="headlessui-menu-item-:r4:"]').click();
        cy.wait(1000);
    });

    it('valid-email-code-confirmation', function () {
        cy.xpath("//input[@id='email']", {timeout: 10000}).type(userEmail);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(3000);
        cy.contains('Верификация');
        cy.contains('Сменить адрес почты').should('be.visible').click();
        cy.wait(3000);
        cy.xpath("//input[@id='email']", {timeout: 10000}).should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).should('be.visible');
        cy.contains('Регистрация');
        cy.contains('Первые 14-дней бесплатно');
    });
})
