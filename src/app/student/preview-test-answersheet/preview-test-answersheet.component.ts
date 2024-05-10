import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '@core/service/assessment.service';
import { StudentsService } from 'app/admin/students/students.service';

@Component({
  selector: 'app-preview-test-answersheet',
  templateUrl: './preview-test-answersheet.component.html',
  styleUrls: ['./preview-test-answersheet.component.scss'],
})
export class PreviewTestAnswersheetComponent {
  public questionList: any = [];
  answerResult!: any;
  studentInfo: any;
  pageSize: number = 10;
  currentPage: number = 0;
  totalQuestions: number = 0;
  skip: number = 0;
  optionsLabel: string[] = ['a)', 'b)', 'c)', 'd)'];
  breadscrums = [
    {
      title: 'Exam Scores',
      items: ['Exam Scores'],
      active: 'Preview',
    },
  ];

  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService
  ) {}
  ngOnInit() {
    const answerId = this.route.snapshot.paramMap.get('id') || '';
    const studentId = this.route.snapshot.paramMap.get('studentId') || '';
    const assessmentType =
      this.route.snapshot.queryParamMap.get('assessmentType');
    this.student(studentId);
    if (assessmentType === 'assessment') this.getAnswerById(answerId);
    else this.getExamAnswerById(answerId);
  }

  student(studentId: string) {
    this.studentService.getStudentById(studentId).subscribe((res: any) => {
      this.studentInfo = res;
    });
  }

  getAnswerById(answerId: string) {
    this.studentService.getAnswerById(answerId).subscribe((res: any) => {
      this.answerResult = res.assessmentAnswer;
      const assessmentAnswer = res.assessmentAnswer;
      const assessmentId = assessmentAnswer.assessmentId;
      this.questionList = assessmentId.questions.map((question: any) => {
        const answer = assessmentAnswer.answers.find(
          (ans: any) => ans.questionText === question.questionText
        );
        const correctOption = question.options.find(
          (option: any) => option.correct
        );
        const selectedOption = answer ? answer.selectedOptionText : null;
        const status = selectedOption
          ? correctOption.text === selectedOption
          : false;
        return {
          _id: question._id,
          questionText: question.questionText,
          selectedOption: answer
            ? answer.selectedOptionText
            : 'No answer provided',
          status: status,
          options: question.options,
          score: assessmentAnswer.score,
        };
      });
      this.totalQuestions = this.questionList.length;
    });
  }

  getExamAnswerById(answerId: string) {
    this.assessmentService.getAnswerById(answerId).subscribe((res: any) => {
      this.answerResult = res.assessmentAnswer;
      const assessmentAnswer = res.assessmentAnswer;
      const assessmentId = res.assessmentAnswer.examAssessmentId;
      this.questionList = assessmentId.questions.map((question: any) => {
        const answer = assessmentAnswer.answers.find(
          (ans: any) => ans.questionText === question.questionText
        );
        const correctOption = question.options.find(
          (option: any) => option.correct
        );
        const selectedOption = answer ? answer.selectedOptionText : null;
        const status = selectedOption
          ? correctOption.text === selectedOption
          : false;
        return {
          _id: question._id,
          questionText: question.questionText,
          selectedOption: answer
            ? answer.selectedOptionText
            : 'No answer provided',
          status: status,
          options: question.options,
          score: assessmentAnswer.score,
        };
      });
      this.totalQuestions = this.questionList.length;
    });
  }
  correctAnswers(value: any) {
    return this.questionList.filter((v: any) => v.status === value).length;
  }

  onPageChange(event: PageEvent): void {
    const pageCount = event.pageIndex;
    if (this.currentPage < event.pageIndex) {
      this.skip += 10;
    } else if (this.currentPage > event.pageIndex) {
      if (pageCount == 0) {
        this.skip = 0;
      } else {
        this.skip -= 10;
      }
    }
    this.currentPage = event.pageIndex;
  }

  getStartingIndex(): number {
    return this.currentPage * this.pageSize;
  }

  getEndingIndex(): number {
    return Math.min(
      (this.currentPage + 1) * this.pageSize,
      this.totalQuestions
    );
  }

  getPaginatedQuestions(): any[] {
    return this.questionList.slice(
      this.getStartingIndex(),
      this.getEndingIndex()
    );
  }
}
