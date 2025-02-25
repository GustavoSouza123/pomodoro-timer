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
  providers: [TasksService],
})
export class TodoListComponent implements OnInit {
  tasks?: Task[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
  }

  handleTaskClick(id: number) {
    this.tasksService.updateActive(id);
  }
}
