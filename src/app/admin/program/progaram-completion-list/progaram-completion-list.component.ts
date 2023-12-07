import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Student, StudentApproval, StudentPaginationModel } from '@core/models/class.model';
import { UtilsService } from '@core/service/utils.service';
import { TableElement } from '@shared/TableElement';
import { TableExportUtil } from '@shared/tableExportUtil';
import { ClassService } from 'app/admin/schedule-class/class.service';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import DomToImage from 'dom-to-image';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progaram-completion-list',
  templateUrl: './progaram-completion-list.component.html',
  styleUrls: ['./progaram-completion-list.component.scss']
})
export class ProgaramCompletionListComponent {
  displayedColumns = [
    'select',
    'Program Name',
    'Student Name',
    'Class Start Date',
    'Class End Date',
    'actions',
  ];
  breadscrums = [
    {
      items: ['Program'],
      active: 'Program Completion List',
    },
  ];
  dataSource : any;
  completionList: any;
  pageSizeArr =this.utils.pageSizeArr;
  totalItems: any;
  studentPaginationModel: StudentPaginationModel;
  isLoading: any;
  searchTerm:string = '';
  dafaultGenratepdf: boolean = false;
element: any;
certificateUrl:boolean = false;
pdfData: any = [];


  constructor(private classService: ClassService,private utils:UtilsService) {


    this.studentPaginationModel = {} as StudentPaginationModel;
  }

    ngOnInit(): void {
      this.getCompletedClasses();
    }

    pageSizeChange($event: any) {
      this.studentPaginationModel.page= $event?.pageIndex + 1;
      this.studentPaginationModel.limit= $event?.pageSize;
      this.getCompletedClasses();
     }
  upload() {
    document.getElementById('input')?.click();
  }

  getCompletedClasses() {
    this.classService
      .getProgramCompletedStudent(this.studentPaginationModel.page, this.studentPaginationModel.limit)
      .subscribe((response: { docs: any; page: any; limit: any; totalDocs: any; }) => {
        this.isLoading = false;
      this.studentPaginationModel.docs = response.docs;
      this.studentPaginationModel.page = response.page;
      this.studentPaginationModel.limit = response.limit;
      this.totalItems=response.totalDocs;
      this.dataSource= response.docs;
      })
  }
  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem("user_data")!).user.id;
  }

  changeStatus(element: Student) {
    let item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format("YYYY-MM-DD"),
      classId: element.classId._id,
      status: "completed",
      studentId: element.studentId.id,
      session: []
    };


    this.classService.saveApprovedProgramClasses(element.id, item).subscribe((response:any) => {
      Swal.fire({
        title: 'Success',
        text: 'Program approved successfully.',
        icon: 'success',
        // confirmButtonColor: '#526D82',
      });

      this.getCompletedClasses();
    });
    () => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to approve course. Please try again.',
            icon: 'error',
            // confirmButtonColor: '#526D82',
          });
        };

  }

  performSearch() {
    if(this.searchTerm){
    this.dataSource = this.dataSource?.filter((item: any) =>{
      const searchList = (item.program_name + item.studentId?.name).toLowerCase()
      return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
    }


    // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    } else {
      this.getCompletedClasses();

    }
  }
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((x: { program_name: any; student_name: any; classStartDate: string | number | Date; classEndDate: string | number | Date; registeredOn: string | number | Date; })=>({
        "Program Name": x.program_name,
        "Student Name": x.student_name,
        'Class Start Date': formatDate(new Date(x.classStartDate), 'yyyy-MM-dd', 'en') || '',
        'Class End Date': formatDate(new Date(x.classEndDate), 'yyyy-MM-dd', 'en') || '',
        'Registered Date': formatDate(new Date(x.registeredOn), 'yyyy-MM-dd', 'en') || '',
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generateCertificate(element: Student){
    Swal.fire({
      title: 'Certificate Generating...',
      text: 'Please wait...',
      allowOutsideClick: false,
      timer: 40000,
      timerProgressBar: true,
    });
    this.dafaultGenratepdf = true;
    this.pdfData = [];
          let pdfObj = {
      title: element?.programId?.title ,
      name: element?.studentId
      ?.name,
      completdDate:moment().format('DD ddd MMM YYYY'),
    }
    this.pdfData.push(pdfObj);
    var convertIdDynamic = 'contentToConvert'
    const dashboard = document.getElementById('contentToConvert');
      this.genratePdf3(convertIdDynamic, element?.studentId._id, element?.programId._id);
  }
  
  genratePdf3(convertIdDynamic: any, memberId: any, memberProgrmId: any) {
    this.dafaultGenratepdf = true;
    setTimeout(() => {
      const dashboard = document.getElementById(convertIdDynamic);
      if(dashboard!=null){
      const dashboardHeight = dashboard.clientHeight;
      const dashboardWidth = dashboard.clientWidth;
      const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };
      DomToImage.toPng(dashboard, options).then((imgData) => {
        const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const currentDateTime = moment();
        const randomString = this.generateRandomString(10);
        const pdfData = new File([doc.output("blob")], randomString+"programCertificate.pdf", {
          type: "application/pdf",
        });
        
        this.classService.uploadFileApi(pdfData).subscribe((data:any) => {
          let objpdf = {
            pdfurl: data.inputUrl,
            memberId: memberId,
            CourseId: memberProgrmId,
          };
          
          this.updateCertificate(objpdf)
         
          
        },(err) => {

        }
        )
      });
      this.dafaultGenratepdf = false;
    }
    }, 1000);
  
  }
  generateRandomString(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }  

  
  updateCertificate(objpdf:any){
    this.classService.updateProgramCertificateUser(objpdf).subscribe(
      (response) => {
        if(response.data.certificateUrl){
          this.certificateUrl=true
        }
        
        this.getCompletedClasses();
        Swal.fire({
          title: "Updated",
          text: "Certificate Created successfully",
          icon: "success",
        });

      },
      (err) => {

      },
    )

  }

  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Program Name', 'Student Name', 'Class Start Date','Class End Date','Registered Date']];
    const data = this.dataSource.map((user: {
      program_name: any; student_name: any; classStartDate: any; classEndDate: any; registeredOn: any;
    }, index: any) => [user.program_name, user.student_name,

      formatDate(new Date(user.classStartDate), 'yyyy-MM-dd', 'en') || '',
      formatDate(new Date(user.classEndDate), 'yyyy-MM-dd', 'en') || '',
      formatDate(new Date(user.registeredOn), 'yyyy-MM-dd', 'en') || '',


    ]);
    //const columnWidths = [60, 80, 40];
    const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,



    });
    doc.save('student-completion.pdf');
  }

}
