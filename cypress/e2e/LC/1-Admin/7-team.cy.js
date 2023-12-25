describe("LC.A5. Create team", () => {
    const tName = "QA Test Team" + Math.random() * 100;

    beforeEach(() => {
        cy.admin();
    });

    it('should create new team', function () {
        // Go to add user page
        cy.xpath("//a[text()='Teams']").click();
        cy.xpath("//button[text()='Add team']").click();

        // Input credentials
        cy.xpath("(//input[@type='text'])[1]").type(tName);
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit.");

        cy.xpath("//button[text()='Save']").click();

        // Assert team created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');

    });

    it('should delete team', function () {
        cy.visit('/admin/teams');
        cy.xpath(`//div[text()='${tName}']`).parent().parent().parent().parent().parent().find('.tooltip').last().click();
        cy.get('button').contains('Delete').click();

        // Assert team deleted
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
