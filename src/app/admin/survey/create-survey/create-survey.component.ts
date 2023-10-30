import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent {
  selectcourse: boolean = false;
  programData: any = [];
  userTypeNames: any;
  data:any;
  question6 = 0;
  currentRate = 3.14;
  breadscrums = [
    {
      title: 'View Survey',
      items: ['Survey'],
      active: 'View Survey',
    },
  ];
  selected = false;
  instructorList: any = [];
  courseList!: CourseTitleModel[];
  countNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedIndex: number | undefined;
  favoriteSeason?: string;
  course: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  levelofcourse: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  expectations: string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  subject : string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];

  feedbackForm!: FormGroup;
  questionsection = false;
  ratingsection = false;
  surveyBuilderId = '';
  courseName: any;
  programName: any;
  studentFirstName: any;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((param) => {

      this.surveyBuilderId = param['id'];
      this.getSurveyById(this.surveyBuilderId);
      console.log(this.surveyBuilderId)
    });
    this.feedbackForm = this.fb.group({
      courseName: ['',[] ],
      question1: ['', []],
      question2:['',[] ],
      question3: ['',[] ],
      question4: ['',[] ],
      question5:['',[]],
      question7: ['',[] ],
    });

  }
  // get questions(): FormArray {
  //   return this.surveyForm.get('questions') as FormArray;
  // }
    public setRow(_index: number) {

    this.selectedIndex = _index;
  }

  getSurveyById(id:any){
    this.surveyService.getSurveyBuildersById(id).subscribe((response:any) => {
      this.courseName = response.data.courseName;
      this.studentFirstName = response.data.studentFirstName;
      this.selectedIndex = response.data.question5;
      this.question6 = response.data.question6;

      this.feedbackForm.patchValue({
        courseName: response.data.courseName,
        question1:response.data?.question1,
        question2:response.data?.question2,
        question3:response.data?.question3,
        question4:response.data?.question4,
        question6:response.data?.question6,
        question7:response.data?.question7,


      });
    }, (err:any) => {});
  }

  // showQuestions() {
  //   this.questionsection = true;
  //   this.ratingsection = false;
  //   this.questions.push({ text: '' });
  //   if (document.getElementById('question')) {
  //     document.getElementById('question')!.style.background = '#526D82';
  //     document.getElementById('question')!.style.color = 'white';
  //     document.getElementById('rating')!.style.background = 'white';
  //     document.getElementById('rating')!.style.color = '#526D82';
  //   }
  // }

  //addQuestios
  // addQuestion() {
  //   const questionGroup = this.fb.group({
  //     question: ['', Validators.required],
  //     type: ['single', Validators.required],
  //     choices: [''],
  //   });
  //   this.questions.push(questionGroup);
  // }

  //ratingsInit
  // preinitRating() {
  //   const questionGroup1 = this.fb.group({
  //     question: ['Course Rating', Validators.required],
  //     type: ['single', Validators.required],
  //     choices: ['1,2,3,4,5'],
  //   });
  //   this.questions.push(questionGroup1);

  //   const questionGroup2 = this.fb.group({
  //     question: ['Instructor Rating', Validators.required],
  //     type: ['single', Validators.required],
  //     choices: ['1,2,3,4,5'],
  //   });
  //   this.questions.push(questionGroup2);

  //   const questionGroup3 = this.fb.group({
  //     question: ['Overall Rating', Validators.required],
  //     type: ['single', Validators.required],
  //     choices: ['1,2,3,4,5'],
  //   });
  //   this.questions.push(questionGroup3);
  // }
  // //delete
  // deleteQuestion(i: number) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
  //       this.questions.removeAt(i);
  //     }
  //   });
  // }
  // //create
  // createSurvey() {
  //   if (this.surveyForm.valid) {
  //     console.log(this.surveyForm.value);
  //     const modified = JSON.parse(JSON.stringify(this.surveyForm.value));
  //     const modifiedQuestions: any[] = [];
  //     modified.questions.forEach((element: any) => {
  //       element.choices = element.choices.split(',');
  //       modifiedQuestions.push(element);
  //     });
  //     modified.questions = modifiedQuestions;
  //     if (!this.surveyBuilderId) {
  //       this.surveyService.addSurveyBuilder(modified).subscribe(
  //         (response) => {
  //           Swal.fire(
  //             'Successful',
  //             'Survey created succesfully',
  //             'success'
  //           ).then((r) => {
  //             this.router.navigateByUrl('/admin/survey/survey-list');
  //           });
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     } else if (this.surveyBuilderId) {
  //       this.surveyService
  //         .updateSurveyBuilders(modified, this.surveyBuilderId)
  //         .subscribe((response) => {
  //           Swal.fire(
  //             'Successful',
  //             'Survey updated succesfully',
  //             'success'
  //           ).then((r) => {
  //             this.router.navigateByUrl('/admin/survey/survey-list');
  //           });
  //         });
  //     }
  //   }
  // }
}
