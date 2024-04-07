import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '@core/models/response';
import { CourseService } from '@core/service/course.service';
import { QuestionService } from '@core/service/question.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { StudentsService } from '../../admin/students/students.service';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
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
  isanswersSubmitted : boolean = false;
  totalTime: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;
  currentId!: string;
  courseId!: string;
  studentId!: string;
  classId!: string;
  assesmentId! : string;
  answerId! : string;
  user_name! : string;
  selectedOption: any = '';
  optionsLabel: string[] = ['a)', 'b)', 'c)', 'd)'];
  public answers: any = [];
  answerResult! : any

  constructor(private questionService: QuestionService,private courseService:CourseService,private router: Router,
    private studentService : StudentsService,
      ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.getCourseDetails();
    this.student();
  }

  confirmSubmit() {
    const nullOptionExists = this.answers.some((answer: any) => answer.selectedOptionText === null);
    if (nullOptionExists) {
      Swal.fire({
        title: 'Error!',
        text: 'Please answer all questions before submitting.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the answers?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitAnswers();
      }
    });
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
      })
  }
  getCourseDetails(){
    let urlPath = this.router.url.split('/')
    this.courseId = urlPath[urlPath.length - 1];
    this.studentId = urlPath[urlPath.length - 2];
    this.classId = urlPath[urlPath.length - 3];

    this.courseService.getCourseById(this.courseId).subscribe((response) => {
    this.questionList = response?.assessment?.questions;
    this.assesmentId = response?.assessment?.id;
    this.calculateTotalTime();  
    this.answers = Array.from({ length: this.questionList.length }, () => ({
      questionText: null,
      selectedOptionText: null
    }));
  })
}

student(){
  this.studentService.getStudentById(this.studentId).subscribe((res: any) => {
    this.user_name = res.name
  })
}


  resetQuiz() {
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

  handleRadioChange(index:any) {
    this.answers[index].questionText = this.questionList[index]?.questionText
    this.answers[index].selectedOptionText = this.selectedOption
    this.selectedOption = ''
  }



  submitAnswers() {
    const requestBody = {
      studentId: this.studentId,
      assessmentId: this.assesmentId,
      answers: this.answers
    };

    this.studentService.submitAssessment(requestBody).subscribe(
      (response: any) => {
        Swal.fire({
          title: "Submitted!",
          text: "Your answers were submitted.",
          icon: "success"
        });
      this.answerId = response.response;
      this.getAnswerById()
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

correctAnswers(value:any) {
  return this.questionList.filter((v: any) => v.status === value).length
}

getAnswerById() {
 this.studentService.getAnswerById(this.answerId).subscribe((res: any) => {
    this.answerResult  = res.assessmentAnswer;
    const assessmentAnswer = res.assessmentAnswer;
    const assessmentId = assessmentAnswer.assessmentId;
    this.questionList = assessmentId.questions.map((question: any) => {
      const answer = assessmentAnswer.answers.find((ans: any) => ans.questionText === question.questionText);
      const correctOption = question.options.find((option: any) => option.correct);
      const selectedOption = answer ? answer.selectedOptionText : null;
      const status = selectedOption ? correctOption.text === selectedOption : false;
      return {
        _id: question._id,
        questionText: question.questionText,
        selectedOption: answer ? answer.selectedOptionText : 'No answer provided',
        status: status,
        options : question.options,
        score : assessmentAnswer.score
      };
    });
    this.isanswersSubmitted = true
  });
}

submitFeedback(){
  this.router.navigate(['/student/feedback/courses', this.classId, this.studentId, this.courseId]);
}

  attendedQuestions() {
  return this.answers.filter((v: any) => v.selectedOptionText !== null).length
  }
  
  calculateTotalTime() {
    // Calculate total time based on number of questions
    this.totalTime = this.questionList.length * 60; // Assuming each question takes 60 seconds
    console.log('this.totalTime: ', this.totalTime);
    console.log('this.questionList: ', this.questionList);
    this.startTimer();

  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.totalTime > 0) {
        this.minutes = Math.floor(this.totalTime / 60);
        this.seconds = this.totalTime % 60;
        this.totalTime--;
      } else {
        clearInterval(this.interval);
        this.submitAnswers(); 
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  navigate() {
    this.isQuizCompleted = true;
  }

}
