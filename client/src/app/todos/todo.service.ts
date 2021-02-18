import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly todoUrl: string = environment.apiUrl + 'todos';


  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?:
    {
      id?: string;
      owner?: string;
      status?: boolean; body?: string;
      category?: string;
    }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.id) {
        httpParams = httpParams.set('id', filters.id);
      }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', String(filters.status));
      }
      if (filters.category) {
        httpParams = httpParams.set('status', filters.category);
      }
      if (filters.body) {
        httpParams = httpParams.set('status', filters.body);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: {
    id?: string;
    category?: string;
    body?: string;
    owner?: string;
    status?: boolean;
  }): Todo[] {

    let filteredTodos = todos;

    if (filters.id) {
      filters.id = filters.id.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.id.toLowerCase().indexOf(filters.id) !== -1);
    }
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }
    if (filters.status) {
      filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
    }
    if (filters.category) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }
    if (filters.body) {
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }


    return filteredTodos;
  }
}
