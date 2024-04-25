import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StudentsService } from 'app/admin/students/students.service';
import Swal from 'sweetalert2';
import { AuthenService } from '@core/service/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questionTest.component.html',
  styleUrls: ['./questionTest.component.scss'],
})
export class QuestionTestComponent implements OnInit, OnDestroy {
  @Input() questionList: any = [];
  @Input() answersResult!: any;
  @Input() totalTime!: number;
  @Input() isAnswersSubmitted:boolean = false;
  @Output() submitAnswers: EventEmitter<any> = new EventEmitter<any>();
  


  public answers: any = [];
  user_name!: string;
  isQuizCompleted: boolean = false;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;
  selectedOption: any = '';
  optionsLabel: string[] = ['a)', 'b)', 'c)', 'd)'];
  studentId!: string;
  classId!: string;
  assesmentId!: string;
  answerId!: string;
  answerResult!: any;
  isExamStarted:boolean=false;
  courseId!: string;


  constructor(private studentService: StudentsService, private authenService:AuthenService,private router: Router) {
    let urlPath = this.router.url.split('/');

  }

  ngOnInit() {
    this.answers = Array.from({ length: this.questionList.length }, () => ({
      questionText: null,
      selectedOptionText: null,
    }));
    this.user_name = this.authenService.currentUserValue.user.name
    let urlPath = this.router.url.split('/');
    this.courseId = urlPath[urlPath.length - 1];
  }

  startTimer() {
    if (!this.totalTime) {
      return;
    }
    this.interval = setInterval(() => {
      if (this.totalTime > 0) {
        this.minutes = Math.floor(this.totalTime / 60);
        this.seconds = this.totalTime % 60;
        this.totalTime--;
      } else {
        clearInterval(this.interval);
        // this.submitAnswers();
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  attendedQuestions() {
    return this.answers.filter((v: any) => v.selectedOptionText !== null)
      .length;
  }

  handleRadioChange(index: any) {
    if(!this.isExamStarted){
      this.isExamStarted = true;
      this.startTimer();
    }
    this.answers[index].questionText = this.questionList[index]?.questionText;
    // this.answers[index].selectedOptionText = this.selectedOption;
    this.selectedOption = '';
  }

  confirmSubmit() {
    const nullOptionExists = this.answers.some(
      (answer: any) => answer.selectedOptionText === null
    );
    if (nullOptionExists) {
      Swal.fire({
        title: 'Error!',
        text: 'Please answer all questions before submitting.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the answers?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const submissionPayload = {
          answers: this.answers,
          courseId: this.courseId,
          is_tutorial: true,
        };
        this.submitAnswers.next(submissionPayload);
        clearInterval(this.interval);

      }
    });
  }



  navigate() {
    this.isQuizCompleted = true;
  }

  correctAnswers(value: any) {
    return this.questionList.filter((v: any) => v.status === value).length;
  }
}
