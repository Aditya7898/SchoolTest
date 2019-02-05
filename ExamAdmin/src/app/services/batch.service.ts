import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  SaveBatch(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BaseUrl}/createbatch`, body);
  }
}
