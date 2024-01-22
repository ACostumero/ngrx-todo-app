// Core
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// State
import * as fromTasks from '@app-state/tasks/task.selectors';
import { TasksActions } from '@app-state/tasks/tasks.actions';

// Services
import { RouterService } from '@app-core/services/router.service';

// Interfaces & Types
import { Task } from '@app-core/interfaces/task.interface';
import { TaskId } from '@app-core/types/task.type';

// Constants
import { APP_ROUTES } from '@app-core/constants/routes.const';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  protected readonly APP_ROUTES = APP_ROUTES;
  private readonly _store: Store = inject(Store);
  private readonly _routerService: RouterService = inject(RouterService);

  tasks$: Observable<Task[]> = this._store.select(fromTasks.selectAllTasks);

  ngOnInit(): void {
    this._store.dispatch(TasksActions.getAll());
  }

  onClickEdit(taskId: TaskId) {
    this._routerService.goToTaskDetail(taskId.id);
  }

  onClickDelete(taskId: TaskId) {
    this._store.dispatch(TasksActions.deleteTask(taskId));
  }

}
