// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TasksRoutingModule } from '@app-feature/tasks/tasks-routing.module';

// State
import { TasksEffects } from '@app-state/tasks/tasks.effects';
import { taskFeatureName, tasksReducer } from '@app-state/tasks/tasks.reducer';

// Components
import { TasksComponent } from '@app-feature/tasks/containers/tasks/tasks.component';
import { TaskComponent } from '@app-feature/tasks/components/task/task.component';
import { CreateAndEditTaskComponent } from '@app-feature/tasks/containers/create-and-edit-task/create-and-edit-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    CreateAndEditTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    StoreModule.forFeature(taskFeatureName, tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ]
})
export class TasksModule { }
