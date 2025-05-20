import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export type CropperDialogData = {
  image: File;
  width: number;
  height: number;
};

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
};

@Component({
  selector: 'app-cropper-dialog',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent, MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>ครอบตัดรูปภาพของคุณ</h1>

    <div mat-dialog-content class="dialog-layout">
      <!-- Sidebar -->
      <div class="sidebar">
        <h3>ความสว่าง</h3>
        <label for="brightness">ค่าความสว่าง: {{ brightness() | number:'1.2-2' }}</label>
        <input
          id="brightness"
          type="range"
          min="0.2"
          max="2"
          step="0.01"
          [value]="brightness()"
          (input)="brightness.set($any($event.target).value)"
      />
      <button mat-button class="reset-button" (click)="resetBrightness()">
          คืนค่า ความสว่าง
      </button>
          <h3>คอนทราสต์</h3>
          <label for="contrast">ค่าคอนทราสต์: {{ contrast() | number:'1.2-2' }}</label>
          <input
            id="contrast"
            type="range"
            min="0.2"
            max="3"
            step="0.01"
          [value]="contrast()"
          (input)="contrast.set($any($event.target).value)"
      />
      <button mat-button class="reset-button" (click)="resetContrast()">
          คืนค่า คอนทราสต์
      </button>
    </div>

    <!-- Cropper + Buttons -->
    <div class="cropper-container">
      <image-cropper
        [maintainAspectRatio]="true"
        [aspectRatio]="data.width / data.height"
        [resizeToHeight]="data.height"
        [resizeToWidth]="data.width"
        [onlyScaleDown]="true"
        [imageFile]="data.image"
        (imageCropped)="imageCropped($event)"
        [style.filter]="'brightness(' + brightness() + ') contrast(' + contrast() + ')'"
      ></image-cropper>
    </div>
  </div>

      <div mat-dialog-actions align="end">
        <button mat-button class="cancel-button" [mat-dialog-close]="false">ยกเลิก</button>
        <button mat-button class="done-button" (click)="onDone()" cdkFocusInitial>เสร็จสิ้น</button>
  `,
  styles: [`
    .dialog-layout {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: flex-start;
    }

    .sidebar {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 0 4px rgba(0,0,0,0.1);
    }

    .cropper-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      padding: 16px;
      border-radius: 8px;
      width: 100%;             
       max-width: 100%;         
    }

    input[type="range"] {
      width: 100%;
    }

    .reset-button {
  background-color: #f44336; /* ฟ้า */
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 6px 12px;
  transition: 0.2s ease;
  text-transform: none;
}

.reset-button:hover {
  background-color: #f44336;
}


    .cancel-button {
    background-color: #f44336;  /* แดง */
    color: white;
    font-weight: bold;
    border-radius: 4px;
    padding: 6px 16px;
    transition: 0.2s ease;
  }

  .cancel-button:hover {
    background-color: #d32f2f;
  }

  .done-button {
    background-color: #4caf50;  /* เขียว */
    color: white;
    font-weight: bold;
    border-radius: 4px;
    padding: 6px 16px;
    transition: 0.2s ease;
  }

  .done-button:hover {
    background-color: #388e3c;
  }
  `],
})
export class CropperDialogComponent {
  brightness = signal(1);
  contrast = signal(1);
  croppedBlob = signal<Blob | null>(null);
  dialogRef = inject(MatDialogRef<CropperDialogComponent>);

  resetBrightness() {
    this.brightness.set(1);
  }

  resetContrast() {
   this.contrast.set(1);
  }

  data: CropperDialogData = inject(MAT_DIALOG_DATA);

  result = signal<CropperDialogResult | undefined>(undefined);

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedBlob.set(event.blob);
    }
  }


    onDone() {
      const blob = this.croppedBlob();
      if (!blob) return;

      this.applyBrightnessToBlob(blob).then((newBlob) => {
        const newUrl = URL.createObjectURL(newBlob);
        this.result.set({ blob: newBlob, imageUrl: newUrl });
        this.dialogRef.close(this.result());
      });
  }

  async applyBrightnessToBlob(blob: Blob): Promise<Blob> {
  const img = new Image();
  const brightnessValue = this.brightness();

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d')!;
      const contrastValue = this.contrast();
      ctx.filter = `brightness(${brightnessValue}) contrast(${contrastValue})`;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((resultBlob) => {
        resolve(resultBlob!);
      }, 'image/png');
    };

    img.src = URL.createObjectURL(blob);
  });
}
}


