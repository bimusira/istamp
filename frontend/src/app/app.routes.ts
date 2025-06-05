import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/auth/login/login.component';
import { RegisterComponent } from './staff/auth/register/register.component';
import { StampInfoComponent } from './staff/stamp-info/stamp-info.component';
import { StampPrintComponent } from './stamp-print/stamp-print.component';

export const routes: Routes = [
  // Login และ Register route แยกออกมาจาก StaffComponent
  { path: 'staff/login', component: LoginComponent },
  { path: 'staff/register', component: RegisterComponent },

  // ส่วนของ staff ที่มี sidebar + header
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: '', redirectTo: 'stamp-info', pathMatch: 'full' },
      { path: 'stamp-info', component: StampInfoComponent },  
      { path: 'stamp-print', component: StampPrintComponent }
    ],
  },

  {
    path: 'customer',
    component: CustomerComponent,
  },
];
