import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseTitleModel } from '@core/models/class.model';
import { AdminService } from '@core/service/admin.service';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { SurveyService } from 'app/admin/survey/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  name = 'Angular ' + VERSION.major;
  selectcourse: boolean = false;
  programData: any = [];
  userTypeNames: any;
  data:any;
  question6 = 0;
  currentRate = 3.14;
  breadscrums = [
    {
      title: 'Likert Chart',
      items: ['Survey'],
      active: 'Likert Chart',
    },
  ];
  selected = false;
  instructorList: any = [];
  courseList!: CourseTitleModel[];
  countNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedIndex: number | undefined;
  favoriteSeason?: string;
  course: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  levelofcourse: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  expectations: string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  subject : string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  programsUrl: boolean;
  coursesUrl: boolean;
  studentApprovedCourses: any;
  studentApprovedPrograms: any;
  feedbackForm:FormGroup
  userDetails: any;
  constructor(
    private _classService: ClassService,
    private courseService: CourseService,
    private adminService: AdminService,
    private router: Router,
    private fb:FormBuilder,
    private surveyService: SurveyService
  ) {
    this.feedbackForm = this.fb.group({
      courseName: ['',[] ],
      programName: ['',[] ],
      question1: ['', []],
      question2:['',[] ],
      question3: ['',[] ],
      question4: ['',[] ],
      question5: [null], 
      question6: [null], 
      question7: ['',[] ],

    });

    let urlPath = this.router.url.split('/')
    this.programsUrl = urlPath.includes('programs');
    this.coursesUrl = urlPath.includes('courses');
    if(this.coursesUrl){
      this.breadscrums = [
        {
          title: 'Courses',
          items: ['Feedback'],
          active: 'Courses',
        },
      ];
    } else if (this.programsUrl) {
      this.breadscrums = [
        {
          title: 'Programs',
          items: ['Feedback'],
          active: 'Programs',
        },
      ];

    }
  }

  ngOnInit() {
    this.getProgramList()
    this.getAllUserTypes()
    this.getApprovedCourse()
    this.getApprovedPrograms()
    this._classService.getAllCoursesTitle('active').subscribe((course) => {
      this.courseList = course;
    });
    let user =localStorage.getItem('currentUser')
    this.userDetails = JSON.parse(user!)
  }
  getApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'completed','isAll':true };
    this._classService.getStudentRegisteredClasses(payload).subscribe(response =>{
     this.studentApprovedCourses = response.data.docs;
    })
  }
  getApprovedPrograms(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'completed', 'isAll':true };
    this._classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
     this.studentApprovedPrograms = response.data.docs;
    })
  }
  submit(){
    this.feedbackForm.patchValue({
      question5: this.selectedIndex,
      question6:this.question6
    });
     this.feedbackForm.value.studentFirstName = this.userDetails.user.name;
    this.feedbackForm.value.studentLastName = this.userDetails.user.last_name;

    this.surveyService.addSurveyBuilder(this.feedbackForm.value).subscribe(
      (response) => {
        Swal.fire(
          'Successful',
          'Feedback submitted succesfully',
          'success'
        ).then((r) => {
          this.feedbackForm.reset();
          });
      },
      (err) => {
        console.log(err);
      }
    );

  }
  
  
  public setRow(_index: number) {
    this.selectedIndex = _index;
  }


  // selectcourseList(){
  //   this.selectcourse = true;
  // }

  // selectprogramList(){
  //   this.selectcourse = false;
  // }

  getProgramList() {
    this.courseService.getCourseProgram({status:'active'}).subscribe(
      (response: any) => {
        console.log("page",response)
        this.programData = response.docs;
      },
      (error) => {
      }
    );
  }
  getAllUserTypes(filters?: any) {
    this.adminService.getUserTypeList({ 'allRows':true }).subscribe(
      (response: any) => {
        this.data = response.filter((item:any) =>item.typeName !== 'admin');
      },
      (error) => {
      }
    );
  }

}
