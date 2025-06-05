import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerSessionService {
  constructor(private http: HttpClient) {}

  fetchAndSaveUuid() {
    this.http.get<{ uuid: string }>('http://localhost:3000/customer/generateuuid')
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('customer_id', res.uuid);
          console.log('Saved uuid to sessionStorage:', res.uuid);
        },
        error: (err) => {
          console.error('Error fetching uuid:', err);
        }
      });
  }
}
 
