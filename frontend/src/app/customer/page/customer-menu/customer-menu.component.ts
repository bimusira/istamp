import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule,MatIconModule],
  templateUrl: './customer-menu.component.html',
  styleUrl: './customer-menu.component.css'
})
export class CustomerMenuComponent {
  constructor(private router: Router) {}

  selectAmount(amount: number) {
    sessionStorage.setItem('amount', String(amount));
    const uuid = sessionStorage.getItem('customer_id');
    this.router.navigate(['/customer/select-temp']);
  }
}
