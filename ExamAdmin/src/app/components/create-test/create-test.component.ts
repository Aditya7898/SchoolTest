import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  toggle = true;
  testForm: FormGroup;
  totalMarks: any;
  selectedQuestions = [];

  constructor(private testService: TestService, private fb: FormBuilder) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.testForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      testName: ['', [Validators.required]],
      passingMarks: ['', [Validators.required]],
      testDuration: [''],
      totalMarks: [''],
      testDescription: ['', [Validators.required]]
    });
  }

  receive(event) {
    console.log(event.testQuestions);
    if (event) {
      // question display none
      this.toggle = !this.toggle;

      // selected questions
      this.selectedQuestions = event.testQuestions;

      // total marks
      this.totalMarks = event.totalMarks;

      console.log(this.selectedQuestions);
      console.log(this.totalMarks);
    }
  }

  OnSubmit() {
    this.testForm.value.totalMarks = this.totalMarks;
    console.log(this.testForm.value);
    let body = {
      data: this.testForm.value,
      questions: this.selectedQuestions
    }
    this.testService.CreateTest(body).subscribe(result => {
      console.log(result);
      alert(result.message);
    }, err => {
      console.log(err);
      alert(err.message);
    });
  }

}
