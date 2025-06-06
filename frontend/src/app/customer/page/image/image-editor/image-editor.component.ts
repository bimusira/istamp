import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogComponent, CropperDialogResult } from '../../../../components/cropper-dialog/cropper-dialog.component';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-editor',
  imports: [MatIconModule, CommonModule, RouterModule, ImageCropperComponent],
  standalone: true,
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.css'
})

export class ImageEditorComponent {
  images: File[] = [];         
  editedImages: Blob[] = [];         
  brightnessList: number[] = [];
  cropList: any[] = [];
  currentIndex = 0;
  showCropper = true;        

  constructor(private router: Router, private dialog: MatDialog) {
    const nav = this.router.getCurrentNavigation();
    const files = nav?.extras.state?.['images'];
    if (Array.isArray(files) && files[0] instanceof File) {
      this.images = files as File[];
      this.brightnessList = new Array(this.images.length).fill(1);
      this.cropList = new Array(this.images.length).fill(undefined);
      this.editedImages = new Array(this.images.length).fill(undefined);
    }
  }

  get brightness() {
  return this.brightnessList[this.currentIndex] || 1;
  }

  onBrightnessChange(event: any) {
  this.brightnessList[this.currentIndex] = +event.target.value;
  }

  resetBrightness() {
    this.brightnessList[this.currentIndex] = 1;
  }

  imageCropped(event: ImageCroppedEvent) {
  if (event.blob) {
    this.editedImages[this.currentIndex] = event.blob;
  }
  this.cropList[this.currentIndex] = event.cropperPosition;
  }

  isLastImage() {
    return this.currentIndex === this.images.length - 1;
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.showCropper = false;
      setTimeout(() => {
        this.currentIndex--;
        this.showCropper = true;
      }, 0);
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.showCropper = false;
      setTimeout(() => {
        this.currentIndex++;
        this.showCropper = true;
      }, 0);
    }
  }


  finishAllImages() {
    this.router.navigate(['/customer/preview'], { state: { images: this.editedImages } });
  }
}

