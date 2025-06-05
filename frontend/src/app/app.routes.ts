import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/auth/login/login.component';
import { RegisterComponent } from './staff/auth/register/register.component';
import { SelectTempComponent } from './customer/page/template/select-temp/select-temp.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
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
    children: [
      { path: 'select-temp', component: SelectTempComponent },
    ],
  },
];
