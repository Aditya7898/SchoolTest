import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:3000/api/onlinetest'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // Create Admin 
  CreateAdmin(data): Observable<any> {
    console.log(data);
    return this.http.post(`${BaseUrl}/admin/register`, data);
  }

  // Login 
  Login(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BaseUrl}/admin/login`, body);
  }
}
