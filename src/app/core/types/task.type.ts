import { Task } from "@app-core/interfaces/task.interface";

export type TaskId = Pick<Task, 'id'>;
export type TaskContent = Omit<Task, 'id'>;