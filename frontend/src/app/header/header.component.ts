import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() route!: string;
  loggedIn!: boolean;
  dropdownActive: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isUserLoggedIn().then((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });

    window.addEventListener('click', () => {
      if (this.dropdownActive) {
        this.dropdownActive = false;
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownActive = !this.dropdownActive;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  confirmSignout() {
    if (confirm('Are you sure you want to sign out?')) {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
  }
}
