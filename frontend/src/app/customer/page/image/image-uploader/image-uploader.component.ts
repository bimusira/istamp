import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UploadResultDto {
  slotIndex: number;
  url: string;
  filename?: string;
}

@Component({
  selector: 'app-image-uploader',
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})


export class ImageUploaderComponent implements OnInit {
  cards: { file?: File; preview?: string }[] = [];
  amount = 0;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.amount = Number(sessionStorage.getItem('amount') || '0');
    this.cards = Array.from({ length: this.amount }, () => ({}));
  }

  acceptableFile(file: File) {
    return ['image/png', 'image/jpeg'].includes(file.type);
  }

  onFileSelected(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (!file) return;

    if (!this.acceptableFile(file)) {
      this.toastFail(`ระบบไม่รองรับไฟล์ ${file.type}`);
      return;
    }

    const reader = new FileReader();
  reader.onload = () => {
    this.cards[index].file = file;
    this.cards[index].preview = reader.result as string; // base64
  };
  reader.readAsDataURL(file);

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('slotIndex', index.toString());
    // console.log('Uploading file:', file.name, 'to slot:', index); 

    // this.http.post<UploadResultDto>('/api/customer/upload-image', formData)
    //   .subscribe({
    //     next: (result) => {
    //       this.cards[index].file = file;
    //       this.cards[index].preview = result.url;
    //       this.toastSuccess('อัปโหลดสำเร็จ');
    //     },
    //     error: (err) => {
    //       this.toastFail('อัปโหลดล้มเหลว');
    //     }
    //   });
  }

  isAllSlotFull() {
    return this.cards.every(card => !!card.preview);
  }

  toastSuccess(message: string) {
    this.snackBar.open(message, '', { duration: 2000, panelClass: 'snack-success' });
  }

  toastFail(message: string) {
    this.snackBar.open(message, '', { duration: 2000, panelClass: 'snack-fail' });
  }

  removeFile(index: number) {
    this.cards[index] = {};
  }
}