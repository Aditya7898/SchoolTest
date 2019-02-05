import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegiserComponent } from './components/regiser/regiser.component';
import { BatchComponent } from './components/batch/batch.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { FetchQuestionsComponent } from './components/fetch-questions/fetch-questions.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'register', component: RegiserComponent
    },
    {
        path: 'batch', component: BatchComponent
    },
    {
        path: 'uploadquestions', component: QuestionsComponent
    },
    {
        path: 'fetchquestions', component: FetchQuestionsComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class RoutingModule { }
