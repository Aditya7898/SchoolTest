import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import _ from 'lodash';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  classes: any[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  class: any;
  students = [];
  BatchName: any;
  batchStudents = [];

  constructor(private studentService: StudentService, private batchService: BatchService) { }

  ngOnInit() {
    this.GetAllStudents();
    console.log(this.batchStudents);
  }


  GetStudentsOfClass() {
    this.studentService.GetStudentByClass(this.class).subscribe((result: any) => {
      console.log(result.students);
      this.students = result.students;
    });
  }

  GetAllStudents() {
    this.studentService.GetAllStudents().subscribe((result: any) => {
      // console.log(result.students);
    }, err => alert(err));
  }

  CreateBatch(student) {
    const duplicate = _.find(this.batchStudents, { enrollment: student.enrollment });
    if (!duplicate) {
      this.batchStudents.push(student);
    }
    if (duplicate) {
      this.batchStudents = _.filter(this.batchStudents, function (Svalue) {
        return Svalue.enrollment !== duplicate.enrollment;
      });
    }
    // console.log(this.batchStudents);
    // console.log(duplicate);
  }

  SaveBatch() {
    console.log(this.BatchName);
    const body = {
      students: this.batchStudents,
      batchName: this.BatchName
    };

    this.batchService.SaveBatch(body).subscribe(result => {
      console.log(result);
      alert(result.message);
      this.BatchName = '';
      this.batchStudents = [];
    }, err => {
      console.log(err);
      alert(err.error.message);
    });
  }
}
