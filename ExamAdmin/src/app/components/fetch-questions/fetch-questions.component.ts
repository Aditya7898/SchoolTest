import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-fetch-questions',
  templateUrl: './fetch-questions.component.html',
  styleUrls: ['./fetch-questions.component.css']
})
export class FetchQuestionsComponent implements OnInit {
  categories = ['Maths', 'Science', 'Gk'];
  category: any;
  questions = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  searchQuestion() {
    this.questionService.SearchQuestions(this.category).subscribe(resp => {
      this.questions = resp.result;
    }, err => {
      console.log(err);
      alert(err);
    });
  }
}
