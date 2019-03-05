import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';
import { StudentManagementComponent } from './components/student/student.component';
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
import { AdminService } from './services/admin.service';

import { FetchQuestionsComponent } from './components/fetch-questions/fetch-questions.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestService } from './services/test.service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { TokenService } from './services/token.service';
import { CookieService } from 'ngx-cookie-service';
import { EditStudentComponent } from './components/editStudent/editStudent.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentManagementComponent,
    DashboardComponent,
    NavbarComponent,
    BatchComponent,
    QuestionsComponent,
    FetchQuestionsComponent,
    CreateTestComponent,
    AdminComponent,
    LoginComponent,
    EditStudentComponent
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
  providers: [AuthService, StudentService, CookieService, QuestionService, TokenService, TestService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
