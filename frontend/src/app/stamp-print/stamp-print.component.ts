import { Component, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';  // นำเข้า NgxExtendedPdfViewerModule

@Component({
  selector: 'app-stamp-print',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],  // เพิ่ม NgxExtendedPdfViewerModule ใน imports
  templateUrl: './stamp-print.component.html',
  styleUrls: ['./stamp-print.component.css']
})
export class StampPrintComponent implements OnInit {
  pdfUrl = 'https://file.thailandpost.com/upload/content/2566_66a34f915b482.pdf';

  constructor() { }

  ngOnInit(): void {}

  printPDF() {
    const printWindow = window.open(this.pdfUrl, '_blank');
    printWindow?.print();
  }
}
