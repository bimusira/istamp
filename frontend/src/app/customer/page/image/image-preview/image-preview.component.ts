import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image-preview',
  imports: [MatIconModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class CustomerPreviewComponent {

}
