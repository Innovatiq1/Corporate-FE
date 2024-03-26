import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { QuestionService } from '@core/service/question.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  currentId!: string;
  courseId!: string;
  studentId!: string;
  classId!: string;
  constructor(private questionService: QuestionService,private courseService:CourseService,private router: Router,
      ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    this.getCourseDetails();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        // this.questionList = res.data.docs[0].questions;
      })
  }
  getCourseDetails(){
    let urlPath = this.router.url.split('/')
    this.courseId = urlPath[urlPath.length - 1];
    this.studentId = urlPath[urlPath.length - 2];
    this.classId = urlPath[urlPath.length - 3];

    this.courseService.getCourseById(this.courseId).subscribe((response) => {
    this.questionList = response?.assessment?.questions;
  })
}

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      if(this.points >= 10){
        // let payload = {
        //   status: 'completed',
        //   studentId: this.studentId,
        //   playbackTime: 100,
        // };
        // this.classService
        //   .saveApprovedClasses(this.classId, payload)
        //   .subscribe((response) => {
        //     setTimeout(() => {
        //       this.router.navigate(['/student/view-course/'+ this.classId]);    
        //     }, 7000);
      
        //   });

        this.router.navigate(['/student/feedback/courses', this.classId, this.studentId, this.courseId]);
      }

      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
