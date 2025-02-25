import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-pomodoro',
  imports: [TitleComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss',
})
export class PomodoroComponent {}
