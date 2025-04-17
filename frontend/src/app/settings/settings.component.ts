import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { TitleComponent } from '../title/title.component';
import { UserService } from '../login/user.service';
import { User } from '../login/user.model';
import { Settings, SettingsService } from './settings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    TitleComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  @ViewChild('audio') audioElement!: ElementRef;

  user!: User;
  settings!: Settings;

  name!: string;
  email!: string;
  password!: string;
  created!: string;

  constructor(private userService: UserService, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.name = this.user.name;
    this.email = this.user.email;
    this.password = this.user.password;
    const date = new Date(this.user.created);
    this.created = date.toLocaleDateString('pt-BR');

    this.settings = this.settingsService.getSettings();
  }

  onUpdateUserSubmit() {
    this.userService
      .updateUser(this.user.id, this.name, this.email, this.password)
      .subscribe((res) => {
        if (res.success) {
          alert('User updated successfully');
        } else {
          alert(res.message);
        }
      });
  }

  onSelectAlarmSound(id: number) {
    this.settingsService.updateSelectedAlarm(id);
    this.audioElement.nativeElement.src = this.settings.alarms[this.settings.selectedAlarm].file;

    this.audioElement.nativeElement.pause();
    this.audioElement.nativeElement.currentTime = 0;
    this.audioElement.nativeElement.play();
  }
}
