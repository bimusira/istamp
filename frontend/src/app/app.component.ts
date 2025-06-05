import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';   
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageControlComponent } from './components/image-control/image-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule,
  ],
  template: ` <router-outlet></router-outlet>`,
  styles: [
    `
      .container {
        padding: 24px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private router: Router , private http: HttpClient) {}
  
   goTo(path:string) {
    this.router.navigate([`/${path}`]);
   }
  // height = signal(250);
 // width = signal(250);


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

  //imageReady(imageUrl: string) {
   // console.log('Firebase Uploaded Image: ', imageUrl);}

}
