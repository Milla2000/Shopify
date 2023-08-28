describe('Admin All products page', () => {
    beforeEach(() => {
        cy.visit('/adminAllProducts.html'); 
    });

    it('should delete a product when "Remove" button is clicked', () => {
        cy.intercept('DELETE', 'http://localhost:4500/products/*', {
            statusCode: 200,
            body: { message: 'Product deleted successfully' },
        }).as('deleteProductRequest');


        cy.get('.remove-button').first().click();

        cy.wait('@deleteProductRequest');
        cy.get('.cart-table').should('not.contain', '.product-row');
    });

it('should display the edit form when "Edit" button is clicked', () => {
    cy.visit('/adminAllProducts.html'); 
    cy.get('.edit-button').first().click();

    cy.get('#editProductForm').should('be.visible');
});

it('should redirect to the "Upload Product" page when "Upload Product" button is clicked', () => {
    cy.get('.button').contains('Upload Product').click();

    cy.url().should('include', '/uploadProduct.html');
});

it('should redirect to the "All Products" page when "All Products" button is clicked', () => {
    cy.get('.button').contains('All Products').click();

    cy.url().should('include', '/adminAllProducts.html');
});

it('should redirect to the "All Users" page when "All Users" button is clicked', () => {
    cy.get('.button').contains('All Users').click();

    cy.url().should('include', '/allUsers.html');
});


});