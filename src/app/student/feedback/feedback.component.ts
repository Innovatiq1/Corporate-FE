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
  courseId!: string;
  studentId!: string;
  classId!: string;
  public questionList: any = [];
  selectedOptions: any[] = [];
  courseName: any;
  options: any;
  freeCourse: boolean;
  isFree = false;
  isPaid = false;
  path: string;
  constructor(
    private _classService: ClassService,
    private courseService: CourseService,
    private adminService: AdminService,
    private router: Router,
    private fb:FormBuilder,
    private surveyService: SurveyService,
    private classService: ClassService
  ) {
    let Path = this.router.url.split('/');
    this.freeCourse = Path.includes('freecourse');
    if(this.freeCourse){
      this.isFree = true;
    } else {
      this.isPaid = true;
    }

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
    this.path = urlPath[urlPath.length - 1];

    this.programsUrl = urlPath.includes('programs');
    this.coursesUrl = urlPath.includes('courses');
    if(this.coursesUrl || this.freeCourse){
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
    this.getCourseDetails();
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
  submit() {
  this.selectedOptions.forEach(option => {
        option.studentFirstName = this.userDetails.user.name;
        option.studentLastName = this.userDetails.user.last_name;
    });
    let selectedOptions = {
      selectedOptions: this.selectedOptions,
      studentFirstName: this.userDetails.user.name,
      studentLastName: this.userDetails.user.last_name,
      courseName: this.courseName
    };
    this.surveyService.addSurveyBuilder(selectedOptions).subscribe(
        (response) => {
            Swal.fire(
                'Successful',
                'Feedback submitted successfully',
                'success'
            ).then((r) => {
                this.feedbackForm.reset();
            });
            if(this.isPaid){
              let payload = {
                status: 'completed',
                studentId: this.studentId,
                playbackTime: 100,
                classId:this.path

              
              };
              this.classService
                .saveApprovedClasses(this.classId, payload)
                .subscribe((response) => {
                  setTimeout(() => {
                    this.router.navigate(['/student/view-course/'+ this.classId]);
                  }, 4000);
  
                });
            } else if(this.isFree){
              let payload = {
                status: 'completed',
                studentId: this.studentId,
                playbackTime: 100,
                courseId:this.path
              
              };
              this.classService
                .saveApprovedClasses(this.classId, payload)
                .subscribe((response) => {
                  setTimeout(() => {
                    this.router.navigate(['/student/view-freecourse/'+ this.courseId]);
                  }, 4000);
  
                });
            }
            
        },
        (err) => {
            console.log(err);
        }
    );
}

skip(){
  let payload = {
    status: 'completed',
    studentId: this.studentId,
    playbackTime: 100,
  };
  this.classService
    .saveApprovedClasses(this.classId, payload)
    .subscribe((response) => {
      setTimeout(() => {
        this.router.navigate(['/student/view-course/'+ this.classId]);
      }, 4000);

    });
}

  submitAnswer(questionId: any, selectedOption: any) {
    const index = this.selectedOptions.findIndex(option => option.questionId === questionId);
    if (index !== -1) {
      this.selectedOptions[index].selectedOption = selectedOption;
    } else {
      this.selectedOptions.push({ questionText: questionId, selectedOption: selectedOption});
    }
  }

  // submit(){
  //   // this.feedbackForm.patchValue({
  //   //   question5: this.selectedIndex,
  //   //   question6:this.question6
  //   // });
  //   this.selectedOptions.studentFirstName = this.userDetails.user.name;
  //   this.selectedOptions.studentLastName = this.userDetails.user.last_name;

  //   this.surveyService.addSurveyBuilder(this.selectedOptions).subscribe(
  //     (response) => {
  //       Swal.fire(
  //         'Successful',
  //         'Feedback submitted succesfully',
  //         'success'
  //       ).then((r) => {
  //         this.feedbackForm.reset();
  //         });
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );

  // }

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

  getCourseDetails(){
    let urlPath = this.router.url.split('/')
    this.courseId = urlPath[urlPath.length - 1];
    this.studentId = urlPath[urlPath.length - 2];
    this.classId = urlPath[urlPath.length - 3];

    this.courseService.getCourseById(this.courseId).subscribe((response) => {
    this.questionList = response?.survey?.questions;
    console.log("ques", this.questionList)
    this.courseName = response?.title
  })
}

}
