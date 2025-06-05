import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class StaffComponent {
  collapsed = false;
  dropdownOpen = false;
  username = 'John Doe';

  constructor(public router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    console.log('Logout clicked');
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
