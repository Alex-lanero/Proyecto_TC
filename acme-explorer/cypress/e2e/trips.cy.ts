describe('Trips flow', () => {

  beforeEach(() => {

    cy.request('GET', 'http://localhost:3000/applications')
      .then((res) => {
        res.body.forEach(app => {
          cy.request('DELETE', `http://localhost:3000/applications/${app.id}`);
        });
      });

  });

  it('should apply cleanly', () => {

    cy.visit('http://localhost:4200');

    cy.window().then((win) => {
      win.localStorage.setItem('user', JSON.stringify({
        id: 'explorer@test.com',
        email: 'explorer@test.com',
        role: 'explorer'
      }));
    });

    cy.visit('http://localhost:4200/trips');

    cy.contains('Sahara').click();

    cy.contains('Apply').click();

    cy.contains('Pending').should('exist');

  });

});