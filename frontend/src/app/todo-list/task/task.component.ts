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
  @Input() active: boolean = false;
  @Output() taskClicked = new EventEmitter<number>();
  @Output() taskDeleted = new EventEmitter<boolean>();

  favorite!: boolean;
  taskTitleInput!: string;
  taskDescriptionInput!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.favorite = Boolean(this.task.favorite);
    this.taskTitleInput = this.task.title;
    this.taskDescriptionInput = this.task.description;
  }

  handleClick(id?: number) {
    if (!this.edit) {
      this.taskClicked.emit(id);
    }
}

  handleFavorite(event: Event) {
    event.stopPropagation();
    this.tasksService.updateFavorite(this.task).subscribe((res) => {
      if (res.success) {
        this.favorite = !this.favorite;
      } else {
        alert(res.message);
      }
    });
  }

  handleDelete(event: Event, id?: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      event.stopPropagation();
      this.tasksService.deleteTask(id).subscribe((res) => {
				this.taskDeleted.emit(true);
			});
    }
  }
}
