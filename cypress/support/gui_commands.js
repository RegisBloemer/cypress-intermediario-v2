Cypress.Commands.add(
  "login",
  (
    user = Cypress.env("user_name"),
    password = Cypress.env("user_password")
  ) => {
    const login = () => {
      cy.visit("/users/sign_in");

      cy.get("[data-qa-selector='login_field']").type(user);
      cy.get("[data-qa-selector='password_field']").type(password, {
        log: false,
      });
      cy.get("[data-qa-selector='sign_in_button']").click();
    };

    login();
  }
);

Cypress.Commands.add("logout", () => {
  cy.get(".header-user-dropdown-toggle").click();
  cy.get(".sign-out-link").should("be.visible").click();
});

Cypress.Commands.add("create_project", especs_project =>{
  cy.visit('/projects/new')

  cy.get('#blank-project-name > .project-name > #project_name').should('be.visible').type(especs_project.name)
  cy.get(':nth-child(5) > #project_description').should('be.visible').type(especs_project.description)
  cy.get('#project_initialize_with_readme').should('be.visible').check()
  cy.get('#blank-project-pane > #new_project > .btn-success').click()

})
