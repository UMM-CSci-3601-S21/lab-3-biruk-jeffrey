import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {

    cy.get('#todo-owner-input').type('Barry');

    page.getTodoCards().each(e => {
      cy.wrap(e).find('.todo-card-name').should('have.text', 'Barry');
    });

    page.getTodoCards().find('.todo-card-name').each($el =>
        expect($el.text()).to.equal('Barry')
      );
});



  it('Should chose type string into body return proper elements', () => {

    cy.get('#todo-body-input').type('Ipsum');

    page.getTodoCards().each(e => {
        cy.wrap(e).find('.body').contains('ipsum', { matchCase: false });
    });

  });

  it('Should chose status and return proper elements', () => {

    page.selectRole('complete');

    page.getStatuses()

      .should('contain.text', 'Complete');


  });

  it('Should click view profile on a user and go to the right URL', () => {
    page.getTodoCards().first().then((card) => {
      const firstTodoOwner = card.find('.todo-card-name').text();



      page.clickViewProfile(page.getTodoCards().first());


      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);


      cy.get('.todo-card-name').first().should('have.text', firstTodoOwner);
    });
   });
});
