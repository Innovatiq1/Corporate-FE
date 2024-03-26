import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel, SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { QuestionService } from '@core/service/question.service';
import { UtilsService } from '@core/service/utils.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {


  breadscrums = [
    {
      title: 'Questions',
      items: ['Course'],
      active: 'Add Questions',
    },
  ];

questionForm!: FormGroup; 
questionId!: string;
editUrl: any;
question: any;
subscribeParams: any;


constructor(private formBuilder: FormBuilder,private router: Router, private questionService: QuestionService, private cdr: ChangeDetectorRef,private activatedRoute: ActivatedRoute,) {
  
  let urlPath = this.router.url.split('/')
  this.editUrl = urlPath.includes('edit-questions');


  if(this.editUrl===true){
    this.breadscrums = [
      {
        title:'Edit Questions',
        items: ['Assessments'],
        active: 'Edit Questions',
      },
    ];
  }

  this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
    this.questionId = params.id;
    //console.log("=Id===",params.id)
  });
}

ngOnInit() {
  this.questionForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    questions: this.formBuilder.array([
      this.createQuestion()
    ])
  });
  this.getData();
}


get questions(): FormArray {
  return this.questionForm.get('questions') as FormArray;
}

addQuestion() {
  this.questions.push(this.createQuestion());
  this.cdr.detectChanges();
}

addOption(questionIndex: number) {
  const options = this.getOptions(questionIndex);
  options.push(this.createOption());
  // options.push(this.createOption());
}

createQuestion(): FormGroup {
  return this.formBuilder.group({
    // name: ['', Validators.required],
    questionText: ['', Validators.required],
    options: this.formBuilder.array([
      this.createOption(),
      // this.createOption()
    ])
  });
}

createOption(): FormGroup {
  return this.formBuilder.group({
    text: '',
    correct: false // Default to false
  });
}


getOptions(questionIndex: number): FormArray {
  return this.questions.at(questionIndex).get('options') as FormArray;
}
save() {
  if (this.questionForm.valid) {
    const payload = {
      name: this.questionForm.value.name,
      questions: this.questionForm.value.questions.map((question: any) => ({
        questionText: question.questionText,
        options: question.options.map((option: any) => ({
          text: option.text,
          correct: option.correct
        }))
      }))
    };
Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to create question!',
    icon: 'warning',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed){
      this.questionService.createQuestion(payload).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Question created successfully',
            icon: 'success',
          });
          this.router.navigate(['/admin/questions/all-questions'])
        },
        (err: any) => {
          Swal.fire(
            'Failed to create Question',
            'error'
          );
        }
      );
    }
  });
  }
  
}
update(){
  if (this.questionForm.valid) {
    const payload = {
      name: this.questionForm.value.name,
      questions: this.questionForm.value.questions.map((question: any) => ({
        questionText: question.questionText,
        options: question.options.map((option: any) => ({
          text: option.text,
          correct: option.correct
        }))
      })),
      id:this.questionId,

    };
Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update!',
    icon: 'warning',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed){
      this.questionService.updateQuestions(payload).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Question Updated successfully',
            icon: 'success',
          });
          this.router.navigate(['/admin/questions/all-questions'])
        
        },
        (err: any) => {
          Swal.fire(
            'Failed to update Question',
            'error'
          );
        }
      );
    }
  });
    
    
  }
}

getData() {
  this.questionService.getQuestionsById(this.questionId).subscribe((response: any) => {
    if (response && response.questions) {
      this.question = response;
      this.questionForm.patchValue({
        name: response.name,
      });

      const questionsArray = this.questionForm.get('questions') as FormArray;
      while (questionsArray.length !== 0) {
        questionsArray.removeAt(0);
      }

      response.questions.forEach((question: any) => {
        if (question.questionText.trim() !== '') { 
          const newQuestionGroup = this.createQuestion();
          newQuestionGroup.patchValue({
            questionText: question.questionText,
          });

          const optionsArray = newQuestionGroup.get('options') as FormArray;
          optionsArray.clear(); 
          question.options.forEach((option: any) => {
            optionsArray.push(
              this.formBuilder.group({
                text: option.text,
                correct: option.correct
              })
            );
          });
          questionsArray.push(newQuestionGroup);
        }
      });
     
    }
  });
}



}
