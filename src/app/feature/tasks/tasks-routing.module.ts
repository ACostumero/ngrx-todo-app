import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '@app-feature/tasks/containers/tasks/tasks.component';
import { CreateAndEditTaskComponent } from '@app-feature/tasks/containers/create-and-edit-task/create-and-edit-task.component';
import { APP_ROUTES } from '@app-core/constants/routes.const';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: `${APP_ROUTES.TASK_DETAIL}/:id`,
    title: 'Edit task',
    component: CreateAndEditTaskComponent
  },
  {
    path: `${APP_ROUTES.ADD_TASK}`,
    title: 'New task',
    component: CreateAndEditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
