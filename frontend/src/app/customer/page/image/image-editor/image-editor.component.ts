import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogComponent, CropperDialogResult } from '../../../../components/cropper-dialog/cropper-dialog.component';

@Component({
  selector: 'app-image-editor',
  imports: [MatIconModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.css'
})

export class ImageEditorComponent {
  images: File[] = [];         
  editedImages: Blob[] = [];    
  currentIndex = 0;             

  constructor(private router: Router, private dialog: MatDialog) {
    const nav = this.router.getCurrentNavigation();
    const files = nav?.extras.state?.['images'];
    if (Array.isArray(files) && files[0] instanceof File) {
      this.images = files as File[];
    }
  }

  ngOnInit() {
    if (this.images.length > 0) {
      this.openCropperDialog(this.images[0]);
    }
  }

  openCropperDialog(image: File) {
    const dialogRef = this.dialog.open(CropperDialogComponent, {
      data: {
        image: image,
        width: 390,
        height: 354
      },
      width: '1000px',
      height: '1000px',
      maxWidth: '95vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: CropperDialogResult) => {
      if (result) {
        this.editedImages[this.currentIndex] = result.blob;
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
          this.openCropperDialog(this.images[this.currentIndex]);
        } else {
          this.finishAllImages();
        }
      }
    });
  }

  finishAllImages() {
    this.router.navigate(['/customer/preview'], { state: { images: this.editedImages } });
  }
}

