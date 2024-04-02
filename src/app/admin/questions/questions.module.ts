import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuestionsRoutingModule } from './questions-routing.module';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AssesmentQuestionsComponent } from './assesment-questions/assesment-questions.component';

@NgModule({
  declarations: [
          AllQuestionsComponent,
          AddQuestionsComponent,
          AssesmentQuestionsComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    CKEditorModule,
    ModalModule.forRoot(),

  ],
})
export class QuestionsModule {}
