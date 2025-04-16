import { Injectable } from '@angular/core';

export interface Alarm {
  name: string;
  file: string;
}

export interface Settings {
	selectedAlarm: number,
	alarms: Alarm[],
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: Settings = {
    selectedAlarm: 0,
    alarms: [
      { name: '', file: 'mixkit-alarm-digital-clock-beep-989.wav' },
      { name: '', file: 'mixkit-alarm-tone-996.wav' },
      { name: '', file: 'mixkit-classic-short-alarm-993.wav' },
      { name: '', file: 'mixkit-security-facility-breach-alarm-994.wav' },
      { name: '', file: 'mixkit-warning-alarm-buzzer-991.wav' },
    ],
  };

  getSettings() {
    return this.settings;
  }

	updateSelectedAlarm(id: number) {
		this.settings.selectedAlarm = id;
	}
}
