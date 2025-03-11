import { Component } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { PomodoroComponent } from '../pomodoro/pomodoro.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, TodoListComponent, PomodoroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
