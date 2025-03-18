import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() edit: boolean = false;
  @Output() taskClicked = new EventEmitter<number>();

  taskTitleInput!: string;
  taskDescriptionInput!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskTitleInput = this.task.title;
    this.taskDescriptionInput = this.task.description;
  }

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
}
