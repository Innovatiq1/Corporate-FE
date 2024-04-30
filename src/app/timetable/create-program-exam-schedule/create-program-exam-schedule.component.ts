import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { ExamScheduleService } from '../exam-schedule.service';
import { CourseService } from '@core/service/course.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-program-exam-schedule',
  templateUrl: './create-program-exam-schedule.component.html',
  styleUrls: ['./create-program-exam-schedule.component.scss']
})
export class CreateProgramExamScheduleComponent {
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
  startTime: any;
  endTime: any;
  
  constructor(
    private fb: UntypedFormBuilder,
    private _classService: ClassService,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private examSchedule:ExamScheduleService,
   
    private courseService: CourseService,
   
  ) {
    this.examsheduleForm = this.fb.group({
      programId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      duration:  ['', [Validators.required]]
      
    });
   
    
  }
  
  ngOnInit(): void {
    forkJoin({
      courses: this._classService.getAllProgramesTitle('active'),
      // instructors: this.instructorService.getInstructor(),
      //labs: this._classService.getAllLaboratory(),
    }).subscribe((response) => {
      this.courseList = response.courses.reverse();
      
      // this.instructorList = response.instructors;
      //this.labList = response.labs;

      //this.cd.detectChanges();
    });
    
    }
    onEndTimeChange(event: any) {
      this.startTime=event.value
      // Handle the end time change event
      // You can perform additional actions based on the selected end time
    }
    onEndTimeChange1(event: any) {
      this.endTime=event.value
      const startTime = this.examsheduleForm.get('startDate')?.value;
      const endTime = this.examsheduleForm?.get('endDate')?.value;
  
      if (startTime && endTime) {
        
        const timeDifference= this.calculateTimeDifference(startTime, endTime);
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
      this.router.navigate(['/timetable/program-exam'])

    }
    onSelectChange(event :any) {
      this.courseService.getProgramById(this.examsheduleForm.controls['programId'].value).subscribe((response) => {
        // this.router.navigateByUrl(`Schedule Class/List`);
        this.courseTitle=response.data.title
        this.courseCode=response.data.courseCode
       });
  
     }
    onSubmit(){
      if(this.examsheduleForm.valid){

     
     const fomdata= this.examsheduleForm.value

     let startTime=moment(fomdata.startDate).format('HH:mm a')
     let start=moment(startTime, 'HH:mm:ss').format('h:mm A');
     let endTime=moment(fomdata.endDate).format('HH:mm')
     let end=moment(endTime, 'HH:mm:ss').format('h:mm A');
    fomdata['programCode']=this.courseCode,
     fomdata['ProgramName']=this.courseTitle,
     fomdata['startDate']=fomdata.startDate,
     fomdata['endDate']=fomdata.endDate,
     fomdata['startTime']= start,
     fomdata['endTime']= end,

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create exam schedule!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.examSchedule.addExamScheduleProgram(fomdata).subscribe((response:any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Exam schdeule add successfully',
            icon: 'success',
          });
          this.router.navigate(['/timetable/program-exam'])
        });
      }
    });
     

    } else{
      this.examsheduleForm.markAllAsTouched();
    }
  }
}

    
  


 


