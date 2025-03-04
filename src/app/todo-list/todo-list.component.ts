import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TitleComponent, TaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tasks?: Task[];
  edit: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.tasksService.taskCreated.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

    this.tasksService.taskUpdated.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

    this.tasksService.editClicked.subscribe((edit: boolean) => {
      this.edit = edit;
    });
  }

  handleTaskClick(id: number) {
    this.tasksService.updateActive(id);
  }

  onSaveClick() {
    this.tasksService.editClicked.emit(false);
  }
}
