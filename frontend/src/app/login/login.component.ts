import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formType!: string;
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.formType = data['form'];
      console.log(this.formType);
    });
  }

  onSubmit() {
    if (this.formType === 'login') {
      if (this.userService.login(this.email, this.password)) {
        this.router.navigate(['/home']);
      } else {
        alert('Incorrect user or password');
      }
    } else if (this.formType === 'signup') {
    }
  }
}
