import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  template: `
    <h2>เลือกหน้า Demo</h2>
    <button mat-raised-button color="primary" (click)="goTo('staff')">Staff</button>
    <button mat-raised-button color="accent" (click)="goTo('customer')">Customer</button>
  `,
  styles:[ `
    h2 {
      text-align: center;
      margin-top: 20px;
    }
    button {
      display: block;
      margin: 10px auto;
    }
  `],
})
export class HomeComponent {
    constructor(private router: Router) {}
  
   goTo(path:string) {
    this.router.navigate([`/${path}`]);
  }
}
