import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ClassService } from 'app/admin/schedule-class/class.service';
import dayGridPlugin from '@fullcalendar/daygrid'
import { Router } from '@angular/router';
import { LecturesService } from 'app/teacher/lectures/lectures.service';
import { EventDetailDialogComponent } from '../program-timetable/event-detail-dialog/event-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent {
  courseCalendarOptions!: CalendarOptions;
  filterName='';

  breadscrums = [
    {
      title: 'Course Timetable',
      items: ['Timetable'],
      active: 'My Courses',
    },
  ];
  studentApprovedClasses: any;
  upcomingCourseClasses: any;
  upcomingCoursesLength: any;
  allClasses: any;


  constructor(private classService: ClassService, private router: Router,public lecturesService: LecturesService,public dialog: MatDialog) {
    let userType = localStorage.getItem("user_type")
    if(userType == "Student"){
      this.getApprovedCourse();
    }
  
  }

  ngOnInit(){
 

    this.courseCalendarOptions ={
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],  
      events: [
            { title: '', date: '' },
            { title: '', date: '' }
          ]
    };
    
  
  }
   getInstructorApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId ,isAll:true,type:"Instructor"};
    let instructorId = localStorage.getItem('id')
    this.lecturesService.getClassListWithPagination(instructorId, this.filterName,).subscribe(
      (response: { data: { docs: string | any[]; }; }) => {

      this.studentApprovedClasses = response.data.docs.slice(0, 5);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
      
      
        const events = this.studentApprovedClasses.flatMap((courseClass: any,classId:any) => {
        const startDate = new Date(courseClass?.sessions[0].sessionStartDate);
        const endDate = new Date(courseClass?.sessions[0]?.sessionEndDate);
        const sessionStartTime = courseClass?.sessions[0]?.sessionStartTime;
        const sessionEndTime = courseClass?.sessions[0]?.sessionEndTime;
        const title = courseClass?.sessions[0]?.courseName;
       
        const datesArray = [];
        let currentDate = startDate;
            while (currentDate <= endDate) {
          datesArray.push({
            title: title,
            date: new Date(currentDate),
            extendedProps: {
              sessionStartTime: sessionStartTime,
              sessionEndTime: sessionEndTime,
            
            }
          });
          currentDate.setDate(currentDate.getDate() + 1); 
        }
        return datesArray;
      });
      const filteredEvents = events.filter((event: { date: string | number | Date; }) => {
        const eventDate = new Date(event.date);
        return eventDate.getDay() !== 0; // Filter out events on Sundays
      });
    
      this.courseCalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: filteredEvents,
        eventContent: function(arg, createElement) {
          const title = arg.event.title;
          const sessionStartTime = arg.event.extendedProps['sessionStartTime'];
          const sessionEndTime = arg.event.extendedProps['sessionEndTime'];
          return {
            html: `
            <div style=" font-size:10px; color: white
            ; white-space: normal; word-wrap: break-word;cursor:pointer">
              ${title}<br>
               <span style ="color:white;cursor:pointer">${sessionStartTime} - ${sessionEndTime}</span>
            </div>`
          };
        }  ,  
        eventDisplay: 'block' ,
        eventClick: (clickInfo) => this.openDialog(clickInfo.event)
        
      };
    });
        
  }
  openDialog(event: { title: any; extendedProps: { [x: string]: any; }; }) {
    this.dialog.open(EventDetailDialogComponent, {
      width: '700px',
      data: {
        title: event.title,
        sessionStartTime: event.extendedProps['sessionStartTime'],
        sessionEndTime: event.extendedProps['sessionEndTime'],
        courseCode: event.extendedProps['courseCode'],
        status: event.extendedProps['status'],
        sessionStartDate: event.extendedProps['sessionStartDate'],
        sessionEndDate: event.extendedProps['sessionEndDate'],
        deliveryType: event.extendedProps['deliveryType'],
        instructorCost: event.extendedProps['instructorCost']
      }
    });
  }

 
  getApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' ,isAll:true};
    this.classService.getStudentRegisteredClasses(payload).subscribe(response => {

      this.studentApprovedClasses = response.data.docs.slice(0, 5);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
          this.upcomingCourseClasses = this.studentApprovedClasses.filter((item: any) => {
        const sessionEndDate = new Date(item.classId.sessions[0].sessionEndDate);
        return sessionEndDate >= tomorrow;
      });
      //     this.studentApprovedClasses.sort((a: any, b: any) => {
      //   const startDateA = new Date(a.classId.sessions[0].sessionStartDate);
      //   const startDateB = new Date(b.classId.sessions[0].sessionStartDate);
      //   return startDateA > startDateB ? 1 : startDateA < startDateB ? -1 : 0;
      // });
          const events = this.studentApprovedClasses.flatMap((courseClass: any,classId:any) => {
        const startDate = new Date(courseClass.classId.sessions[0].sessionStartDate);
        const endDate = new Date(courseClass?.classId?.sessions[0]?.sessionEndDate);
        const sessionStartTime = courseClass?.classId?.sessions[0]?.sessionStartTime;
        const sessionEndTime = courseClass?.classId?.sessions[0]?.sessionEndTime;
        const title = courseClass?.classId?.courseId?.title;
        const courseCode = courseClass.courseId.courseCode;
        const deliveryType = courseClass.classId?.classDeliveryType;
        const instructorCost = courseClass.classId?.instructorCost;
        const datesArray = [];
        let currentDate = startDate;
            while (currentDate <= endDate) {
          datesArray.push({
            title: title,
            date: new Date(currentDate),
            extendedProps: {
              sessionStartTime: sessionStartTime,
              sessionEndTime: sessionEndTime,
              courseCode: courseCode,
              instructorCost:instructorCost,
              deliveryType:deliveryType
            }
          });
          currentDate.setDate(currentDate.getDate() + 1); 
        }
        return datesArray;
      });
      const filteredEvents = events.filter((event: { date: string | number | Date; }) => {
        const eventDate = new Date(event.date);
        return eventDate.getDay() !== 0; // Filter out events on Sundays
      });
    
      this.courseCalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: filteredEvents,
        eventContent: function(arg, createElement) {
          const title = arg.event.title;
          const sessionStartTime = arg.event.extendedProps['sessionStartTime'];
          const sessionEndTime = arg.event.extendedProps['sessionEndTime'];
          return {
            html: `
            <div style=" font-size:10px; color: white
            ; white-space: normal; word-wrap: break-word;cursor:pointer">
              ${title}<br>
               <span style ="color:white;cursor:pointer">${sessionStartTime} - ${sessionEndTime}</span>
            </div>`
          };
        }  ,  
        eventDisplay: 'block' ,
        eventClick: (clickInfo) => this.openDialog(clickInfo.event)
      };
    });
        
  }

}