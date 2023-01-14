import { faker } from '@faker-js/faker'

describe('Create_Project', () => {

  beforeEach(() => {
    cy.login()
  })

  it('successfully create', ()=>{

    const especs_project = {
      name: `project-${faker.datatype.uuid()}`,
      description:faker.random.words(5), 
    }

    cy.create_project(especs_project)
    

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${especs_project.name}`)
    cy.contains(especs_project.name).should('be.visible')
    cy.contains(especs_project.description).should('be.visible')
  })
})