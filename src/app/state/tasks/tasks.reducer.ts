import { Task } from "@app-core/interfaces/task.interface";
import { createReducer, on } from "@ngrx/store";
import { TasksActions } from "./tasks.actions";
import { EntityState } from "@ngrx/entity";
import { tasksAdapter } from "./tasks.state";

export const taskFeatureName = 'tasks';

export const tasksReducer = createReducer<EntityState<Task>>(
  tasksAdapter.getInitialState(),
  // Get
  on(TasksActions.getAllSuccess, (state: EntityState<Task>, {tasks}) => tasksAdapter.addMany(tasks, state)),
  on(TasksActions.getTaskSuccess, (state, {item}) => tasksAdapter.upsertOne(item, state)),
  // Update
  on(TasksActions.saveTaskSuccess, (state: EntityState<Task>, {item}) => tasksAdapter.upsertOne(item, state)),
  // Delete
  on(TasksActions.deleteTaskSuccess, (state: EntityState<Task>, {id}) => tasksAdapter.removeOne(id, state)),
  // Reset
  on(TasksActions.resetSuccess, (state) => tasksAdapter.removeAll(state))
);