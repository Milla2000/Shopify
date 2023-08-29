describe('Upload Form', () => {
    beforeEach(() => {
        // Visit the register page before each test
        cy.visit('/uploadProduct.html');
    });
it('should successfully upload a product', () => {
    // Stub the Cloudinary upload API request
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/dhgs8thzx/image/upload', {
        statusCode: 200,
        body: { url: 'mocked_cloudinary_url' },
    }).as('cloudinaryUpload');

// Stub the product creation API request
cy.intercept('POST', 'http://localhost:4500/products', {
    statusCode: 200,
    body: { message: 'Product created successfully' },
}).as('createProduct');

    cy.visit('/uploadproduct.html'); // Replace with the actual URL
    // Fill out the form fields
    cy.get('.name').type('Shorts');
    cy.get('.description').type('This is the best short in the market.');
    cy.get('.price').type('990');
    cy.get('.category').type('Clothes');
    cy.get('.num_items').type('10');
    // Upload a file (can stub Cloudinary response here)
    cy.get('.image').attachFile('../fixtures/Images/shorts.jpg', { subjectType: 'input' });

    cy.get('#uploadProduct').submit();

    // Wait for the product creation request to complete
    cy.wait('@createProduct');

    // Assert that the user is redirected to the "adminAllProducts.html" page
    cy.url().should('include', '/adminAllProducts.html');
})
});
