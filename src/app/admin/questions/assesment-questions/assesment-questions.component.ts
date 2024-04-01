import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assesment-questions',
  templateUrl: './assesment-questions.component.html',
  styleUrls: ['./assesment-questions.component.scss']
})
export class AssesmentQuestionsComponent implements OnInit {
  questionFormTab2!: FormGroup;
  editUrl: any;
  questionId!: string;
  subscribeParams: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let urlPath = this.router.url.split('/');
    this.editUrl = urlPath.includes('edit-questions');

    this.subscribeParams = this.activatedRoute.params.subscribe((params: any) => {
      this.questionId = params.id;
      console.log('this.questionId: ', this.questionId);
    });
  }

  addRow() {
    console.log("Adding row...");
    const questionGroup = this.formBuilder.group({
      questionText: [''],
      options: this.formBuilder.array([
        this.formBuilder.group({
          option: '',
          answer: false
        }),
        this.formBuilder.group({
          option: '',
          answer: false
        }),
        this.formBuilder.group({
          option: '',
          answer: false
        }),
        this.formBuilder.group({
          option: '',
          answer: false
        })
      ])
    });
    this.questions.push(questionGroup);
  }
  
  ngOnInit(): void {
    this.questionFormTab2 = this.formBuilder.group({
      name: ['', [Validators.required]],
      questions: this.formBuilder.array([])
    });
    for (let i = 0; i < 5; i++) {
      this.addRow();
    }
  }
  
  
  get questions(): FormArray {
    return this.questionFormTab2.get('questions') as FormArray;
  }

  getAnswers(questionIndex: number): FormArray {
    return (this.questions.at(questionIndex).get('options') as FormArray);
  }

  save() {
    console.log(this.questionFormTab2.value);
  }

}
