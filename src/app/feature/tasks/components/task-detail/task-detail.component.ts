import { Component, Input } from '@angular/core';
import { Task } from '@app-core/interfaces/task.interface';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Input({required: true}) taskDetail!: Task;
  
}
