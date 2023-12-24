const {recurse} = require("cypress-recurse");
describe('2-Regi-RU-valid-email-code-verification.cy.js', () => {
    let userEmail;
    let pass;
    let nav;
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
        var midText;
        //const email = Cypress.env('authEmail');

        //cy.contains("Забыли пароль?").should('be.visible').click();

        //cy.wait(65000); //временное решение - org-online.ru высылает письмо сброса пароля  с ограничением, 1 раз в минуту

        cy.xpath("//input[@id='email']", {timeout: 10000}).type(userEmail);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(1000);
        cy.contains('Верификация');
        //cy.openWindow('/');
        //cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        //cy.wait(1000);
        //cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
        cy.task('getLastEmail', {user: userEmail, pass: pass,}).its('html').then(($html) => {
                console.log(typeof($html));
                console.log($html);
                console.log($html.match(/[0-9]+/g)[0]);
                var xmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>";
                var doc = new DOMParser().parseFromString($html, "text/html");
                console.log(doc);
                console.log(doc.firstChild.innerHTML); // => <a href="#">Link...
                console.log(doc.innerHTML); // => Link
                console.log(doc.querySelector("p").innerText);
                let midText = doc.querySelector("p").innerText;
                console.log(midText.match(/[0-9]+/g)[0]);
                //console.log(doc.querySelector("p").match(/[0-9]+/g)[0]);
            cy.xpath("//input[@id='code']", {timeout: 10000}).type(midText.match(/[0-9]+/g)[0]);
            });
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        //cy.xpath("//input[@id='code']", {timeout: 10000}).type(midText.match(/[0-9]+/g)[0]);
        cy.wait(1000);
        //const email = Cypress.env('authEmail');
        //const password = Cypress.env('authPassword');
 /*       recurse( //эта рекурсия не работает - таск возвращает таймаут
            () => cy.task('getLastEmail', {user: userEmail, pass: pass,}), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 5000, // retry up to 3 minutes
                delay: 5000, // wait 5 seconds between attempts
            },
        )*/
       // cy
        /*cy.contains('Ваш проверочный код:').invoke('text').then(($btn) => {
            console.log($btn);
            console.log($btn.match(/[0-9]+/g)[0]);
        });*/

    });

    /*it('getting code from last email', function () {
        cy.openWindow('/');
        cy.wait(1000);
        //const email = Cypress.env('authEmail');
        //const password = Cypress.env('authPassword');
        recurse( //эта рекурсия не работает - таск возвращает таймаут
            () => cy.task('getLastEmail', {user: userEmail, pass: pass,}), // Cypress commands to retry
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
        cy.contains('Ваш проверочный код:').invoke('text').then(($btn) => {
            console.log($btn);
            console.log($btn.match(/[0-9]+/g)[0]);
        });
    });*/
})
