import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/auth/login/login.component';
import { RegisterComponent } from './staff/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
];
