import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { CoursePaginationModel } from '@core/models/course.model';
import { AdminService } from '@core/service/admin.service';
import { CourseService } from '@core/service/course.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { StudentsService } from 'app/admin/students/students.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  breadscrums = [
    {
      title: 'Reoprts',
      items: ['Reports'],
      active: 'Report',
    },
  ];
  reportForm!: FormGroup;
  payRunDate?: string;
  position?: string;
  department?: string;
  selectedUsers: any = [];
  users: any;
  dept: any;
  programData: any;
  courseData: any;
  userGroupData: any;
  programList: any;
  courseList: any;
  selectedPrograms: any = [];
  selectedCourses: any = [];
  selectedUserGroups: any = [];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  userGroups!: any[];
  roleNames: any;
  
  @ViewChild('allSelected') private allSelected!: MatOption;
  constructor(
    private userService: UserService, 
    private studentsService: StudentsService,
    private courseService: CourseService,
    private classService: ClassService,
    private adminService: AdminService,
    public utils: UtilsService,
    private fb: FormBuilder,) {
      this.coursePaginationModel = {};
      this.reportForm = this.fb.group({
        users: ['', [ ...this.utils.validators.noLeadingSpace]],
        program: ['', [ ...this.utils.validators.noLeadingSpace]],
        course: ['', [ ...this.utils.validators.noLeadingSpace]],
        department: ['', [ ...this.utils.validators.noLeadingSpace]],
        userGroupId: ['', [ ...this.utils.validators.noLeadingSpace]],
        role: ['', [ ...this.utils.validators.noLeadingSpace]],
        sessionStartDate: ['', [ ...this.utils.validators.noLeadingSpace]],
        sessionEndDate: ['', [ ...this.utils.validators.noLeadingSpace]],
  
      });
     }

  ngOnInit(): void {
    this.getDepartments();
    this.getAllUsers();
    this.getProgramList();
    this.getAllCourses();
    this.getUserGroups();
    this.getAllRoles();
    forkJoin({
      courses: this.classService.getAllCoursesTitle('active'),
      programs: this.courseService.getPrograms({ ...this.coursePaginationModel,status: 'active'}),
    }).subscribe((response) => {
      this.programList = response.programs;
      this.courseList = response.courses.reverse();
    });
  }
  generateReport(): void {
    const reportData = {
      payRunDate: this.payRunDate,
      position: this.position,
      department: this.department
    };
    const csvContent = this.convertToCSV(reportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv'; 
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private convertToCSV(data: any): string {
    let csv = 'Pay Run Date,Position,Department\n';
    csv += `${data.payRunDate},${data.position},${data.department}\n`;
    return csv;
  }
  onSelectionChange(event: any, field: any) {
    if (field == 'course') {
      this.selectedCourses = event.value;
    }
    if (field == 'program') {
      this.selectedPrograms = event.value;
    }
    if (field == 'users') {
      this.selectedUsers = event.value;
    }
    
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.reportForm.controls['userGroupId']
        .patchValue([...this.userGroups.map(item => item.id)]);
    } else {
      this.reportForm.controls['userGroupId'].patchValue([]);
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response?.results;
    });
  }
  getProgramList(filters?: any) {
    this.courseService.getAllPrograms({...this.coursePaginationModel}).subscribe(
      (response: any) => {
        this.programData = response.docs;
      },
    );
  }
  getAllCourses() {
    this.courseService.getAllCoursesWithPagination().subscribe(response => {
      this.courseData = response.data.docs;
    })
  }
  getDepartments() {
    this.studentsService.getAllDepartments().subscribe((response: any) => {
      this.dept = response.data.docs;
    });
  }
  getUserGroups() {
    this.userService.getUserGroups().subscribe((response: any) => {
      this.userGroups = response.data.docs;
    });
  }
  getAllRoles(filters?: any) {
    this.adminService.getUserTypeList({ 'allRows':true }).subscribe(
      (response: any) => {
        this.roleNames = response;
      },
      (error) => {
      }
    );
  }

}
