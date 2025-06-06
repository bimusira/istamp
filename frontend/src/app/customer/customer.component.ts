import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  constructor(private router: Router) {}

  selectAmount(amount: number) {
    sessionStorage.setItem('amount', String(amount));
    const uuid = sessionStorage.getItem('customer_id');
    this.router.navigate(['/customer/select-temp']);
  }
}
