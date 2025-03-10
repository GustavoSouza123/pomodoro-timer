import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() edit: boolean = false;
  @Output() taskClicked = new EventEmitter<number>();

  constructor(private tasksService: TasksService) {}

  handleClick(id?: number) {
    if (!this.edit) {
      this.taskClicked.emit(id);
    }
  }

  handleFavorite(event: Event, id?: number) {
    if (!this.edit) {
      event.stopPropagation();
      this.tasksService.updateFavorite(id);
    }
  }

  handleInput(attribute: string, event: Event) {
    const target = event.target as HTMLElement;
    const value = target.innerHTML.trim();

    // update task through tasks service in real time (not working)
    if (attribute === 'title') {
      this.tasksService.updateTask(
        this.task.id as number,
        value as string,
        this.task.description as string
      );
    } else if (attribute === 'description') {
      this.tasksService.updateTask(
        this.task.id as number,
        this.task.title as string,
        value as string
      );
    }
  }
}
