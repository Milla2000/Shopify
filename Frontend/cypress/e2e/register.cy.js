describe('Register Form', () => {
    beforeEach(() => {
        // Visit the register page before each test
        cy.visit('/register.html');
    });

it('should register a new user successfully', () => {
    const full_name = 'John Kiriamiti';
    const email = 'john@gmail.com';
    const phone_number = '1234567890';
    const password = '123456789';

    cy.visit('/register.html'); 

    cy.get('.full_name').type(full_name);
    cy.get('.email').type(email);
    cy.get('.phone_number').type(phone_number);
    cy.get('.password').type(password);

    cy.get('#register').submit();

    cy.url().should('include', '/register.html');
});

it('should redirect to the login page when "Log in" link is clicked', () => {
    cy.visit('/register.html');

    cy.contains('Log in').click();

    cy.url().should('include', '/login.html');
});
});
