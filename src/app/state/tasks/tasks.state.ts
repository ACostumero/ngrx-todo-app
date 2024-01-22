import { Task } from "@app-core/interfaces/task.interface";
import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface TasksState extends EntityState<Task> {};

export const tasksAdapter = createEntityAdapter<Task>();