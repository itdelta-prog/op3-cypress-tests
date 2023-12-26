const {recurse} = require("cypress-recurse");
describe('5-Reg-RU-valid-email-registration-not-matching-password.cy.js', () => {
    let userEmail;
    let pass;
    let name = 'test_name';
    let last_name = 'test_last_name';
    let test_password = 'test_last_password';
    let wrong_password = 'wrong_wrong_wrong_wrong';
    //Значение поля Пароль не совпадает с подтверждаемым.

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            pass = user.pass;
        })
        cy.visit(Cypress.config().registerUrl);
        cy.wait(3000);
        // Switch to RU
        cy.xpath('/html/body/div[2]/div/nav/div/div/div[2]/div/div/button').click();
        cy.wait(1000);
        cy.xpath('/html/body/div[2]/div/nav/div/div/div[2]/div/div[2]/a[2]').click();
        cy.wait(1000);
    });

    it('valid-email-registration-open-courses', function () {
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
        cy.xpath("//input[@id='name']", { timeout: 10000 }).should('be.visible').type(name);
        cy.wait(1000);
        cy.xpath("//input[@id='last_name']", { timeout: 10000 }).should('be.visible').type(last_name);
        cy.wait(1000);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible').type(test_password);
        cy.wait(1000);
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible').type(wrong_password);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains("Значение поля Пароль не совпадает с подтверждаемым.").should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).should('be.visible').click();
        cy.wait(5000);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible').clear().type(wrong_password);
        cy.wait(1000);
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible').clear().type(test_password);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains("Значение поля Пароль не совпадает с подтверждаемым.").should('be.visible');
    });
})

