import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  GetAllStudents(): Observable<any> {
    return this.http.get(`${BaseUrl}/students`);
  }

  GetStudentByClass(SearchClass): Observable<any> {
    console.log(SearchClass);
    return this.http.get(`${BaseUrl}/students/${SearchClass}`);
  }
}
