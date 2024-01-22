import { Task } from "@app-core/interfaces/task.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState, tasksAdapter } from "./tasks.state";
import { RouterReducerState } from "@ngrx/router-store";
import { Params } from "@angular/router";

export const tasksFeature = createFeatureSelector<TasksState>('tasks');
export const routerFeature = createFeatureSelector<RouterReducerState>('router');

const { selectEntities, selectAll } = tasksAdapter.getSelectors();

export const selectAllTasks = createSelector(
  tasksFeature,
  selectAll
);

export const selectTaskEntities = createSelector(
  tasksFeature,
  selectEntities
);

export const selectRouteNestedParams = createSelector(routerFeature, (router) => {
  let currentRoute = router?.state?.root;
  let params: Params = {};
  while (currentRoute?.firstChild) {
    currentRoute = currentRoute.firstChild;
    params = {
      ...params,
      ...currentRoute.params,
    };
  }
  return params;
});

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, (params) => params && params[param]);

  export const selectTaskById = (id: string) => 
  createSelector(selectAllTasks, (tasks: Task[]) => {
    return tasks.find((task: Task) => task.id === id);
  })