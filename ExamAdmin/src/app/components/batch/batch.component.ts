import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { SelectionModel } from '@angular/cdk/collections';
import { BatchService } from '../../services/batch.service';
import _ from 'lodash';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  classes: any[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  class: any;
  students = [];
  batch: any;
  batchStudents = [];

  //
  studentsOfBatch = [];

  // new
  AllBatches = [];
  AllValidBatches = [];
  batchRegisterForm: FormGroup;
  enrollment: any;
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  toggle4 = false;


  constructor(private studentService: StudentService, private fb: FormBuilder,
    private batchService: BatchService) { }

  ngOnInit() {
    this.GetAllStudents();
    this.GetAllBatches();
    this.ValidBatches();
    this.init();
    console.log(this.batchStudents);
  }

  // new Init form
  init() {
    this.batchRegisterForm = this.fb.group({
      batchName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      allotedTo: ['']
    });
  }


  // Get all running or starting batches
  ValidBatches() {
    this.batchService.GetAllValidBatches().subscribe(result => {
      this.AllValidBatches = result.ValidBatches;
      console.log(this.AllValidBatches);
    }, err => {
      console.log(err);
    });
  }


  // Get All Batches
  GetAllBatches() {
    this.batchService.GetAllBatches().subscribe(result => {
      console.log(result);
      this.AllBatches = result.batches;
    }, err => {
      console.log(err);
    });
  }

  // Get Students by class
  GetStudentsOfClass() {
    this.studentService.GetStudentByClass(this.class).subscribe((result: any) => {
      console.log(result.students);
      this.students = result.students;
    });
  }

  // Get All students
  GetAllStudents() {
    this.studentService.GetAllStudents().subscribe((result: any) => {
    }, err => alert(err));
  }

  // Adding students to Batch
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
    console.log(this.batchStudents);
  }

  // Assign batches to students
  AssignStudents() {
    console.log(this.batch);
    const body = {
      students: this.batchStudents,
      batch: this.batch
    };
    console.log(body);

    this.batchService.AssignBatch(body).subscribe(result => {
      console.log(result);
      alert(result.message);
      this.batch = '';
      this.batchStudents = [];
    }, err => {
      console.log(err);
      alert(err.error.message);
    });
  }

  // new batch creating
  createNewBatch() {
    console.log(this.batchRegisterForm.value);
    this.batchService.SaveBatch(this.batchRegisterForm.value).subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
      alert(err.error.message);
    });
  }

  // Getting students according to batch
  GetStudentsByBatch() {
    console.log(this.batch);
    this.batchService.GetStudentsByBatch(this.batch.batchId).subscribe(res => {
      console.log(res);
    });
  }

  // Delete Batch
  DeleteBatch(batchId) {
    console.log(batchId);
    this.batchService.DeleteBatch(batchId).subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
      alert(err.error.message);
    });
  }

  // Date formatting
  DateFormat(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  //
  toggle(toggle) {
    console.log('Called toggle');
    if (toggle === 'toggle1') {
      this.toggle1 = !this.toggle1;
      console.log('Called toggle1');
    } else if (toggle === 'toggle2') {
      this.toggle2 = !this.toggle2;
      console.log('Called toggle2');
    } else if (toggle === 'toggle3') {
      this.toggle3 = !this.toggle3;
      console.log('Called toggle3');
    } else if (toggle === 'toggle4') {
      this.toggle4 = !this.toggle4;
    } else {
      console.log(toggle);
    }
  }
}
