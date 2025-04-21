import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TitleComponent, TaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tasks?: Task[];
  activeTaskId!: number;
  edit: boolean = false;

  taskTime!: number;
  taskSessions!: number;

  constructor(private tasksService: TasksService, private sessionsService: SessionsService) {}

  ngOnInit(): void {
    this.getTasks();

    this.tasksService.taskCreated.subscribe(() => {
      this.getTasks();

      const tasksDiv = document.querySelector('.tasks-content');
      const scrollHeight: number = tasksDiv?.scrollHeight as number;

      // scroll down when adding task
      setTimeout(() => {
        tasksDiv?.scroll({
          top: scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    });

    this.tasksService.editClicked.subscribe((edit: boolean) => {
      this.edit = edit;
    });

    this.setActiveTask();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe((res) => {
      this.tasks = res.body;
    });
  }

  handleTaskClick(id: number) {
    this.tasksService.updateActive(id).subscribe((res) => {
      this.setActiveTask();
    });
  }

	handleTaskDelete() {
		this.edit = false;
    this.getTasks();
	}

  onSaveClick() {
    this.tasksService.editClicked.emit(false);
  }

  setActiveTask() {
    this.tasksService.getActiveTask().subscribe((res) => {
      this.activeTaskId = res.body[0].taskId;
    });

    // not working
    this.taskTime = this.sessionsService.sumTimeByTask(this.activeTaskId);
    this.taskSessions = this.sessionsService.getSessionsFromTask(this.activeTaskId).length;
  }
}
