import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import _ from 'lodash';

@Component({
  selector: 'app-fetch-questions',
  templateUrl: './fetch-questions.component.html',
  styleUrls: ['./fetch-questions.component.css']
})

export class FetchQuestionsComponent implements OnInit {

  @Output() testDataEvent = new EventEmitter<any>();

  categories = ['Maths', 'Science', 'Gk'];
  category: any;
  questions = [];
  testQuestions = [];
  totalMarks = 0;
  totalQuestionsSelected = 0;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  // search questions according to category
  searchQuestion() {
    this.questionService.SearchQuestions(this.category).subscribe(resp => {
      this.questions = resp.result;
      console.log(this.questions);
    }, err => {
      console.log(err);
      alert(err);
    });
  }

  // Add question to test questions
  addToTest(q_id, marks) {
    console.log(q_id);
    const duplicate = _.includes(this.testQuestions, q_id);
    if (!duplicate) {
      this.testQuestions.push(q_id);
      this.totalQuestionsSelected += 1;
      this.totalMarks += marks;
    }
    if (duplicate) {
      this.testQuestions = _.filter(this.testQuestions, (id) => id !== q_id);
      this.totalQuestionsSelected -= 1;
      this.totalMarks -= marks;
    }
    console.log(this.testQuestions);
  }


  // CreateTest
  createTest() {
    console.log(this.testQuestions);
    // tslint:disable-next-line:prefer-const
    let testData = {
      testQuestions: this.testQuestions,
      totalMarks: this.totalMarks
    };
    this.testDataEvent.emit(testData);

    // this.testQuestions = [];
    // this.totalQuestionsSelected = 0;
    // this.startDate = '';
    // this.endDate = '';
  }
}
