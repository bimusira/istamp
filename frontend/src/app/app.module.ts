import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StampInfoComponent } from './staff/pages/stamp-info/stamp-info.component';  
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';  
import { RegisterComponent } from './staff/pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageCropperComponent } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    StampInfoComponent,
    RegisterComponent  // เพิ่ม RegisterComponent ที่นี่
  ],
  imports: [
    BrowserModule,
    CommonModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule, 
    NgxExtendedPdfViewerModule,
    FormsModule,
    HttpClientModule,
    ImageCropperComponent,
    MatSnackBarModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

