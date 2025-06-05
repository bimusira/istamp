import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageControlComponent } from './components/image-control/image-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,          
    MatToolbarModule,
    ImageControlComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  template: `
    <mat-toolbar color="primary"> จัดการรูปภาพ </mat-toolbar>

    <div class="container" style="padding: 24px;">
      <app-image-control
        path="/profile-images/my-image"
        (imageReady)="imageReady($event)"
      ></app-image-control>

      <router-outlet></router-outlet>   
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
      }
    `,
  ],
})
export class AppComponent {
  height = signal(250);
  width = signal(250);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('customer_id')) {
      this.http.get<{ uuid: string }>('http://localhost:3000/customer/generateuuid')
        .subscribe({
          next: (res) => {
            sessionStorage.setItem('customer_id', res.uuid);
            console.log('Saved uuid to sessionStorage:', res.uuid);
          },
          error: (err) => {
            console.error('Error fetching uuid:', err);
          }
        });
    }
  }

  imageReady(imageUrl: string) {
    console.log('Firebase Uploaded Image: ', imageUrl);
  }
}
