import { Component, OnInit } from '@angular/core';
import { ClassService } from 'app/admin/schedule-class/class.service';
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})

export class TimetableComponent implements OnInit {
  courseCalendarOptions!: CalendarOptions;
  programCalendarOptions!: CalendarOptions

  breadscrums = [
    {
      title: 'Course-Timetable',
      items: ['Timetable'],
      active: 'Course-Timetable',
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

    this.getApprovedCourse();
    this.getApprovedProgram();
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
            <div style=" font-size:10px; color: white
            ; white-space: normal; word-wrap: break-word;">
              ${title}<br>
               <span style ="color:white">${sessionStartTime} - ${sessionEndTime}</span>
            </div>`
          };
        }  ,  
        eventDisplay: 'block' 
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
            <div style=" font-size:10px; color: blue; white-space: normal; word-wrap: break-word;">
              ${title}<br>
               <span class="text-muted">${sessionStartTime} - ${sessionEndTime}</span>
            </div>`
        };
      }  ,    
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
