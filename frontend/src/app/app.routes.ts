import { Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './staff/pages/auth/login/login.component';
import { RegisterComponent } from './staff/pages/auth/register/register.component';
import { StampInfoComponent } from './staff/pages/stamp-info/stamp-info.component';
import { StampPrintComponent } from './staff/pages/stamp-print/stamp-print.component';
import { SelectTempComponent } from './customer/page/template/select-temp/select-temp.component';
import { HomeComponent } from './home/home.component';
import { CustomerMenuComponent } from './customer/page/customer-menu/customer-menu.component';
import { ImageUploaderComponent } from './customer/page/image/image-uploader/image-uploader.component';
import { ImageEditorComponent } from './customer/page/image/image-editor/image-editor.component';
import { ImagePreviewComponent } from './customer/page/image/image-preview/image-preview.component';
import { ImageControlComponent } from './components/image-control/image-control.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
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
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: CustomerMenuComponent },
      { path: 'select-temp', component: SelectTempComponent },
      { path: 'uploader', component: ImageUploaderComponent },
      { path: 'editor', component: ImageEditorComponent },
      { path: 'preview', component: ImagePreviewComponent }, // Assuming preview is the same as editor
    ],
  },
  { path: 'image-control', component: ImageControlComponent }, // Assuming this is a separate route for image control
];
