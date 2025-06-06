import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-image-uploader',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class CustomerUploaderComponent {
  cards: number[] = [];

  ngOnInit() {
    const amount = Number(sessionStorage.getItem('amount') || '0');
    this.cards = Array.from({ length: amount }, (_, i) => i + 1);
  }
}
