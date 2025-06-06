import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { StampInfoComponent } from './staff/pages/stamp-info/stamp-info.component';  
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';  // นำเข้า NgxExtendedPdfViewerModule

@NgModule({
  declarations: [
    AppComponent,
    StampInfoComponent  
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
    NgxExtendedPdfViewerModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
