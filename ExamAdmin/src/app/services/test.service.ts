import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  CreateTest(data): Observable<any> {
    return this.http.post(`${BaseUrl}/create/test`, data);
  }
}
