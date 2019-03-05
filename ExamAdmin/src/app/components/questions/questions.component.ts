import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { QuestionService } from '../../services/question.service';

const URL = `http://localhost:3000/api/onlinetest/upload`;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // categories = ['c1', 'c2', 'c3', 'c4', 'c5'];
  // file: any;
  // category: any;

  uploader: FileUploader = new FileUploader({ url: URL });
  attechmentList: any = [];

  constructor(private questionService: QuestionService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attechmentList.push(JSON.parse(response));
      // alert('uploaded');
    };
  }

  ngOnInit() {

  }


  submit() {

  }

}
