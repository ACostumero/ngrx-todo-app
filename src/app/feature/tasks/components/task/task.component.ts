import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@app-core/interfaces/task.interface';
import { TaskId } from '@app-core/types/task.type';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  // TODO: La exclamación no debería hacer falta
  @Input({required: true}) task!: Task;
  @Output() clickEdit: EventEmitter<TaskId> = new EventEmitter<TaskId>();
  @Output() clickDelete: EventEmitter<TaskId> = new EventEmitter<TaskId>();

  emitEdit() {
    this.clickEdit.emit({id: this.task.id});
  }

  emitDelete() {
    this.clickDelete.emit({id: this.task.id});
  }

}
