import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskId } from "@app-core/types/task.type";
import { Task } from "@app-core/interfaces/task.interface";

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
