import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TasksService } from '../todo-list/tasks.service';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() title: string = 'My title';
  @Input() subtitle: string = 'My subtitle';
  @Input() addButton: boolean = false;

  constructor(private tasksService: TasksService) {}

  onAddClick() {
    this.tasksService.createTask();
  }

  onEditClick() {
    this.tasksService.editClicked.emit(true);
  }
}
