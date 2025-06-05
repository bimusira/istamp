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
  stampData = [
    { id: 1, name: 'สมชาย ใจดี', phone: '064-431-6525', date: '21/05/2025 12:00 น.', status: 'รอดำเนินการ', details: 'ดูรายละเอียด' },
    { id: 2, name: 'สมชาย ใจดี', phone: '064-431-6525', date: '21/05/2025 12:00 น.', status: 'รอดำเนินการ', details: 'ดูรายละเอียด' },
    { id: 3, name: 'สมชาย ใจดี', phone: '064-431-6525', date: '21/05/2025 12:00 น.', status: 'เสร็จสิ้น', details: 'ดูรายละเอียด' },
  ];

  collapsed = false;
  username = 'John Doe'; // หรือดึงจาก Auth Service
  dropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    console.log('ออกจากระบบ');
    // ทำการ logout ที่นี่ เช่น:
    // localStorage.clear(); this.router.navigate(['/login']);
  }

  viewDetails(item: any) {
    console.log('Viewing details for:', item);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this.stampData = this.stampData.filter(item =>
      item.name.includes(query) || item.phone.includes(query)
    );
  }

  openCalendar() {
    console.log('เปิดปฏิทิน');
  }

  refreshData() {
    console.log('ข้อมูลรีเฟรชแล้ว');
  }
}

