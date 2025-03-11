import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { TaskComponent } from './task/task.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { SessionsService } from './sessions.service';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TitleComponent, TaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tasks?: Task[];
  activeTask?: Task;
  edit: boolean = false;

  taskTime!: number;
  taskSessions!: number;

  constructor(
    private tasksService: TasksService,
    private sessionsService: SessionsService // private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.tasksService.taskCreated.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      // this.scroller.scrollToAnchor('.tasks:last-child');

      const tasksDiv = document.querySelector('.tasks-content');
      const scrollHeight: number = tasksDiv?.scrollHeight as number;

      setTimeout(() => {
        tasksDiv?.scroll({
          top: scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    });

    this.tasksService.editClicked.subscribe((edit: boolean) => {
      this.edit = edit;
    });

    this.setActiveTask();
  }

  handleTaskClick(id: number) {
    this.tasksService.updateActive(id);
  }

  onSaveClick() {
    this.tasksService.editClicked.emit(false);
  }

  setActiveTask() {
    this.activeTask = this.tasks?.find((task) => task.active);
    this.taskTime = this.sessionsService.sumTimeByTask(
      this.activeTask?.id as number
    );
    this.taskSessions = this.sessionsService.getSessionsFromTask(
      this.activeTask?.id as number
    ).length;
  }
}
