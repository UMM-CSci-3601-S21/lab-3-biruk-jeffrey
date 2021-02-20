import { Todo } from './todos/todo';

export class Filter {
  id?: string;
  category?: string;
  body?: string;
  owner?: string;
  status?: boolean;

  static passesFilter(filter?: Filter,) {
    return (todo: Todo) => {
      if (filter) {
        const { id, body, status, owner, category } = filter;
        return (id === undefined || todo._id === id) &&
          (body === undefined || todo.body.toLowerCase().includes(body.toLowerCase())) &&
          (owner === undefined || todo.owner.toLowerCase().includes(owner.toLowerCase())) &&
          (category === undefined || todo.category.toLowerCase().includes(category.toLowerCase())) &&
          (status === undefined || todo.status === status);
      }
      else { return true; }
    };
  };
}
