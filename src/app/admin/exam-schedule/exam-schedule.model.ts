import { formatDate } from '@angular/common';
export class ExamSchedule {
  
  id: number;
  courseName: string;
  courseCode:string;
  class: string;
  date: string;
  time: string;
  duration: string;
  roomNo: string;
  totalMarks: string;
  reqMarks: string;
  data:any;
  docs:[]

  constructor(examSchedule: ExamSchedule) {
    {
      this.id = examSchedule.id || this.getRandomID();
      this.courseName = examSchedule.courseName || '';
      this.courseCode = examSchedule.courseCode || '';
      this.class = examSchedule.class || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.time = examSchedule.time || '';
      this.duration = examSchedule.duration || '';
      this.roomNo = examSchedule.roomNo || '';
      this.totalMarks = examSchedule.totalMarks || '';
      this.reqMarks = examSchedule.reqMarks || '';
      this.docs=[]
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
