// Core
import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// State
import * as fromTasks from '@app-state/tasks/task.selectors';
import { TasksActions } from '@app-state/tasks/tasks.actions';

// Functions
import { generateUUID } from '@app-core/functions/generate-uuid';

// Interfaces
import { Task } from '@app-core/interfaces/task.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelFormGroup } from '@app-core/types/form-group-model.type';
import { TaskContent } from '@app-core/types/task.type';
import { onlyWhitespacesValidator } from '@app-core/validators/only-whitespaces.validator';

@Component({
  selector: 'app-create-and-edit-task',
  templateUrl: './create-and-edit-task.component.html',
  styleUrls: ['./create-and-edit-task.component.scss']
})
export class CreateAndEditTaskComponent implements OnInit, OnDestroy {

  private readonly _store = inject(Store);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  
  private static readonly _TITLE_MIN_LENGTH = 3;
  protected readonly TITLE_MAX_LENGTH = 80;
  protected readonly DESCRIPTION_MAX_LENGTH = 600;

  private _taskId: string = generateUUID();

  public taskForm!: ModelFormGroup<TaskContent>;
  

  public isEditMode = false;

ngOnInit(): void {
  this._initForm();

  this._activatedRoute.params.pipe(
    takeUntilDestroyed(this._destroyRef),
    filter(({id}) => !!id),
    switchMap(({id}) => this._store.select(fromTasks.selectTaskById(id))),
    filter(Boolean),
    tap((task: Task) => this._prepareEditMode(task)),
  ).subscribe();
}

ngOnDestroy(): void {
  this._reset();
}

public save() {
  if(!this.taskForm.valid) {
    return;
  }

  const formValue = this.taskForm.getRawValue();
  formValue.title = formValue.title.trim();
  formValue.description = formValue.description.trim();

  const taskToUpsert: Task = {id: this._taskId, ...formValue};
  this._store.dispatch(TasksActions.saveTask(taskToUpsert));
}

// ---

private _initForm() {
  this.taskForm = this._formBuilder.nonNullable.group({
    title: ['', [
      Validators.required, 
      Validators.minLength(CreateAndEditTaskComponent._TITLE_MIN_LENGTH),
      Validators.maxLength(this.TITLE_MAX_LENGTH),
      onlyWhitespacesValidator()
    ]],
    description: ['', [
      Validators.maxLength(this.DESCRIPTION_MAX_LENGTH),
      onlyWhitespacesValidator()
    ]]
  });
}

private _prepareEditMode(task: Task) {
  this._setEditMode(true);
  this._setTaskId(task.id);
  this._patchForm(task);
}

private _setTaskId(value: string) {
  this._taskId = value;
}

private _setEditMode(value: boolean) {
  this.isEditMode = value;
}

private _patchForm(task: Task) {
  this.taskForm.patchValue(task);
}

private _resetForm() {
  this.taskForm.reset();
}

private _reset() {
  this._setTaskId('');
  this._setEditMode(false);
  this._resetForm();
}

}
