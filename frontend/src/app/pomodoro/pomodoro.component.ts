import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from '../title/title.component';
import { Tab } from './tab.model';

@Component({
  selector: 'app-pomodoro',
  imports: [CommonModule, FormsModule, TitleComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss',
})
export class PomodoroComponent implements OnInit, AfterViewInit {
  @ViewChild('minutesInput') minutesInput!: ElementRef;
  @ViewChild('audio') audioElement!: ElementRef;

  tabs: Tab[] = [
    {
      id: 0,
      name: 'Test',
      time: {
        minutes: 0,
        seconds: 2,
      },
    },
    {
      id: 1,
      name: 'Work',
      time: {
        minutes: 25,
        seconds: 0,
      },
    },
    {
      id: 2,
      name: 'Break',
      time: {
        minutes: 5,
        seconds: 0,
      },
    },
    {
      id: 3,
      name: 'Rest',
      time: {
        minutes: 15,
        seconds: 0,
      },
    },
  ];

  alarms: string[] = [
    'mixkit-alarm-digital-clock-beep-989.wav',
    'mixkit-alarm-tone-996.wav',
    'mixkit-classic-short-alarm-993.wav',
    'mixkit-security-facility-breach-alarm-994.wav',
    'mixkit-warning-alarm-buzzer-991.wav',
  ];

  activeTab: Tab = this.tabs[0];
  activeAlarm: number = 0;

  minutes: number = this.activeTab.time.minutes;
  seconds: number = this.activeTab.time.seconds;
  secondsStr!: string;

  timerStarted: boolean = false;
  isPaused: boolean = false;
  alarmStarted: boolean = false;

  ngOnInit(): void {
    this.checkSeconds();
  }

  ngAfterViewInit(): void {
    this.checkInputWidth();
  }

  onInput() {
    this.checkInputWidth();
    this.activeTab.time.minutes = this.minutes;
  }

  onStartClick() {
    if (this.timerStarted) {
      if (!this.isPaused) {
        this.isPaused = true;
      } else if (this.isPaused) {
        this.isPaused = false;
      }
      if (this.alarmStarted) {
        this.audioElement.nativeElement.pause();
        this.audioElement.nativeElement.currentTime = 0;
        this.timerStarted = false;
        this.isPaused = false;
        this.alarmStarted = false;
        this.minutes = this.activeTab.time.minutes;
        this.seconds = this.activeTab.time.seconds;
        this.checkSeconds();
        this.checkInputWidth();
      }
    } else {
      let timer = setInterval(() => {
        if (!this.isPaused) {
          this.seconds--;
          if (this.seconds < 0) {
            this.minutes--;
            this.seconds = 59;
          }
          if (this.seconds === 0 && this.minutes === 0) {
            this.audioElement.nativeElement.play();
            this.alarmStarted = true;
            clearInterval(timer);
          }
          this.checkSeconds();
          this.checkInputWidth();
        }
      }, 1000);

      this.timerStarted = true;
    }
  }

  checkSeconds() {
    this.secondsStr =
      this.seconds < 10 ? '0' + this.seconds : this.seconds.toString();
  }

  checkInputWidth() {
    if (this.minutes < 10) {
      this.minutesInput.nativeElement.style.width = '40px';
    } else {
      this.minutesInput.nativeElement.style.width = '80px';
    }
  }

  onTabClick(id: number) {
    if (!this.timerStarted) {
      this.activeTab = this.tabs.find((tab) => tab.id === id) as Tab;
      this.minutes = this.activeTab.time.minutes;
      this.seconds = this.activeTab.time.seconds;
      this.checkSeconds();
      this.checkInputWidth();
    }
  }
}
