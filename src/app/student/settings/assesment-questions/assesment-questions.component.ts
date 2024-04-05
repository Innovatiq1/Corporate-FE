import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '@core/service/question.service';
import { number } from 'echarts';

@Component({
  selector: 'app-assesment-questions',
  templateUrl: './assesment-questions.component.html',
  styleUrls: ['./assesment-questions.component.scss'],
})
export class AssesmentQuestionsComponent {
  questionFormTab2: FormGroup;
  editUrl: any;
  questionId!: string;
  subscribeParams: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {
    let urlPath = this.router.url.split('/');
    this.editUrl = urlPath.includes('edit-questions');

    this.subscribeParams = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.questionId = params.id;
      }
    );

    this.questionFormTab2 = this.formBuilder.group({
      name: ['', Validators.required],
      questions: this.formBuilder.array([]),
    });
    if (!this.editUrl) {
      for (let index = 0; index < 5; index++) {
        const question = this.addQuestion();
        this.questions.push(question);
      }
    } else {
      this.getData();
    }
  }

  getData() {
    if (this.questionId) {
      this.questionService
        .getQuestionsById(this.questionId)
        .subscribe((response: any) => {
          if (response && response.questions) {
            this.questionFormTab2.patchValue({
              name: response.name,
            });

            const questionsArray = this.questionFormTab2.get(
              'questions'
            ) as FormArray;
            while (questionsArray.length !== 0) {
              questionsArray.removeAt(0);
            }

            response.questions.forEach((question: any) => {
              if (question.questionText.trim() !== '') {
                const questionGP = this.addQuestion();
                questionGP.patchValue({
                  questionText: question.questionText,
                });

                const optionsArray = questionGP.get('options') as FormArray;
                optionsArray.clear();
                question.options.forEach((option: any) => {
                  optionsArray.push(
                    this.formBuilder.group({
                      text: option.text,
                      correct: option.correct,
                    })
                  );
                });
                questionsArray.push(questionGP);
              }
            });
          }
        });
    }
  }

  addQuestion() {
    const newTempId = this.getLastQuestionId() + 1;
    const questionGroup = this.formBuilder.group({
      tempId: newTempId,
      questionText: ['', Validators.required],
      isSelected: [false],
      options: this.formBuilder.array([
        this.formBuilder.group({
          text: ['', Validators.required],
          correct: [false],
        }),
        this.formBuilder.group({
          text: ['', Validators.required],
          correct: [false],
        }),
        this.formBuilder.group({
          text: ['', Validators.required],
          correct: [false],
        }),
        this.formBuilder.group({
          text: ['', Validators.required],
          correct: [false],
        }),
      ]),
    });
    return questionGroup;
  }

  addAdditionalQuestion() {
    const question = this.addQuestion();
    this.questions.push(question);
  }

  getLastQuestionId() {
    const lastIndex = this.questions.controls.length - 1;
    return lastIndex > -1 ? this.questions.at(lastIndex).value.tempId : 0;
  }

  deleteQuestion(questionIndex: number) {
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
        const controls = (this.questions as FormArray).controls;
        const filteredQuestions: number[] = [];
        controls.forEach((control: any, index: number) => {
          if (control.value.isSelected) {
            filteredQuestions.push(control.value.tempId);
          }
        });
        if (filteredQuestions.length) {
          filteredQuestions.forEach((tempId: number) => {
            const index = this.questions.controls.findIndex(
              (c: any) => c.value.tempId === tempId
            );
            if (index != -1) {
              this.questions.removeAt(index);
            }
          });
        } else {
          this.questions.removeAt(questionIndex);
        }
      }
    });
  }

  get questions(): FormArray {
    return this.questionFormTab2.get('questions') as FormArray;
  }

  getAnswers(questionIndex: number) {
    return (this.questions.at(questionIndex) as FormGroup).get(
      'options'
    ) as FormArray;
  }

  addAnswer(questionIndex: number) {
    const answer = this.formBuilder.group({
      text: ['', Validators.required],
      correct: [false, Validators.required],
    });
    this.getAnswers(questionIndex).push(answer);
  }

  checkboxChange(questionIndex: number, optionIndex: number): void {
    for (let index = 0; index < 4; index++) {
      const option = (
        (
          (this.questionFormTab2.get('questions') as FormArray)?.at(
            questionIndex
          ) as FormGroup
        )?.get('options') as FormArray
      ).at(index) as FormGroup;
      if (index != optionIndex && option.get('correct')) {
        option.patchValue({ correct: false });
      }
    }
  }

  save() {
    if (this.questionFormTab2.valid) {
      const payload = this.questionFormTab2.value.questions.map((v: any) => ({
        options: v.options,
        questionText: v.questionText,
      }));

      if(!payload.length){
        Swal.fire('At least Question needed', 'error');
        return
      }

      const isNoAnswer = payload.questions.some(
        (q: any) => !q.options.some((c: any) => c.correct)
      );
      if (isNoAnswer) {
        Swal.fire('Select at least one option is correct', 'error');
        return;
      }

      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create announcement!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.createAssesment(payload);
        }
      });
    }else{
      Swal.fire('Please fill all mandatory fields', 'error');
    }
  }

  createAssesment(payload: any) {
    this.questionService.createQuestion(payload).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Question created successfully',
          icon: 'success',
        });
        this.router.navigate(['/student/settings/all-questions']);
      },
      (err: any) => {
        Swal.fire('Failed to create Question', 'error');
      }
    );
  }

  update() {
    if (this.questionFormTab2.valid) {
      const formData = this.questionFormTab2.value;
      const isNoAnswer = formData.questions.some(
        (q: any) => !q.options.some((c: any) => c.correct)
      );
      if (isNoAnswer) {
        Swal.fire('Select at least one option is correct', 'error');
        return;
      }

      const payload = { ...formData, id: this.questionId };
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.questionService.updateQuestions(payload).subscribe(
            (res: any) => {
              Swal.fire({
                title: 'Successful',
                text: 'Question Updated successfully',
                icon: 'success',
              });
              this.router.navigate(['/student/settings/all-questions']);
            },
            (err: any) => {
              Swal.fire('Failed to update Question', 'error');
            }
          );
        }
      });
    }
  }
}
