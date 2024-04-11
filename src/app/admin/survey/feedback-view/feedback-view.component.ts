import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.scss'],
})
export class FeedbackViewComponent {
  breadscrums = [
    {
      title: 'Feedback',
      items: ['Feedback'],
      active: 'View Feedback Form',
    },
  ];
  surveyId!: string;
  questionsList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.surveyId = params.id;
    });
    this.getData();
  }

  getData() {
    this.surveyService
      .getSurveyQuestionsById(this.surveyId)
      .subscribe((response: any) => {
        if (response && response.questions) {
          this.questionsList = {
            name: response.name,
            questions: response.questions.map((question: any) => {
              return {
                type: question.type,
                questionText: question.questionText,
                isMandatory: question.isMandatory,
                maxRating: question.maxRating,
                options: question.options?.map((option:any)=> option.text)||null
              };
            }),
          };
        }
      });
  }
  delete(){
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService.deleteSurveyQuestions(this.surveyId).subscribe(
          (res: any) => {
            Swal.fire({
              title: 'Successful',
              text: 'Feedback Question deleted successfully',
              icon: 'success',
            });
            this.router.navigate(['/admin/survey/survey-list']);
          },
          (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete Feedback Question',
            });
          }
        );
      }
    });
  }
}
