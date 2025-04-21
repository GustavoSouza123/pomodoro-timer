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
  @Input() edit: boolean = false;

  constructor(private tasksService: TasksService) {}

  onAddClick() {
    this.tasksService.createTask('My task', 'Description of my task').subscribe((res) => {
      if (res.success) {
				this.tasksService.taskCreated.emit(true);
        alert('Task created successfully');
      } else {
        alert(res.message);
      }
    });
  }

  onEditClick() {
    this.edit = !this.edit;
    this.tasksService.editClicked.emit(this.edit);
  }
}
