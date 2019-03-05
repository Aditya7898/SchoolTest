import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { BatchService } from '../../services/batch.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

const URL = `http://localhost:3000/api/onlinetest/students/upload`;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentManagementComponent implements OnInit {
  classes: any[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  registerForm: FormGroup;
  errorMsg: any;

  AllStudents = [];
  student: any;
  enrollment: any;
  //
  AllValidBatches = [];
  attechmentList: any = [];
  uploader: FileUploader = new FileUploader({ url: URL });

  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  toggle4 = false;

  constructor(private fb: FormBuilder, private batchService: BatchService,
    private studentService: StudentService, private router: Router) {

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attechmentList.push(JSON.parse(response));
      console.log('completed');
    };

  }

  ngOnInit() {
    this.init();
    this.ValidBatches();
  }

  init() {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      enrollment: ['', [Validators.required]],
      class: ['', [Validators.required]],
      batch: [null, [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
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

  // Create Student
  OnSubmit() {
    this.errorMsg = null;
    console.log(this.registerForm.value);
    this.studentService.CreateUser(this.registerForm.value).subscribe(user => {
      alert('Student Created Successfully.');
      this.registerForm.reset();
    }, err => {
      if (err.error.msg) {
        this.errorMsg = err.error.msg[0].message;
      }
      if (err.error.message) {
        this.errorMsg = err.error.message;
      }
    });
  }

  // Get All Students
  GetAllStudents() {
    console.log('Called');
    this.studentService.GetAllStudents().subscribe((result: any) => {
      console.log(result.students);
      this.AllStudents = result.students;
    }, err => alert(err));
  }

  // Get Student By Enrollment
  GetstudentByEnrollment() {
    this.studentService.GetStudentByEnrollment(this.enrollment).subscribe((result: any) => {
      console.log(result);
      this.student = result.student;
      this.enrollment = '';
    }, err => {
      console.log(err);
      alert(err.message);
    });
  }

  // edit page
  editStudentPage(student) {
    this.studentService.editStudent(student);
    this.router.navigate(['/common/edit/student']);
  }


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
      console.log('Called toggle4');
    } else {
      console.log(toggle);
    }
  }
}
