describe("A. Categories List", () => {
    let catName ="Test category 1";

    before(() => {
        Cypress.Cookies.preserveOnce('company_policy_session');
        cy.login();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('company_policy_session');
    });

    it('should create Category)', function () {
        cy.visit('admin/cp/category');
        cy.contains('Categories').click();
        cy.contains('Add category').click();

        // create post
        cy.get('ul li:first input').type(catName);
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.wait(1000);
        cy.xpath("//p[text()='Success!']").should('be.visible');

        // check active 
        cy.xpath(`//div[text()='${catName}']/../../../../../th[2]`).last().contains('Inactive');
    });

    it('should edit Category)', function () {
        cy.visit('admin/cp/category');

        cy.accessAllItems();
        cy.xpath(`(//div[text()='${catName}'])`).last().click();

        cy.contains('Edit category');
        
        cy.xpath("//button[@role='switch']").click();

        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.wait(1000);
        cy.xpath("//p[text()='Success!']").should('be.visible');

        cy.xpath(`//div[text()='${catName}']/../../../../../th[2]`).last().contains('Active');
    });

    it('should delete Category)', function () {
      
        cy.visit('admin/cp/category');

        cy.accessAllItems();
        cy.contains(catName);

        // delete
        cy.xpath(`//div[text()='${catName}']/../../../../../th[4]/div/div[2]`).last().click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
        
    });

    after(() => {
        cy.clearCookies();
    });
  
});