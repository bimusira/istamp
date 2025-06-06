import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-temp',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './select-temp.component.html',
  styleUrls: ['./select-temp.component.css','../../../../../styles.css']
})
export class SelectTempComponent implements OnInit {
  result: boolean | undefined;
  cardsNeedFill: number[] = [];
  constructor(private toastr: ToastrService , private router: Router) {}
  cards: { slot: number; url?: string }[] = [];
  selectingCard: number = 0;

  templates = [
  { url: 'assets/IMG_7069.jpg' },
  { url: 'assets/IMG_7070.jpg' },
  { url: 'assets/IMG_7071.jpg' },
];

  selectedTemplateIndex: number | null = null;

  selectTemplate(index: number) {
    this.selectedTemplateIndex = index;
  }

  selectedTemplate() {
  if (this.selectedTemplateIndex !== null) {
    const selectedImage = this.templates[this.selectedTemplateIndex].url;

    const cardIndex = this.cards.findIndex(c => c.slot === this.selectingCard);
    if (cardIndex !== -1) {
      this.cards[cardIndex].url = selectedImage;
    }
    console.log(this.cards)
    this.closeModal();
  }
}

  ngOnInit() {
    const amount = Number(sessionStorage.getItem('amount') || '0');
    this.cards = Array.from({ length: amount }, (_, i) => ({ slot: i + 1 }));
    for (let i = 1; i <= amount; i++) {
      const cardUrl = sessionStorage.getItem(`card ${i}`);
      if (cardUrl) {
        this.cards[i - 1].url = cardUrl;
      } else {
        this.cards[i - 1].url = '';
      }
    }
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

  check_filefull(){
    const amount = Number(sessionStorage.getItem('amount') || '0');
    this.cardsNeedFill = []
    this.result = false; 
    for (let i = 1; i <= amount; i++) {
      if (this.cards[i - 1]?.url) {
        sessionStorage.setItem(`card ${i}`, this.cards[i - 1].url ?? '');
      } 
      else {
        this.cardsNeedFill.push(i);
        this.result = true;
      }

    }
    if (this.result) {
      this.toastr.error(`<span class="material-icons toast-icon">close</span> กรุณาเลือกแม่แบบสำเร็จสำหรับรายการที่ ${this.cardsNeedFill}`,'', {
        toastClass: 'custom-toastr-error',
        enableHtml: true,
        positionClass: 'toast-top-right',
        });
        return false; // If any card is not selected, return false
      }
    this.toastr.error(`<span class="material-icons toast-icon">check</span> เลือกแม่แบบสำเร็จ`,'', {
        toastClass: 'custom-toastr-success',
        enableHtml: true,
        positionClass: 'toast-top-right',
        });
    
    return this.router.navigate(['/customer/uploader']);
  }


}