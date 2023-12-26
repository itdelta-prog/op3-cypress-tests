
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
        cy.visit(Cypress.config().registerUrl);
        cy.wait(3000);
        // Switch to RU
        cy.xpath('/html/body/div[2]/div/nav/div/div/div[2]/div/div/button').click();
        cy.wait(1000);
        cy.xpath('/html/body/div[2]/div/nav/div/div/div[2]/div/div[2]/a[2]').click();
        cy.wait(1000);
    });

    it('valid-email-input', function () {
        cy.xpath("//input[@id='email']", {timeout: 10000}).type(userEmail);
        cy.wait(1000);
        cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
        cy.wait(3000);
        cy.task('getLastEmail', {user: userEmail, pass: pass,}); // проверяем почту чтобы следующая проверка нашла правильный код
        cy.contains('Верификация');
    });
})
