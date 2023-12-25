
describe('4-Reg-RU-invalid-code.cy.js', () => {
    let userEmail;
    let pass;
    let invalid_code = '0000';

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            pass = user.pass;
        })
        cy.visit(Cypress.config().landingUrl);
        cy.wait(3000);
        cy.get('a[href*="register"]').eq(1).should('be.visible').click();
        cy.wait(3000);
        cy.get('[id="headlessui-menu-button-:r0:"]').click();
        cy.wait(1000);
        // Switch to RU
        cy.get('[id="headlessui-menu-item-:r4:"]').click();
        cy.wait(1000);
    });

    it('valid-email-registration-open-courses', function () {
        cy.xpath("//input[@id='email']", {timeout: 10000}).type(userEmail);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(3000);
        cy.contains('Верификация');
        cy.wait(1000);
        cy.xpath("//input[@id='code']", {timeout: 10000}).type(invalid_code);
        cy.wait(1000);
        cy.task('getLastEmail', {user: userEmail, pass: pass,}); // проверяем почту чтобы следующая проверка видела правильный код
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains('Выбранное значение для Код некорректно.').should('be.visible');

    });
})
