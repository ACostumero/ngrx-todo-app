// Core
import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, filter, map, of } from 'rxjs';

// Interfaces & Types
import { Task } from '@app-core/interfaces/task.interface';
import { TaskId } from '@app-core/types/task.type';

// Data
import * as fromTasksMock from '@app-data/mocks/tasks.mock';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _storageTasksKey = 'tasksStorage';

  public initialize(): Observable<Task[]> {
    const initialTasks: Task[] = fromTasksMock.InitialTasksMock;
    this._setTasks(initialTasks);
    return of(initialTasks);
  }

  public getAll(): Observable<Task[]> {
    return of(sessionStorage.getItem(this._storageTasksKey)).pipe(
      filter(Boolean),
      map((result: string) => JSON.parse(result)),
      defaultIfEmpty([])
    );
  }

  public getOne(id: string): Observable<Task | null> {
    return this.getAll().pipe(
      map((tasks: Task[]) => tasks.find((task: Task) => task.id === id) ?? null)
    )
  }

  public upsertOne(taskToUpsert: Task): Observable<Task> {
    return this.getAll().pipe(
      map((tasks: Task[]) => {
        const taskIndex: number = tasks.findIndex((task: Task) => task.id === taskToUpsert.id);
        const tasksUpdated = [...tasks];
        if(taskIndex === -1) {
          tasksUpdated.push(taskToUpsert);
        } else {
          tasksUpdated[taskIndex] = {...tasksUpdated[taskIndex], ...taskToUpsert}; 
        }
        this._setTasks(tasksUpdated);
        return taskToUpsert;
      }),
      
    )
  }

  public removeOne(id: string): Observable<TaskId> {
    return this.getAll().pipe(
      map((tasks: Task[]) => {
        const filteredTasks: Task[] = tasks.filter((task: Task) => task.id !== id);
        this._setTasks(filteredTasks);
        return {id};
      })
    )
  }

  public reset(): void {
    localStorage.removeItem(this._storageTasksKey);
    localStorage.clear();
  }

  private _setTasks(tasks: Task[]) {
    sessionStorage.setItem(this._storageTasksKey, JSON.stringify(tasks));
  }
}
