import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TitleComponent } from '../title/title.component';
import { UserService } from '../login/user.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, TitleComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserData();
  }
}
