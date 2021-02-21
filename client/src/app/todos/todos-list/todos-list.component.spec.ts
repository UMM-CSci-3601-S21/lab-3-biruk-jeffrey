import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Todo } from '../todo';
import { TodosListComponent } from './todos-list.component';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { Filter } from 'src/app/filter';


describe('TodosListComponent', () => {
  let todoList: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosListComponent, TodoCardComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    todoList = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(todoList).toBeTruthy();
  });

  it('fetches data from the server"', () => {
    expect(todoList.serverTodos.length).toBe(300);
  });
  it('filters by owner', () => {
    const filter: Filter = { owner: 'Blanche' };
    todoList.update(filter);

    todoList.filteredTodos.forEach(todo => {
      expect(todo.owner).toBe('Blanche');
    });
  });

  it('filters by category', () => {
    const filter: Filter = { category: 'groceries' };
    todoList.update(filter);

    todoList.filteredTodos.forEach(todo => {
      expect(todo.category).toBe('groceries');
    });
  });

  it('filters by status', () => {
    const filter: Filter = { status: true };
    todoList.update(filter);

    todoList.filteredTodos.forEach(todo => {
      expect(todo.status).toBe(true);
    });
  });
  it('filters by body', () => {
    const sampleBody: string = 'Proident nostrud eiusmod consectetur commodo consequat est deserunt'
    + ' proident nostrud esse voluptate occaecat. Reprehenderit pariatur aute laborum commodo.';

    const filter: Filter = {
      body: sampleBody
    };
    todoList.update(filter);

    todoList.filteredTodos.forEach(todo => {
      expect(todo.body).toBe(sampleBody);
    });
  });
  // when clicking on view details, the id is passed for a todo that exists
  // check specific number of people
  // call some filters and check the number of returned items
  it('contains the right amount of todos', () => {
    expect(todoList.getTodosFromServer((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });
});
