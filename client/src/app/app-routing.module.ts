import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'todos', component: TodosListComponent},
  {path: 'todos/:id', component: TodoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
