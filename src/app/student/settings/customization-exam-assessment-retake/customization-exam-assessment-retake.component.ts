import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '@core/service/course.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StudentsService } from 'app/admin/students/students.service';
@Component({
  selector: 'app-customization-exam-assessment-retake',
  templateUrl: './customization-exam-assessment-retake.component.html',
  styleUrls: ['./customization-exam-assessment-retake.component.scss']
})
export class CustomizationExamAssessmentRetakeComponent {
  breadscrums = [
    {
      title: 'Customization',
      items: ['Configuration'],
      active: 'Exam Retake',
    },
  ];
  retakeCodes: string[] = ['1', '2', '3', '4', '5'];

  selectedRetake: string = "";
  dialogRef: any;
  studentId: any;
  configuration: any;
  configurationSubscription!: Subscription;
  defaultRetake: string = '';
 
  constructor(
    
    private courseService: CourseService,
    public dialog: MatDialog,
    private studentsService: StudentsService,
  ){}

  ngOnInit(): void { 
    this.getCurrency();
    this.loadData();
   }

   loadData(){
    this.studentId = localStorage.getItem('id')
    this.studentsService.getStudentById(this.studentId).subscribe(res => {
    })
  }
  
  getCurrency() : any {
    this.configurationSubscription = this.studentsService.configuration$.subscribe(configuration => {
      this.configuration = configuration;
      if (this.configuration?.length > 0) {
        this.defaultRetake = this.configuration[3].value;
        this.selectedRetake = this.defaultRetake
      }
    });
  }

  updateRetake() {
    const selectedRetake = this.selectedRetake;
    this.courseService.createExamAssessment({ value: selectedRetake }).subscribe(
      response => {
        Swal.fire({
          title: 'Successful',
          text: 'Exam Assessment Configuration Success',
          icon: 'success'
        });
        // dialogRef.close(selectedRetake);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomizationExamAssessmentRetakeComponent, {
      width: '500px',
      data: { selectedRetake: this.selectedRetake }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedRetake = result;
      }
    });
  }
}





