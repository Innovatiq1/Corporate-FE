import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';
import { ExamScheduleService } from '../exam-schedule.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  examId: any;
  subscribeParams: any;
  courseList!: CourseTitleModel[];
  courseCode: any;
  //examsheduleForm: any;
  examsheduleForm: UntypedFormGroup ;
  courseTitle: any;
  breadscrums = [
    {
      title: 'Edit Exam-Schedule',
      items: ['ExamSchedule'],
      active: 'Edit',
    },
  ];
  


  constructor(private activatedRoute: ActivatedRoute,
    private _classService: ClassService,
    private courseService: CourseService,
    private examSchedule:ExamScheduleService,
    private router: Router,
    private fb: UntypedFormBuilder,){
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.examId = params.id;
    });
    this.examsheduleForm = this.fb.group({
      courseId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      duration:  ['', [Validators.required]]
      
    });
  }

  ngOnInit(): void {
    forkJoin({
      courses: this._classService.getAllCoursesTitle('active'),
      // instructors: this.instructorService.getInstructor(),
      //labs: this._classService.getAllLaboratory(),
    }).subscribe((response) => {
      this.courseList = response.courses;
      console.log(this.courseList, 'cList');
      // this.instructorList = response.instructors;
      //this.labList = response.labs;

      //this.cd.detectChanges();
    });
    this.getData()
    
    }
    cancel(){
      this.router.navigate(['/admin/exam/exam-schedule'])

    }
    getData(){
      forkJoin({
        course: this.examSchedule.getExamById(this.examId),
        
      }).subscribe((response: any) => {
        if(response){
          
          this.examsheduleForm.patchValue({
            courseId:response?.course?.courseId,
            startDate: response?.course?.startDate,
            endDate: response?.course?.endDate,
            duration: response?.course?.duration,
            
            
          });
          
    
        }
       
        
        
        
      });
    
    
    }
    
    onSelectChange(event :any) {
      // console.log("this.classForm.controls['instructor'].value",this.classForm.controls['courseId'].value)
      this.courseService.getCourseById(this.examsheduleForm.controls['courseId'].value).subscribe((response) => {
         console.log("-==========",response)
        // this.router.navigateByUrl(`Schedule Class/List`);
        this.courseTitle=response.title
        this.courseCode=response.courseCode
  
  
        // console.log(response)
       });
  
     }
     onSubmit(){

     }
}
