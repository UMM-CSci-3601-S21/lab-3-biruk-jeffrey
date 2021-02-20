import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { Filter } from 'src/app/filter';

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
  limit: number;
  sort: string;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodosFromServer({});
  }
  getTodosFromServer(filters?) {
    this.todoService.getTodos(filters).subscribe(returnedTodos => {
      this.serverTodos = returnedTodos;
      this.update();
    });
  }

  public update() {
    const obj: Filter = {
      body: this.body,
      owner: this.owner,
      category: this.category,
      status: this.status ? this.status === 'complete' : undefined
    };
    console.log(obj + String(this.limit));
    this.filteredTodos = this.todoService.filterTodos(this.serverTodos, obj);

    if (this.sort !== undefined) {
      this.filteredTodos = this.filteredTodos.sort((first, second) => {
        const sortBy = this.sort.toLowerCase();
        const a = first[`${sortBy}`];
        const b = second[`${sortBy}`];
        return a === b ? 0 : (a > b ? 1 : -1);
      });
    }

    if (this.limit) { this.filteredTodos = this.filteredTodos.slice(0, this.limit); }
  }
}
