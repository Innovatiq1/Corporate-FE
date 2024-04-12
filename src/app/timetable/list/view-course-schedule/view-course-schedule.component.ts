import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamSchedule } from 'app/timetable/exam-schedule.model';
import { ExamScheduleService } from 'app/timetable/exam-schedule.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-course-schedule',
  templateUrl: './view-course-schedule.component.html',
  styleUrls: ['./view-course-schedule.component.scss']
})
export class ViewCourseScheduleComponent {
  breadscrums = [
    {
      title: 'Edit Exam-Schedule',
      items: ['ExamSchedule'],
      active: 'View',
    },
  ];
  

  subscribeParams: any;
  examId: any;
  aboutData1: any;
  id?: number;
  examSchedule?: ExamSchedule;

  constructor(private activatedRoute: ActivatedRoute,
    private examScheduleService:ExamScheduleService,
    private router: Router,){
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.examId = params.id;
    });
  
  }
  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.examScheduleService.getExamById(this.examId).subscribe((response:any)=>{
    this.aboutData1 = response;
  })
}
editCall(row: ExamSchedule) {
  this.id = row.id;
  this.router.navigate(['/timetable/course-exam-edit/' + this.id])

}
delete(row: ExamSchedule) {
   Swal.fire({
     title: "Confirm Deletion",
     text: "Are you sure you want to delete this Exam Schedule?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#d33",
     cancelButtonColor: "#3085d6",
     confirmButtonText: "Delete",
     cancelButtonText: "Cancel",
   }).then((result) => {
     if (result.isConfirmed) {
       this.examScheduleService.deleteExam(row.id).subscribe(
         () => {
           Swal.fire({
             title: "Deleted",
             text: "Exam Schedule deleted successfully",
             icon: "success",
           });
           this.loadData()
           window.history.back();
         },
         (error: { message: any; error: any; }) => {
           Swal.fire(
             "Failed to delete  Instructor",
             error.message || error.error,
             "error"
           );
         }
       );
     }
   });

 }
}
