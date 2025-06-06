import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordFieldType = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: { token: string }) => {
        console.log(response);
        localStorage.setItem('token', response.token);

        this.router.navigate(['/staff/stamp-info']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
