import { faker } from "@faker-js/faker";

describe("Create_Inssue", () => {

  const especs_insue = {
    name: `inssue-${faker.datatype.uuid()}`,
    description: faker.random.words(5),
    especs_project: {  
      name: `project-${faker.datatype.uuid()}`,
      description:faker.random.words(5), 
    }
  }

  beforeEach(()=> {
    cy.login()
    cy.create_project(especs_insue.especs_project)
  })
  
  it('successfully create inssue', () => {
    cy.create_inssue(especs_insue)
    cy.get('.detail-page-description').should('contain', especs_insue.name).and('contain', especs_insue.description)

  })

})  