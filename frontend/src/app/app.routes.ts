import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
    {
        path: 'staff',
        component: StaffComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    }
];