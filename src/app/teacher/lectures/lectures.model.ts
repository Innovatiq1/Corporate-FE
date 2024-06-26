export class Lectures {
  id: number;
  sName: string;
  class: string;
  date: string;
  time: string;
  status: string;
  courseName:string;
  courseCode:string;
  sessionStartTime:string;
  sessionStartDate:string;
  classId:string;
  courseId:string;
  _id: string;
  sessions: any;
  
  constructor(lectures: Lectures) {
    {
      this.id = lectures.id || this.getRandomID();
      this.sName = lectures.sName || '';
      this.class = lectures.class || '';
      this.date = lectures.date || '';
      this.time = lectures.time || '';
      this.status = lectures.status || '';
      this.courseName=lectures.courseName || '';
      this.courseCode=lectures.courseCode || '';
      this.sessionStartTime=lectures.sessionStartTime || '';
      this.sessionStartDate=lectures.sessionStartDate || '';
      this.classId=lectures.classId || '';
      this.courseId=lectures.courseId || '';
      this._id=lectures._id || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
