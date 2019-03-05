import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:3000/api/onlinetest';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  // Save new batch
  SaveBatch(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BaseUrl}/createbatch`, body);
  }

  // All Valid Batches
  GetAllValidBatches(): Observable<any> {
    return this.http.get(`${BaseUrl}/getValidBatches`);
  }

  // Get Students batch wise
  GetStudentsByBatch(batchId): Observable<any> {
    console.log(batchId);
    return this.http.get(`${BaseUrl}/getstudentsbybatch/${batchId}`);
  }

  // Assign batch to students
  AssignBatch(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BaseUrl}/assignbatch`, body);
  }

  // Assign  multi batches to students TEST
  AssignBatchTest(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BaseUrl}/assignbatchtest`, body);
  }


  // Delete Batch
  DeleteBatch(batchId): Observable<any> {
    console.log(batchId);
    return this.http.delete(`${BaseUrl}/deletebatch/${batchId}`);
  }

  // GET All Batches
  GetAllBatches(): Observable<any> {
    return this.http.get(`${BaseUrl}/getallbatches`);
  }
}
