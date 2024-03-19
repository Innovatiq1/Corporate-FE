import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

const routes: Routes = [
    {
        path: 'all-questions',
        component: AllQuestionsComponent,
    },
    {
        path: 'add-questions',
        component: AddQuestionsComponent,
    },
    {
        path: 'edit-questions/:id',
        component: AddQuestionsComponent,
    },
   
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
