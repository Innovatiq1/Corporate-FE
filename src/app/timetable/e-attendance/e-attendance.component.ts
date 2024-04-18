import { ChangeDetectorRef, Component} from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CourseTitleModel } from '@core/models/class.model';
import { CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-e-attendance',
  templateUrl: './e-attendance.component.html',
  styleUrls: ['./e-attendance.component.scss']
})
export class EAttendanceComponent {
  attendanceForm: UntypedFormGroup;
  displayedColumns = [
    'Student',
    'name',
    'startDate',
      'endDate',
      'registeredDate'
  ];
  headeritems: string[] = ['Employee Name', ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())];
  courseData = [
    { student: 'Chung', course: 'Test', start: '17-3-24', end: '21-3-24', registered: '25-3-24' },
   
     
  ];
  programData = [
    { student: 'Zheng Luo', program: 'Testing', start: '14-2-24', end: '16-8-24', registered: '23-5-24' },
   
     
  ];
  dataSource = [
    { employeeName: 'Chung' },
    { employeeName: 'Thomas'},
    { employeeName: 'Bolin' },
    { employeeName: 'Yichen' },
    { employeeName: 'Jun Hi'},
   
     
  ];
  studentApprovedCourses: any;
  studentApprovedPrograms: any;
  courseList!: any;
  courseTitle: any;
  courseCode: any;
  programList!: any;
  programTitle: any;
  programCode: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  isCourse: boolean = true;
  isProgram: boolean = false;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];

  constructor(
    private _classService: ClassService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef,
    private courseService: CourseService,
  ) {
    // this.attendanceForm = new UntypedFormGroup({
    //   fromDate: new UntypedFormControl(),
    //   toDate: new UntypedFormControl(),
    // });
    this.attendanceForm = this.fb.group({
      courseName: ['',[] ],
      programName: ['',[] ],
      fromDate: new UntypedFormControl(),
      toDate: new UntypedFormControl(),
    });
    this.coursePaginationModel = {};
  }

  ngOnInit() {
    forkJoin({
      courses: this._classService.getAllCoursesTitle('active'),
      programs: this.courseService.getPrograms({...this.coursePaginationModel,status:'active'}),
    }).subscribe((response) => {
      this.courseList = response.courses.reverse();
      this.programList = response.programs;
      this.cd.detectChanges();
    });
 
  }
  onSelectCourse(event: any){
   console.log("event", event)
   if(event.value == 'course'){
    this.isCourse = true;
    this.isProgram = false;
   }else if (event.value == 'program'){
    this.isProgram = true;
    this.isCourse = false;
   }
  }
  onSelectChange(event: any) {
    const filteredData = this.courseList.filter(
      (item: { _id: string }) =>
        item._id === this.attendanceForm.controls['courseId'].value
    );
    this.courseTitle=filteredData[0].title
    this.courseCode=filteredData[0].courseCode
    this.isCourse = true;
    this.isProgram = false;
  }
  onSelectChange1(event: any) {
    const filteredData = this.programList.filter(
      (item: { _id: string }) =>
        item._id === this.attendanceForm.controls['courseId'].value
    );
    this.programTitle=filteredData[0].title
      this.programCode=filteredData[0].courseCode
      this.isProgram = true;
      this.isCourse = false;
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
  }
}
