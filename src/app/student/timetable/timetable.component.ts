import { Component, OnInit } from '@angular/core';
import { ClassService } from 'app/admin/schedule-class/class.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  breadscrums = [
    {
      title: 'Timetable',
      items: ['Student'],
      active: 'Timetable',
    },
  ];
  studentApprovedClasses: any;
  upcomingCourseClasses: any;
  studentApprovedPrograms: any;
  upcomingProgramClasses: any;
  upcomingProgramsLength: any;
  upcomingCoursesLength: any;

  constructor(private classService: ClassService) {
  }

  ngOnInit(){
    this.getApprovedCourse();
    this.getApprovedProgram();

  }
  getApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' ,isAll:true};
    this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
     this.studentApprovedClasses = response.data.slice(0,5);
     const currentDate = new Date();
     const currentMonth = currentDate.getMonth();
     const currentYear = currentDate.getFullYear();  
     const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
     this.upcomingCourseClasses = this.studentApprovedClasses.filter((item:any) => {
      const sessionStartDate = new Date(item.classId.sessions[0].sessionStartDate);
      return (
        sessionStartDate >= tomorrow 
      );
    });
    this.upcomingCourseClasses.sort((a:any,b:any) => {
      const startDateA = a.classId.sessions[0].sessionStartDate;
      const startDateB = b.classId.sessions[0].sessionEndDate;
      return startDateA > startDateB ? 1 : startDateA < startDateB ? -1 : 0;
    });
    this.upcomingCoursesLength = this.upcomingCourseClasses.length
    })
  }
  getApprovedProgram(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved',isAll:true };
    this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
     this.studentApprovedPrograms= response.data.slice(0,5);
     const currentDate = new Date();
     const currentMonth = currentDate.getMonth();
     const currentYear = currentDate.getFullYear();  
     const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
     this.upcomingProgramClasses = this.studentApprovedPrograms.filter((item:any) => {
      const sessionStartDate = new Date(item.classId.sessions[0].sessionStartDate);
      return (
        sessionStartDate >= tomorrow 
      );
    });
    this.upcomingProgramClasses.sort((a:any,b:any) => {
      const startDateA = a.classId.sessions[0].sessionStartDate;
      const startDateB = b.classId.sessions[0].sessionEndDate;
      return startDateA > startDateB ? 1 : startDateA < startDateB ? -1 : 0;
    });
    this.upcomingProgramsLength = this.upcomingProgramClasses.length



    })
  }


}
