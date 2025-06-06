import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image-editor',
  imports: [MatIconModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.css'
})
export class CustomerEditorComponent {

}
