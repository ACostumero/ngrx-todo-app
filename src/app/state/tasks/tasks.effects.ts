import { Injectable, inject } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { TasksActions } from "./tasks.actions";
import { getRouterSelectors, routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { EMPTY, catchError, defaultIfEmpty, filter, from, map, mergeMap, of, startWith, switchMap, tap, throwError, withLatestFrom } from "rxjs";
import * as fromTasksMock from '@app-data/mocks/tasks.mock';
import * as fromTasks from '@app-state/tasks/task.selectors';
import { APP_ROUTES } from "@app-core/constants/routes.const";
import {  selectCurrentRoute, selectFragment, selectQueryParam, selectQueryParams, selectRouteData, selectRouteParams } from "./task.selectors";
import { Store } from "@ngrx/store";
import { StorageService } from "@app-core/services/storage.service";
import { Task } from "@app-core/interfaces/task.interface";
import { Route, Router } from "@angular/router";
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
      map((result: Task[]) => {
        console.log('getAll effect', result);
        return TasksActions.getAllSuccess({tasks: result})
      })
    )
  });

  deleteTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({id}) => this._storageService.removeOne(id)),
      map(({id}) => {
        console.log('getAll effect', id);
        return TasksActions.deleteTaskSuccess({id})
      })
    )
  });

  saveTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TasksActions.saveTask),
      switchMap((task: Task) => this._storageService.upsertOne(task)),
      map((taskUpdated: Task) => {
        console.log('updateOne effect', taskUpdated);
        return TasksActions.saveTaskSuccess({item: taskUpdated})
      })
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
      tap(() => console.log('estoy entrando aqui')),
      switchMap((e) => {
        console.log('entro aqui w', e.payload);
        
        const taskId: string = e.payload.event.url.replace(`/${APP_ROUTES.TASK_DETAIL}/`, '');
        if(!taskId) {
          return throwError(() => `Task with id ${taskId} doesn't exists`);
        }
        console.log('intentando obtener con id: ', taskId);
        
        return this._storageService.getOne(taskId);
      }),
      tap((e) => console.log('cuestion obtenida',e )),
      filter(Boolean),
      map((item: Task) => TasksActions.getTaskSuccess({item}))
      // catchError((error: string) => of(TasksActions.getTaskFail({error})))
    )
  })


}