import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentManagementComponent } from './components/student/student.component';
import { BatchComponent } from './components/batch/batch.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { FetchQuestionsComponent } from './components/fetch-questions/fetch-questions.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditStudentComponent } from './components/editStudent/editStudent.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'admin/login',
        pathMatch: 'full'
    },
    {
        path: 'admin/login',
        component: LoginComponent
    },
    {
        path: 'common',
        component: NavbarComponent,
        children: [
            {
                path: 'batch',
                component: BatchComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'uploadquestions',
                component: QuestionsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'createtest',
                component: CreateTestComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                component: StudentManagementComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'edit/student',
                component: EditStudentComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class RoutingModule { }
