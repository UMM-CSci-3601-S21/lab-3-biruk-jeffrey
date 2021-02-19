import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  filteredTodos: Todo[];
  serverTodos: Todo[];

  owner: string;
  body: string;
  status: string;
  category: string;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodosFromServer();
  }
  getTodosFromServer() {
    this.todoService.getTodos({}).subscribe(returnedTodos => {
      this.serverTodos = returnedTodos;
      this.update();
    });
  }

  public update() {
    const obj = {
      body: this.body,
      owner: this.owner,
      category: this.category,
      status: this.status === 'complete'
    };
    console.log(obj);
    this.filteredTodos = this.todoService.filterTodos(
      this.serverTodos, obj);
  }
}
