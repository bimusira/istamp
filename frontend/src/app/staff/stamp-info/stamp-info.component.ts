import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // นำเข้า Router
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // นำเข้า RouterModule สำหรับ Standalone Components

@Component({
  selector: 'app-stamp-info',
  standalone: true,
  imports: [CommonModule, RouterModule],  // เพิ่ม RouterModule ใน imports ของ Standalone Component
  templateUrl: './stamp-info.component.html',
  styleUrls: ['./stamp-info.component.css']
})
export class StampInfoComponent implements OnInit {
  // Sample data for the table
  stampData = [
    { id: 1, name: 'เพลง', phone: '064-xxx-xxxx', date: '21/05/2025 12:00 น.', status: 'รอดำเนินการ', details: 'ดูรายละเอียด' },
    { id: 2, name: 'ต้อง', phone: '064-xxx-xxxx', date: '21/05/2025 12:00 น.', status: 'รอดำเนินการ', details: 'ดูรายละเอียด' },
    { id: 3, name: 'บีม', phone: '064-xxx-xxxx', date: '21/05/2025 12:00 น.', status: 'เสร็จสิ้น', details: 'ดูรายละเอียด' },
  ];

  collapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  viewDetails(item: any) {
    console.log('Viewing details for:', item);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;  // Type-casting ให้เป็น HTMLInputElement
    const query = input.value;  // ตอนนี้เราสามารถใช้ value ได้
    this.stampData = this.stampData.filter(item => 
      item.name.includes(query) || item.phone.includes(query)
    );
  }

  openCalendar() {
    console.log('เปิดปฏิทิน');
    // เพิ่มฟังก์ชันการแสดงปฏิทินที่นี่
  }

  refreshData() {
    console.log('ข้อมูลรีเฟรชแล้ว');
    // เพิ่มฟังก์ชันการรีเฟรชข้อมูลที่นี่
  }
}
