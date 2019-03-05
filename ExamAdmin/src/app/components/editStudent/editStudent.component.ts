import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-edit',
  templateUrl: './editStudent.component.html',
  styleUrls: ['./editStudent.component.css']
})
export class EditStudentComponent implements OnInit {

  batch: any;
  student: any;
  editStudents = [];
  validBatches = [];
  editBatch = false;

  // TEST
  batches = [];

  constructor(private studentService: StudentService, private batchService: BatchService) { }

  ngOnInit() {
    this.init();
    this.GetAllValidBatches();
  }

  init() {
    this.studentService.currentStudent.subscribe(student => {
      this.student = student;
      console.log(this.student);
      console.log(student);
    }, err => {
      console.log(err);
    });
  }

  // All running or starting batches
  GetAllValidBatches() {
    this.batchService.GetAllValidBatches().subscribe(result => {
      this.validBatches = result.ValidBatches;
      console.log(result);
    }, err => {
      console.log(err);
    });
  }


  // Update student
  assignBatch() {
    console.log(this.batch);
    this.editStudents.push(this.student);
    // tslint:disable-next-line:prefer-const
    let body = {
      students: this.editStudents,
      batch: this.batch
    };

    this.batchService.AssignBatch(body).subscribe(res => {
      console.log(res);
      alert('Batch alloted..');
    }, err => {
      console.log(err);
    });
  }

  // assign batch to students testing
  assignBatchTest() {
    console.log(this.batches);
    this.editStudents.push(this.student);
    // tslint:disable-next-line:prefer-const
    let body = {
      students: this.editStudents,
      batches: this.batches
    };
    console.log(body);
    this.batchService.AssignBatchTest(body).subscribe(resp => {
      console.log(resp);
    });
  }

  // Toggle
  toggle() {
    this.editBatch = !this.editBatch;
  }

}
