import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/auth/login/login.component';
import { RegisterComponent } from './staff/auth/register/register.component';
import { SelectTempComponent } from './customer/page/template/select-temp/select-temp.component';
import { HomeComponent } from './home/home.component';
import { CustomerMenuComponent } from './customer/page/customer-menu/customer-menu.component';
import { CustomerUploaderComponent } from './customer/page/image/image-uploader/image-uploader.component';
import { CustomerEditorComponent } from './customer/page/image/image-editor/image-editor.component';
import { CustomerPreviewComponent } from './customer/page/image/image-preview/image-preview.component';
import { ImageControlComponent } from './components/image-control/image-control.component';

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
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: CustomerMenuComponent },
      { path: 'select-temp', component: SelectTempComponent },
      { path: 'uploader', component: CustomerUploaderComponent },
      { path: 'editor', component: CustomerEditorComponent },
      { path: 'preview', component: CustomerPreviewComponent }, // Assuming preview is the same as editor
    ],
  },
  { path: 'image-control', component: ImageControlComponent }, // Assuming this is a separate route for image control
];
