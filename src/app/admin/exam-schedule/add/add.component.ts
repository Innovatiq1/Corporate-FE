import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';
import { ExamScheduleService } from '../exam-schedule.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  examsheduleForm: UntypedFormGroup ;
  courseList!: CourseTitleModel[];
  courseCode: any;
  breadscrums = [
    {
      title: ' Add Exam-Schedule',
      items: ['ExamSchedule'],
      active: 'Add',
    },
  ];
  courseTitle: any;
  
  constructor(
    private fb: UntypedFormBuilder,
    private _classService: ClassService,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private examSchedule:ExamScheduleService,
   
    private courseService: CourseService,
   
  ) {
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
    
    }
    cancel(){
      this.router.navigate(['/admin/exam/exam-schedule'])

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
      
     const fomdata= this.examsheduleForm.value

     let startTime=moment(fomdata.startDate).format('HH:mm a')
     let start=moment(startTime, 'HH:mm:ss').format('h:mm A');
     let endTime=moment(fomdata.endDate).format('HH:mm')
     let end=moment(endTime, 'HH:mm:ss').format('h:mm A');
    fomdata['courseCode']=this.courseCode,
     fomdata['courseName']=this.courseTitle,
     fomdata['startDate']=fomdata.startDate,
     fomdata['endDate']=fomdata.endDate,
     fomdata['startTime']= start,
     fomdata['endTime']= end,
     console.log()
     this.examSchedule.addExamSchedule(fomdata).subscribe((response:any) => {
      Swal.fire({
        title: 'Successful',
        text: 'Exam schdeule add successfully',
        icon: 'success',
      });
      this.router.navigate(['/admin/exam/exam-schedule'])
    });

  } 

     }

    
  


 


