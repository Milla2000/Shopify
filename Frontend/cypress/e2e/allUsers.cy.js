describe('User List Page', () => {
    beforeEach(() => {
        // Visit the user list page before each test
        cy.visit('/allUsers.html');
    });

    it('should delete a user when remove button is clicked', () => {
        // Stub the user list API request
        cy.intercept('GET', 'http://localhost:4500/users/allusers', {
            statusCode: 200,
            body: {
                users: [
                    { id: 1, username: 'Ngatia Mwai', email: 'ngatia@gmail.com', phone_number: '1234567890' },
                    { id: 2, username: 'Milla Jesso', email: 'ngatia@gmail.com', phone_number: '9876543210' },
                    { id: 3, username: 'Samuel Mwaniki', email: 'ngatia@gmail.com', phone_number: '9876543210' },
                    { id: 4, username: 'Ruth Wamuyu', email: 'ruth@gmail.com', phone_number: '9876543210' },
                    { id: 5, username: 'Gift Mwashire', email: 'gift@gmail.com', phone_number: '9876543210' },
                ],
            },
        }).as('getUserList');

        cy.intercept('DELETE', 'http://localhost:4500/users/softdelete/*', {
            statusCode: 200,
            body: { message: 'User deleted successfully!' },
        }).as('deleteUser');

        cy.visit('/allUsers.html');
        cy.wait('@getUserList');

        cy.get('.remove-button').first().click();
        cy.on('window:confirm', () => true);

        cy.wait('@deleteUser');

        cy.get('.user-table').find('tr').should('have.length', 7);

        cy.on('window:alert', (message) => {
            expect(message).to.equal('User deleted successfully!');
        });
    });
});
