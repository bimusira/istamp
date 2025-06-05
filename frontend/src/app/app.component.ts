import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';   
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageControlComponent } from './components/image-control/image-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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
  template: ` <router-outlet></router-outlet>
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
  constructor(private router: Router) {}
  
   goTo(path:string) {
    this.router.navigate([`/${path}`]);
  }

  // height = signal(250);
  // width = signal(250);

  // imageReady(imageUrl: string) {
  //   console.log('Firebase Uploaded Image: ', imageUrl);
  // }
}
