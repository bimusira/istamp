import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-temp',
  standalone: true,
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './select-temp.component.html',
  styleUrl: './select-temp.component.css'
})
export class SelectTempComponent implements OnInit {
  cards: number[] = [];
  selectingCard: number = 0;

  ngOnInit() {
    const amount = Number(sessionStorage.getItem('amount') || '0');
    this.cards = Array.from({ length: amount }, (_, i) => i + 1);
  }

  openModal(card: number) {
    console.log('openModal', card);
    sessionStorage.setItem(`card ${card}`, String(card));
    this.selectingCard = card;
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = '';
    }

  }

  delete_session() {
    for (let i = 1; i <= 5; i++) {
      sessionStorage.removeItem(`card ${i}`);
    }
  }

  closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
}


}