import { Component, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'; // นำเข้า NgxExtendedPdfViewerModule

@Component({
  selector: 'app-stamp-print',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule], // เพิ่ม NgxExtendedPdfViewerModule ใน imports
  templateUrl: './stamp-print.component.html',
  styleUrls: ['./stamp-print.component.css']
})
export class StampPrintComponent implements OnInit {
  // URL ของไฟล์ PDF
  pdfUrl = 'https://file.thailandpost.com/upload/content/2566_66a34f915b482.pdf';

  constructor() { }

  ngOnInit(): void {}

  // ฟังก์ชันสำหรับการปริ้น
  printPDF() {
    // สร้าง <iframe> ในหน้าต่างใหม่ที่มีการโหลด PDF
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print PDF</title>
        </head>
        <body>
          <embed src="${this.pdfUrl}" width="100%" height="100%" />
        </body>
      </html>
    `);
    
    // เรียกการพิมพ์จากหน้าต่างที่เปิด
    printWindow?.document.close();
    printWindow?.print();
  }
}
