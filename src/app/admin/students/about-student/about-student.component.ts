import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { StudentsService } from '../all-students/students.service';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { CoursePaginationModel } from '@core/models/course.model';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.scss'],
})
export class AboutStudentComponent {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Student'],
      active: 'Profile',
    },
  ];
  aboutDataId:any;
  aboutData:any;
  studentRegisteredClasses: any;
  studentApprovedClasses: any;
  studentCompletedClasses: any;
  studentRegisteredPrograms: any;
  studentApprovedPrograms: any;
  studentCompletedPrograms: any;
  filterRegistered='';
  filterApproved='';
  filterCompleted ='';
  totalRegisteredItems: any;
  totalApprovedItems: any;
  totalCompletedItems: any;

  coursePaginationModel: Partial<CoursePaginationModel>;
  studentRegisteredModel!: Partial<CoursePaginationModel>;
  studentApprovedModel!: Partial<CoursePaginationModel>;
  studentCompletedModel!: Partial<CoursePaginationModel>;
  
  constructor(private activeRoute:ActivatedRoute, 
    private StudentService:StudentsService,
    public _courseService:CourseService,  
    private classService: ClassService
    ) {

      this.coursePaginationModel = {};
      this.studentRegisteredModel = {};
      this.studentApprovedModel = {};
      this.studentCompletedModel = {};
   this.activeRoute.queryParams.subscribe(param =>{
   console.log("params:",param['data'])

   this.aboutDataId = param['data'];
   })
  }

  ngOnInit() {
    this.loadData();
    this.getRegisteredCourse();
    this.getApprovedCourse();
    this.getCompletedCourse();
    this.getRegisteredProgram();
    this.getApprovedProgram();
    this.getCompletedProgram();
  }


  loadData(){
    this.StudentService.getStudentById( this.aboutDataId).subscribe(res => {
      this.aboutData = res;
      console.log("edit",this.aboutData)

    })
}
getRegisteredCourse(){
  // let studentId=localStorage.getItem('id')
  let filterRegisteredCourse = this.filterRegistered
  const payload = {  filterRegisteredCourse,studentId:  this.aboutDataId, status: 'registered' ,...this.coursePaginationModel};
  this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
   this.studentRegisteredClasses = response.data.docs.length;
  })
}
getApprovedCourse(){
  // let studentId=localStorage.getItem('id')
  let filterApprovedCourse = this.filterApproved
  const payload = {  filterApprovedCourse,studentId:  this.aboutDataId, status: 'approved' ,...this.coursePaginationModel};
  this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
   this.studentApprovedClasses = response.data.docs;
  })
}

getCompletedCourse(){
  // let studentId=localStorage.getItem('id')
  let filterCompletedCourse = this.filterCompleted
  const payload = {  filterCompletedCourse,studentId:  this.aboutDataId, status: 'completed' ,...this.coursePaginationModel};
  this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
   this.studentCompletedClasses = response.data.docs;
  })
}



getRegisteredProgram(){
// let studentId=localStorage.getItem('id')
let filterRegisteredCourse = this.filterRegistered
const payload = {  filterRegisteredCourse,studentId: this.aboutDataId, status: 'registered' ,...this.coursePaginationModel};
this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
this.studentRegisteredPrograms = response.data.docs.length;
})
}
getApprovedProgram(){
// let studentId=localStorage.getItem('id')
let filterApprovedCourse = this.filterApproved
const payload = {  filterApprovedCourse,studentId: this.aboutDataId, status: 'approved' ,...this.coursePaginationModel};
this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
this.studentApprovedPrograms = response.data.docs;
})
}
getCompletedProgram(){
// let studentId=localStorage.getItem('id')
let filterCompletedCourse = this.filterCompleted
const payload = {  filterCompletedCourse,studentId: this.aboutDataId, status: 'completed' ,...this.coursePaginationModel};
this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
this.studentCompletedPrograms = response.data.docs;
})
}


}



