import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksActions } from "./tasks.actions";
import { routerNavigatedAction } from '@ngrx/router-store';
import { EMPTY, filter, map, switchMap, tap, throwError } from "rxjs";
import { APP_ROUTES } from "@app-core/constants/routes.const";
import { Store } from "@ngrx/store";
import { StorageService } from "@app-core/services/storage.service";
import { Task } from "@app-core/interfaces/task.interface";
import { RouterService } from "@app-core/services/router.service";

@Injectable()
export class TasksEffects {

  private readonly _actions$: Actions = inject(Actions);
  private readonly _store: Store = inject(Store);
  private readonly _storageService: StorageService = inject(StorageService);
  private readonly _routerService: RouterService = inject(RouterService);

  // ---

  loadAllTasks$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.getAll),
      switchMap(() => this._storageService.getAll()),
      map((result: Task[]) => TasksActions.getAllSuccess({tasks: result}))
    )
  });

  deleteTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({id}) => this._storageService.removeOne(id)),
      map(({id}) => TasksActions.deleteTaskSuccess({id}))
    )
  });

  saveTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.saveTask),
      switchMap((task: Task) => this._storageService.upsertOne(task)),
      map((taskUpdated: Task) => TasksActions.saveTaskSuccess({item: taskUpdated}))
    )
  });

  redirectAfterSave$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.saveTaskSuccess),
      switchMap(() => {
        this._routerService.goToMainPage();
        return EMPTY;
      })
    );
  }, { dispatch: false });

  resetTasks$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.reset),
      map(() => {
        this._storageService.reset();
        return TasksActions.resetSuccess();
      })
    )
  });

  loadTaskDetail$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({payload}) => payload.event.url.includes(APP_ROUTES.TASK_DETAIL)),
      switchMap((e) => {
        const taskId: string = e.payload.event.url.replace(`/${APP_ROUTES.TASK_DETAIL}/`, '');
        if(!taskId) {
          return throwError(() => `Task with id ${taskId} doesn't exists`);
        }
        
        return this._storageService.getOne(taskId);
      }),
      filter(Boolean),
      map((item: Task) => TasksActions.getTaskSuccess({item}))
    )
  })


}