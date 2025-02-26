import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class PomodoroComponent implements OnInit {
	@ViewChild('minutesInput') minutesInput!: ElementRef;

  tabs: Tab[] = [
    {
      id: 1,
      name: 'Work',
      time: 20,
    },
    {
      id: 2,
      name: 'Break',
      time: 5,
    },
    {
      id: 3,
      name: 'Rest',
      time: 15,
    },
  ];

  activeTab: Tab = this.tabs[0];
  minutes: number = this.activeTab?.time;
  seconds: number = 0;
  secondsStr!: string;

  ngOnInit(): void {
    this.checkSeconds();
  }

  onStartClick() {
    setInterval(() => {
      this.seconds--;
      if (this.seconds < 0) {
        this.minutes--;
        this.seconds = 59;
      }
      this.checkSeconds();
    }, 1000);
  }

  checkSeconds() {
    this.secondsStr =
      this.seconds < 10 ? '0' + this.seconds : this.seconds.toString();
  }

	checkInputWidth() {
		if(this.minutes < 10) {
			this.minutesInput.nativeElement.style.width = '40px';
		} else {
			this.minutesInput.nativeElement.style.width = '80px';
		}
	}

  handleTabClick(id: number) {
    this.activeTab = this.tabs.find((tab) => tab.id === id) as Tab;
    this.minutes = this.activeTab.time;
		this.checkInputWidth();
  }
}
