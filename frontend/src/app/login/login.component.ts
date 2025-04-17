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
  name: string = '';
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
    });
  }

  onSubmit() {
    if (this.formType === 'login') {
      this.userService.login(this.email, this.password).then((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/home']);
        } else {
          alert('Incorrect user or password');
        }
      });
    } else if (this.formType === 'signup') {
      this.userService.checkUniqueUser(this.email).then((uniqueUser) => {
        if (uniqueUser) {
          // create user in the database through POST request
          this.userService.createUser(this.name, this.email, this.password).subscribe((res) => {
            if (res.success) {
              alert('User created successfully');
              this.router.navigate(['/login']);
            } else {
              alert(res.message);
            }
          });
        } else {
          alert('This email is already registered');
        }
      });
    }
  }
}
