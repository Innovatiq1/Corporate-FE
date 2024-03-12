import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel, SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { QuestionService } from '@core/service/question.service';
import { UtilsService } from '@core/service/utils.service';
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


constructor(private formBuilder: FormBuilder,private router: Router, private questionService: QuestionService, private cdr: ChangeDetectorRef) {
  
}

ngOnInit() {
  this.questionForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    questions: this.formBuilder.array([
      this.createQuestion()
    ])
  });
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
}
}
