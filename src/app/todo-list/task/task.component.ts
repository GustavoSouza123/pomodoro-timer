import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task?: Task;
  @Output() taskClicked = new EventEmitter<number>();

  constructor(private tasksService: TasksService) {}

  handleClick(id?: number) {
    this.taskClicked.emit(id);
  }

  handleFavorite(event: Event, id?: number) {
    event.stopPropagation();
    this.tasksService.updateFavorite(id);
  }
}
