import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';
import { ExamScheduleService } from '../exam-schedule.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
      this.courseList = response.courses.reverse();
      console.log(this.courseList, 'cList');
      // this.instructorList = response.instructors;
      //this.labList = response.labs;

      //this.cd.detectChanges();
    });
    this.getData()
    
    }
    onEndTimeChange(event: any) {
      //this.startTime=event.value
      // Handle the end time change event
      console.log('End Time Changed:', event.value);
      // You can perform additional actions based on the selected end time
    }
    onEndTimeChange1(event: any) {
      //this.endTime=event.value
      // Handle the end time change event
      console.log('End Time Changed:', event);
      console.log("==test=",this.examsheduleForm.get('startDate')?.value)
      const startTime = this.examsheduleForm.get('startDate')?.value;
      const endTime = this.examsheduleForm?.get('endDate')?.value;
  
      if (startTime && endTime) {
        console.log("==startTime=",startTime)
        const timeDifference= this.calculateTimeDifference(startTime, endTime);
        console.log("timeDifference",timeDifference)
        this.examsheduleForm.get('duration')?.setValue(timeDifference);
      }
  
      // You can perform additional actions based on the selected end time
    }
    private calculateTimeDifference(startTime: Date, endTime: Date): string {
      // Calculate time difference in seconds
      const timeDifferenceInSeconds = Math.abs(Math.round((endTime.getTime() - startTime.getTime()) /  (1000 * 60)));
      if (timeDifferenceInSeconds < 60) {
        // Display in minutes
        return `${timeDifferenceInSeconds} minute${timeDifferenceInSeconds !== 1 ? 's' : ''}`;
      } else {
        // Display in hours
        const timeDifferenceInHours = Math.floor(timeDifferenceInSeconds / 60);
        return `${timeDifferenceInHours} hour${timeDifferenceInHours !== 1 ? 's' : ''}`;
      }
     // return timeDifferenceInSeconds;
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
     

     Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this exam schedule!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.examSchedule.updateExamSchedule(this.examId,fomdata).subscribe(
          () => {
            Swal.fire({
              title: "Successful",
              text: "Exam Schedule update successfully",
              icon: "success",
            });
            //this.fileDropEl.nativeElement.value = "";
          this.examsheduleForm.reset();
          //this.toggleList()
          this.router.navigateByUrl('/admin/exam/exam-schedule');
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to create course kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });

    

     }
}
