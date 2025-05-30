import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  computed,
  effect,
  inject,
  signal,
  OnInit 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  CropperDialogComponent,
  CropperDialogResult,
} from '../cropper-dialog/cropper-dialog.component';
import { filter } from 'rxjs/operators';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GcsService } from '../../gcs.service';


@Component({
  selector: 'app-image-control',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="control-container" [style.width]="imageWidth() + 'px'">
      <div class="image-container">
        <img
          [src]="imageSource()"
          [width]="imageWidth()"
          [height]="imageHeight()"
          class="mat-elevation-z5"
          [style.opacity]="uploading() ? 0.5 : 1"
        />
        <mat-progress-spinner
          [diameter]="50"
          mode="indeterminate"
          *ngIf="uploading()"
        />
      </div>

      <input
        #inputField
        hidden
        type="file"
        (change)="onFileSelected($event)"
        (click)="inputField.value = ''"
         accept="image/*"
      />
      <label>เลือกขนาดรูปภาพ</label>
      <select (change)="onSizeChange($any($event.target).value)">
       <option *ngFor="let size of presetSizes; let i = index" [value]="i">
         {{ size.label }}
       </option>
      </select>
      <button mat-raised-button class="select-button" (click)="inputField.click()">
        เลือกรูปภาพ
      </button>
      <button mat-raised-button (click)="getFilesImg()" class="select-button"> รูปภาพที่อัพโหลด </button>
      <button mat-raised-button class="clear-button" *ngIf="croppedImageURL()" (click)="clearImage()">
        ลบรูปภาพ
      </button>
      <div *ngIf="imageUrls">
        <div *ngFor="let url of imageUrls">
          <img [src]="url" [width]="imageWidth()" [height]="imageHeight()" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .control-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: relative;
      }

      .select {
        padding: 4px;
        font-size: 14px;
        border-radius: 4px;
        margin-bottom: 12px;
      }

      .clear-button {
        background-color: #f44336;  /* แดง */

      font-weight: bold;
      border-radius: 4px;
      padding: 6px 16px;
      transition: 0.2s ease;
      }

      .clear-button:hover {
        background-color: #d32f2f;
      }

      .select-button {
        background-color: #4caf50;  /* เขียว */
      
        font-weight: bold;
        border-radius: 4px;
        padding: 6px 16px;
        transition: 0.2s ease;
      }

      .select-button:hover {
        background-color: #388e3c;
      }

      .image-container {
        border-radius: 5px;
        position: relative;

        > mat-progress-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        > img {
          border-radius: inherit;
        }
      }
    `,
  ],
})
export class ImageControlComponent {
  imageUrls: string[] = [];

constructor(private gcs: GcsService , private http: HttpClient) {
  effect(() => {
      if (this.croppedImageURL()) {
        this.imageReady.emit(this.croppedImageURL());
      }
    });
}

ngOnInit() {}
  

clearImage() {
  this.croppedImageURL.set(undefined);
}


presetSizes = [
  { label: 'แสตมป์ (3.3*3ซม)', width: 390, height: 354 },
  { label: 'Template (13.3*9.5ซม)', width: 503, height: 359 },
];

selectedSize = signal(this.presetSizes[0]);

imageWidth = computed(() => this.selectedSize().width);
imageHeight = computed(() => this.selectedSize().height);


  imagePath = signal('');
  @Input({ required: true }) set path(val: string) {
    this.imagePath.set(val);
  }

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}X${this.imageHeight()}`
  );

  croppedImageURL = signal<string | undefined>(undefined);

  imageSource = computed(() => {
    return this.croppedImageURL() ?? this.placeholder();
  });

  uploading = signal(false);

  dialog = inject(MatDialog);

  uploadFile(file: File, signedUrl: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': file.type });
  return this.http.put(signedUrl, file, { headers, reportProgress: true, observe: 'events' });
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  this.gcs.getUploadUrl(file.name).subscribe((urls: { uploadUrl: string }) => {
    this.uploadFile(file, urls.uploadUrl).subscribe(response => {
      console.log('Upload complete', response);
    });
  });
}

getFilesImg() {
  this.gcs.getfilesImg().subscribe((response: { count: number, images: string[] }) => {
    console.log('Image files:', response.count, response.images);
    this.imageUrls = response.images;
  });
}

  // fileSelected(event: any) {
  //   const file = event.target?.files[0];

  //   if (file) {
  //     const dialogRef = this.dialog.open(CropperDialogComponent, {
  //       data: {
  //         image: file,
  //         width: this.imageWidth(),
  //         height: this.imageHeight(),
  //       },
  //       width: '1000px',
  //       height: '1000px',
  //       maxWidth: '95vw',
  //       maxHeight: '95vh',
  //     });

  //     dialogRef
  //       .afterClosed()
  //       .pipe(filter((result) => !!result))
  //       .subscribe((result: CropperDialogResult) => {
  //         this.uploadImage(result.blob);
  //       });
  //   }
  // };



  @Output() imageReady = new EventEmitter<string>();


  // storage = inject(Storage);
  zone = inject(NgZone);

  // async uploadImage(blob: Blob) {
  //   this.uploading.set(true);
  //   const storageRef = ref(this.storage, this.imagePath());
  //   const uploadTask = await uploadBytes(storageRef, blob);
  //   const downloadUrl = await getDownloadURL(uploadTask.ref);
  //   this.croppedImageURL.set(downloadUrl);
  //   this.uploading.set(false);
  // }

  onSizeChange(index: number) {
    this.selectedSize.set(this.presetSizes[+index]);
  }
}
