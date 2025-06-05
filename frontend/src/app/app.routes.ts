import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/auth/login/login.component';
import { RegisterComponent } from './staff/auth/register/register.component';
import { StampInfoComponent } from './staff/stamp-info/stamp-info.component';
import { StampPrintComponent } from './stamp-print/stamp-print.component';

export const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'stamp-info', component: StampInfoComponent },  
      { path: 'stamp-print', component: StampPrintComponent}
    ],
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
];
