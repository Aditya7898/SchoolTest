import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  SearchQuestions(category): Observable<any> {
    console.log(category);
    return this.http.get(`${BaseUrl}/fetch/questions/${category}`);
  }
}

