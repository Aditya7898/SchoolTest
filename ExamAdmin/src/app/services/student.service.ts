import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  //editable Student Data passing
  private student = new BehaviorSubject(null);
  currentStudent = this.student.asObservable();
  editStudent(student: any) {
    this.student.next(student);
  }


  // Create Student
  CreateUser(data): Observable<any> {
    console.log(data);
    return this.http.post(`${BaseUrl}/register`, data);
  }


  // Get All Students
  GetAllStudents(): Observable<any> {
    console.log('GetallStudents services.')
    return this.http.get(`${BaseUrl}/students`);
  }

  // Get Student By Class
  GetStudentByClass(SearchClass): Observable<any> {
    console.log(SearchClass);
    return this.http.get(`${BaseUrl}/students/${SearchClass}`);
  }

  // Get signle Student By Enrollment
  GetStudentByEnrollment(enrollment): Observable<any> {
    return this.http.get(`${BaseUrl}/student/${enrollment}`);
  }

  // update
  updateBatch(body): Observable<any> {
    return this.http.post(`${BaseUrl}/students/updateBatch`, body);
  }
}
