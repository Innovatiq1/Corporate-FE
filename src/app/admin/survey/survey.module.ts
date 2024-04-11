import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { LikertChartComponent } from './likert-chart/likert-chart.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { SurveyRoutingModule } from './survey-routing.module';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { CreateLikertChartComponent } from './create-likert-chart/create-likert-chart.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { StarRatingComponent } from 'app/ui/star-rating/star-rating.component';
import { FeedbackCommonComponent } from './feedback-common/feedbackCommon.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';




@NgModule({
  declarations: [
    SurveyListComponent,LikertChartComponent, CreateSurveyComponent, CreateLikertChartComponent, CreateFeedbackComponent, StarRatingComponent, FeedbackCommonComponent, FeedbackViewComponent
  ],
  imports: [
    CommonModule,SurveyRoutingModule,
    ComponentsModule,SharedModule
  ],
  exports: [FeedbackCommonComponent]
})
export class SurveyModule { }
