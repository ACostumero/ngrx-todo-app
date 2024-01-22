import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskId } from "@app-core/types/task.type";
import { Task } from "@app-core/interfaces/task.interface";

export const ADD_TASK = '[Tasks] Add task';
export const DELETE_TASK = '[Tasks] Delete task';
export const GET_TASKS = '[Tasks] Get tasks';
export const GET_TASKS_SUCCESS = '[Tasks] Get tasks success';
export const GET_TASKS_FAIL = '[Tasks] Get tasks fail';
export const GET_TASK_BY_ID = '[Tasks] Get task by ID';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    // Get
    'Get All': emptyProps(),
    'Get All Success': props<{tasks: Task[]}>(),
    // Get One
    'Get Task': props<TaskId>(),
    'Get Task Success': props<{item: Task}>(),
    'Get Task Fail': props<{error: string}>(),
    // Add/Edit One
    'Save Task': props<Task>(),
    'Save Task Success': props<{item: Task}>(),
    // Delete One
    'Delete Task': props<TaskId>(),
    'Delete Task Success': props<TaskId>(),
    // Delete All
    'Reset': emptyProps(),
    'Reset Success': emptyProps()
  }
});


// export const addTask = createAction(
//   ADD_TASK,
//   props<TaskContent>()
// );

// export const deleteTask = createAction(
//   DELETE_TASK,
//   props<TaskId>()
// );

// export const getTasks = createAction(
//   GET_TASKS,
// );

// export const getTasksSuccess = createAction(
//   GET_TASKS_SUCCESS,
//   props<{tasks: Task[]}>()
// );

// export const getTasksFail = createAction(
//   GET_TASKS_FAIL,
//   props<{error: string}>()
// );

// export const getTaskById = createAction(
//   GET_TASK_BY_ID,
//   props<TaskId>()
// );

