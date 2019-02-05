import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';
import { RegiserComponent } from './components/regiser/regiser.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoutingModule } from './app.routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';

//
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FileUploadModule } from 'ng2-file-upload';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BatchComponent } from './components/batch/batch.component';
import { StudentService } from './services/student.service';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionService } from './services/question.service';
import { FetchQuestionsComponent } from './components/fetch-questions/fetch-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    RegiserComponent,
    DashboardComponent,
    NavbarComponent,
    BatchComponent,
    QuestionsComponent,
    FetchQuestionsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    // mat free
    MatTableModule,
    MatCheckboxModule
    //
  ],
  providers: [AuthService, StudentService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
