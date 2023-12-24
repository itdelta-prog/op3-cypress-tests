
describe('2-Regi-RU-valid-email-code-verification-open-registration.cy.js', () => {
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
        cy.task('getLastEmail', {user: userEmail, pass: pass,}).its('html').then(($html) => {
                var doc = new DOMParser().parseFromString($html, "text/html");
                let midText = doc.querySelector("p").innerText;
            cy.xpath("//input[@id='code']", {timeout: 10000}).type(midText.match(/[0-9]+/g)[0]);
            });
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains('Регистрация');
        cy.xpath("//input[@id='name']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='last_name']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible');
    });
})
