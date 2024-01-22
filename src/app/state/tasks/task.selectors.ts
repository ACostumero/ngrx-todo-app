import { Task } from "@app-core/interfaces/task.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { taskFeatureName } from "./tasks.reducer";
import { TasksState, tasksAdapter } from "./tasks.state";
import { RouterReducerState, getRouterSelectors } from "@ngrx/router-store";
import { Params } from "@angular/router";

export const tasksFeature = createFeatureSelector<TasksState>('tasks');
export const routerFeature = createFeatureSelector<RouterReducerState>('router');

// export const { selectRouteParams, selectQueryParams } = getRouterSelectors();

export const {
  selectCurrentRoute, // select the current route
    selectFragment, // select the current route fragment
    selectQueryParams, // select the current route query params
    selectQueryParam, // factory function to select a query param
    selectRouteParams, // select the current route params
    
    selectRouteParam, // factory function to select a route param
    selectRouteData, // select the current route data
    selectUrl, // select the current url,
} = getRouterSelectors();

export const routerSelectors = getRouterSelectors();

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
  console.log(params);
  return params;
});

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, (params) => params && params[param]);

  export const selectTaskById = (id: string) => 
  createSelector(selectAllTasks, (tasks: Task[]) => {
    console.log('Seleccionandoi por id: ', id, tasks);
    return tasks.find((task: Task) => task.id === id);
  })

  export const selectTask = createSelector(
    selectAllTasks,
    selectRouteNestedParams,
    (entities, e) => {
      console.log('entities, id', entities, e);
      //return entities.find((entity:Task) => entity.id === e['id']);
      return entities[0];
    }
  );

// export const taskStateSelect = createFeatureSelector<TaskState>(taskFeatureName);
// export const selectTasks = createSelector(
//   taskStateSelect,
//   (state: TaskState) => state.tasks
// );