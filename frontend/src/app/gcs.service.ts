import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GcsService {
  constructor(private http: HttpClient) { }

  getUploadUrl(fileName: string) {
  return this.http.post<{ uploadUrl: string }>('http://localhost:3000/gcs/signed-url?fileName=' + fileName, {});
  }

  getfilesImg(){
    return this.http.get<{ count: number, images: string[] , filedetails:string[] }>('http://localhost:3000/gcs/image-files');
  }

  deleteFile(fileName: string) {
    return this.http.delete(`http://localhost:3000/gcs/delete-file/${encodeURIComponent(fileName)}`);
  }
}
