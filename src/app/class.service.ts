import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = 'http://localhost:3000'; // cambia si tu backend usa otro puerto

  constructor(private http: HttpClient) {}

  createClass(data: { code: string }) {
    return this.http.post(this.apiUrl + '/classes', data);
  }
}
