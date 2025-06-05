import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-temp',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './select-temp.component.html',
  styleUrl: './select-temp.component.css'
})
export class SelectTempComponent implements OnInit {
  cards: number[] = [];

  ngOnInit() {
    const amount = Number(sessionStorage.getItem('amount') || '0');
    
    this.cards = Array.from({ length: amount }, (_, i) => i + 1);
  }
}