import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { TitleComponent } from '../title/title.component';
import { UserService } from '../login/user.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, HeaderComponent, TitleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  user!: User;
  email!: string;
  password!: string;
	created!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserData();
    this.email = this.user.email;
    this.password = this.user.password;

		const date = new Date(this.user.created);
		this.created = date.toLocaleDateString('pt-BR');
  }

  onSubmit() {
    this.userService
      .updateUser(this.user.id, this.email, this.password)
      .subscribe((res) => {
				if (res.success) {
					alert('User updated successfully');
				}
			});
  }
}
