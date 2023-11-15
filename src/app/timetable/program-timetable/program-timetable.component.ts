import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { ClassService } from 'app/admin/schedule-class/class.service';
import dayGridPlugin from '@fullcalendar/daygrid'
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-timetable',
  templateUrl: './program-timetable.component.html',
  styleUrls: ['./program-timetable.component.scss']
})
export class ProgramTimetableComponent implements OnInit {
  courseCalendarOptions!: CalendarOptions;
  programCalendarOptions!: CalendarOptions

  breadscrums = [
    {
      title: 'Program-Timetable',
      items: ['Timetable'],
      active: 'Program-Timetable',
    },
  ];
  studentApprovedClasses: any;
  upcomingCourseClasses: any;
  studentApprovedPrograms: any;
  upcomingProgramClasses: any;
  upcomingProgramsLength: any;
  upcomingCoursesLength: any;
  allProgramClasses: any;
  studentUrl: any;
  adminUrl: any;

  constructor(private classService: ClassService, private router: Router) {
    let userType = localStorage.getItem("user_type")
    if(userType == "Student"){
      this.getApprovedCourse();
      this.getApprovedProgram();
    }
    else if(userType == "admin"){
      this.getClassList();
    }
  }

  ngOnInit(){
    this.programCalendarOptions ={
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],  
      events: [
            { title: '', date: '' },
          ]
    };

    this.courseCalendarOptions ={
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],  
      events: [
            { title: '', date: '' },
            { title: '', date: '' }
          ]
    };
   
  }
  getClassList(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' ,isAll:true};
    this.classService.getProgramClassListWithPagination(payload).subscribe(response => {
      this.allProgramClasses = response.data.docs;
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const tomorrow = new Date(currentYear, currentMonth, currentDate.getDate() + 1);
          this.upcomingCourseClasses = this.allProgramClasses.filter((item: any) => {
        const sessionEndDate = new Date(item.sessions[0].sessionEndDate);
        return sessionEndDate >= tomorrow;
      });
      //     this.studentApprovedClasses.sort((a: any, b: any) => {
      //   const startDateA = new Date(a.classId.sessions[0].sessionStartDate);
      //   const startDateB = new Date(b.classId.sessions[0].sessionStartDate);
      //   return startDateA > startDateB ? 1 : startDateA < startDateB ? -1 : 0;
      // });
          const events = this.allProgramClasses.flatMap((courseClass: any,classId:any) => {
        const startDate = new Date(courseClass.sessions[0].sessionStartDate);
        const endDate = new Date(courseClass?.sessions[0]?.sessionEndDate);
        const sessionStartTime = courseClass?.sessions[0]?.sessionStartTime;
        const sessionEndTime = courseClass?.sessions[0]?.sessionEndTime;
        const title = courseClass?.courseId?.title;
        const datesArray = [];
        let currentDate = startDate;
            while (currentDate <= endDate) {
          datesArray.push({
            title: title,
            date: new Date(currentDate),
            extendedProps: {
              sessionStartTime: sessionStartTime,
              sessionEndTime: sessionEndTime
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
              <div style=" font-size:10px; color: blue; white-space: normal; word-wrap: break-word;">
                ${title}<br>
                 <span class="text-muted">${sessionStartTime} - ${sessionEndTime}</span>
              </div>`
          };
        }  ,    
      };
    });
  }
  getApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' ,isAll:true};
    this.classService.getStudentRegisteredClasses(payload).subscribe(response => {
      this.studentApprovedClasses = response.data.slice(0, 5);
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
        const datesArray = [];
        let currentDate = startDate;
            while (currentDate <= endDate) {
          datesArray.push({
            title: title,
            date: new Date(currentDate),
            extendedProps: {
              sessionStartTime: sessionStartTime,
              sessionEndTime: sessionEndTime
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
              <div style=" font-size:10px; color: blue; white-space: normal; word-wrap: break-word;">
                ${title}<br>
                 <span class="text-muted">${sessionStartTime} - ${sessionEndTime}</span>
              </div>`
          };
        }  ,    
      };
    });
        
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
      const sessionEndDate = new Date(item.classId.sessions[0].sessionEndDate);
      return (
        sessionEndDate >= tomorrow 
      );
    });
    const events = this.studentApprovedPrograms.flatMap((courseClass: any,classId:any) => {
      const startDate = new Date(courseClass.classId.sessions[0].sessionStartDate);
      const endDate = new Date(courseClass.classId.sessions[0].sessionEndDate);
      const sessionStartTime = courseClass.classId.sessions[0].sessionStartTime;
      const sessionEndTime = courseClass.classId.sessions[0].sessionEndTime;
      const title = courseClass.classId.courseId.title;
      const datesArray = [];
      let currentDate = startDate;
          while (currentDate <= endDate) {
        datesArray.push({
          title: title,
          date: new Date(currentDate),
          extendedProps: {
            sessionStartTime: sessionStartTime,
            sessionEndTime: sessionEndTime
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
  
    this.programCalendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: filteredEvents,
      eventContent: function(arg, createElement) {
        const title = arg.event.title;
        const sessionStartTime = arg.event.extendedProps['sessionStartTime'];
        const sessionEndTime = arg.event.extendedProps['sessionEndTime'];
        return {
          html: `
            <div style=" font-size:10px; color: white; white-space: normal; word-wrap: break-word;">
              ${title}<br>
               <span style ="color:white">${sessionStartTime} - ${sessionEndTime}</span>
            </div>`
        };
      }  , 
      eventDisplay: 'block' 
   
    };


    // this.upcomingProgramClasses.sort((a:any,b:any) => {
    //   const startDateA = a.classId.sessions[0].sessionStartDate;
    //   const startDateB = b.classId.sessions[0].sessionEndDate;
    //   return startDateA > startDateB ? 1 : startDateA < startDateB ? -1 : 0;
    // });
    this.upcomingProgramsLength = this.upcomingProgramClasses.length
    



    })
  }


}