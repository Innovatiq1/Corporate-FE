import { Component, Input, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { StudentsService } from 'app/admin/students/students.service';
import { MatDialog } from '@angular/material/dialog';
import { TestPreviewComponent } from '@shared/components/test-preview/test-preview.component';


@Component({
  selector: 'app-add-exam-questions',
  templateUrl: './add-exam-questions.component.html',
  styleUrls: ['./add-exam-questions.component.scss']
})
export class AddExamQuestionsComponent {
  @Input() approved: boolean = false;

  questionFormTab2: FormGroup;
  editUrl: any;
  questionId!: string;
  subscribeParams: any;
  studentId: any;
  configuration: any;
  configurationSubscription!: Subscription;
  defaultTimer: string = '';
  defaultRetake: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private studentsService: StudentsService,
    private dialog: MatDialog
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
      timer: [''],
      retake:[''],
      scoreAlgorithm:[1, [Validators.required,Validators.min(0.1)]],
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

  ngOnInit(): void { 
    this.getTimer()
    this.getRetakes()
    if(!this.editUrl){
      this.getAlgorithm()
    }
    this.loadData()
   }

   loadData(){
    this.studentId = localStorage.getItem('id')
    this.studentsService.getStudentById(this.studentId).subscribe(res => {
    })
  }
  
  getTimer() : any {
    this.configurationSubscription = this.studentsService.configuration$.subscribe(configuration => {
      this.configuration = configuration;
      if (this.configuration?.length > 0) {
        this.defaultTimer = this.configuration[1].value;
        this.questionFormTab2.patchValue({
          timer: this.defaultTimer,
        })
      }
    });
  }

  getRetakes() : any {
    this.configurationSubscription = this.studentsService.configuration$.subscribe(configuration => {
      this.configuration = configuration;
      if (this.configuration?.length > 0) {
        this.defaultRetake = this.configuration[3].value;
        this.questionFormTab2.patchValue({
          retake: this.defaultRetake,
        })
      }
    });
  }

  getAlgorithm(): any {
    this.configurationSubscription =
      this.studentsService.configuration$.subscribe((configuration) => {
        this.configuration = configuration;
        const config = this.configuration.find((v:any)=> v.field === 'examAlgorithm');
        if (config) {
          const assessmentAlgo = config.value;
          this.questionFormTab2.patchValue({
            scoreAlgorithm: assessmentAlgo,
          });
        }
      });
  }

  getData() {
    if (this.questionId) {
      this.questionService
        .getAnswerQuestionById(this.questionId)
        .subscribe((response: any) => {
          if (response && response.questions) {
            this.questionFormTab2.patchValue({
              name: response.name,
              scoreAlgorithm: response.scoreAlgorithm
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
      const payload = {
        name: this.questionFormTab2.value.name,
        timer: this.questionFormTab2.value.timer,
        retake: this.questionFormTab2.value.retake,
        scoreAlgorithm: this.questionFormTab2.value.scoreAlgorithm,
        status: 'open',
        questions: this.questionFormTab2.value.questions.map((v: any) => ({
          options: v.options,
          questionText: v.questionText,
        })),
      };

      if (!payload.questions.length) {
        Swal.fire('At least one question is needed', 'error');
        return;
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
        text: 'Do you want to create Exam Assessment!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.openPreviewModal(payload);
        }
      });
    }else{
      Swal.fire('Please fill all mandatory fields', 'error');
    }
  }

  openPreviewModal(payload: any, isEdit: boolean = false) {
    const dialogRef = this.dialog.open(TestPreviewComponent, {
      width: '600px',
      data: payload,
    });
    dialogRef.afterClosed().subscribe(() => {
      if(!isEdit){
        this.createAssesment(payload);
      }else{
        this.updateAssessmentAction(payload);
      }
    });
  }

  updateAssessmentAction(payload:any){
    this.questionService.updateAnswerQuestions(payload).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Question Updated successfully',
          icon: 'success',
        });
        if (!this.approved) {
          this.router.navigate(['/student/settings/all-questions']);
        }
      },
      (err: any) => {
        Swal.fire('Failed to update Question', 'error');
      }
    );
  }

  createAssesment(payload: any) {
    this.questionService.createAnswerQuestion(payload).subscribe(
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
      if (this.editUrl) {
        this.updateExamAssessment();
      } else {
        this.save();
      }
    } else {
      this.questionFormTab2.markAllAsTouched(); 
    }
  }

  updateExamAssessment() {
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
            this.openPreviewModal(payload, true)
        }
      });
    }
  }

  approve() {
    const payload = {
      status : 'approved',
      id: this.questionId,
    } 
    this.questionService.updateExamQuestions(payload).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Exam Assessment approved successfully',
          icon: 'success',
        });
        this.router.navigate(['/student/settings/all-questions']);
      },
      (err: any) => {
        Swal.fire('Failed to update Question', 'error');
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && !this.isValidExcelFile(file)) {
      Swal.fire({
        title: 'Invalid File',
        text: 'Please select a valid Excel file with .xlsx or .xls extension.',
        icon: 'error',
      });
      return;
    }
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

      const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      
      const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.processExcelData(excelData);
    };

    reader.readAsBinaryString(file);
  }

  isValidExcelFile(file: File): boolean {
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }

  processExcelData(data: any[]) {
    while (this.questions.length !== 0) {
      this.questions.removeAt(0);
    }

    data.forEach((row: any, index: number) => {
      const question = this.addQuestion();
      question.patchValue({
        questionText: row["Question Text"],
      });
  
      const optionsArray = question.get('options') as FormArray;
      while (optionsArray.length !== 0) {
        optionsArray.removeAt(0);
      }
      for (let i = 1; i <= 4; i++) {
        const optionText = row[`Option ${i} Text`];
        const optionCorrect = row[`Option ${i} Correct`];
        if (optionText.trim() !== '') {
          optionsArray.push(
            this.formBuilder.group({
              text: optionText,
              correct: optionCorrect,
            })
          );
        }
        if (optionText.trim() === '' || i === 4) {
          break;
        }
      }
  
      this.questions.push(question);
    });
  }
}
