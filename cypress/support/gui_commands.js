Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true} = {}

) => {
  const login = ()=> {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

const validate = ()=> {
  cy.visit('/')
  cy.location('pathname', {timeout: 1000})
  .should('not.eq', '/users/sign_in')
}
  
  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }

})

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


Cypress.Commands.add("create_inssue", especs_inssue =>{
  cy.visit('dashboard/projects')

  cy.contains(especs_inssue.especs_project.name).click()
  cy.get(".shortcuts-issues").click()
  cy.get("#new_issue_link").click()
  cy.get('#issue_title').should("be.visible").type(especs_inssue.name)
  cy.get('#issue_description').should("be.visible").type(especs_inssue.description)
  cy.get('.append-right-10 > .btn').should("be.visible").click()
})


Cypress.Commands.add("gui_setLabelOnIssue", (label) => {
  cy.get('.labels > .title > .js-sidebar-dropdown-toggle').click()
  cy.contains(label.name).should("be.visible").click()
  cy.get('.dropdown-page-one > .dropdown-title > .dropdown-title-button > .fa').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})