import { MatTableDataSource } from '@angular/material/table';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import { ClassModel, Session, Student, StudentApproval, StudentPaginationModel } from 'app/admin/schedule-class/class.model';
import { ClassService } from 'app/admin/schedule-class/class.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
//import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TableElement, TableExportUtil } from '@shared';
import { jsPDF } from 'jspdf';
import DomToImage from 'dom-to-image';
import { number } from 'echarts';
import { StudentService } from '@core/service/student.service';


@Component({
  selector: 'app-completion-list',
  templateUrl: './completion-list.component.html',
  styleUrls: ['./completion-list.component.scss']
})
export class CompletionListComponent {
  displayedColumns = [
    'select',
    'Course Name',
    'Student Name',
    'Start Date',
    'End Date',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Completion List',
    },
  ];
pdfData: any = [];
dafaultGenratepdf: boolean = false;
element: any;
certifiacteUrl:boolean = false;




  dataSource: any;
  pageSizeArr =[10,20];
  totalItems: any;
  studentPaginationModel: StudentPaginationModel;
  isLoading: boolean = true;
  searchTerm: string = '';
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  upload() {
    document.getElementById('input')?.click();
  }

  constructor(private classService: ClassService) {

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

     filterData() {
      console.log("data",this.dataSource)
      if(this.searchTerm){
      this.dataSource = this.dataSource?.filter((item: any) =>
      console.log(item.courseId?.title)

      // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      } else {
        // this.getCompletedClasses();

      }
    }
    performSearch() {
      if(this.searchTerm){
      this.dataSource = this.dataSource?.filter((item: any) =>{
        const searchList = (item.classId.courseId?.title + item.studentId?.name).toLowerCase()
        return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
      }


      // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      } else {
        this.getCompletedClasses();

      }
    }
    getCompletedClasses() {
      this.classService
        .getSessionCompletedStudent(this.studentPaginationModel.page, this.studentPaginationModel.limit)
        .subscribe((response: { docs: any; page: any; limit: any; totalDocs: any; }) => {
          // console.log("data",response)
          this.isLoading = false;
        this.studentPaginationModel.docs = response.docs;
        this.studentPaginationModel.page = response.page;
        this.studentPaginationModel.limit = response.limit;
        this.totalItems=response.totalDocs;
        this.dataSource = response.docs;
        this.dataSource.sort = this.matSort;
        this.mapClassList();
        })
    }

    mapClassList() {
      this.studentPaginationModel.docs.forEach((item: Student) => {
        const startDateArr: any = [];
        const endDateArr: any = [];
        item.classId.sessions.forEach((session: { sessionStartDate: { toString: () => string | number | Date; }; sessionEndDate: { toString: () => string | number | Date; }; }) => {
          startDateArr.push(new Date(session.sessionStartDate.toString()));
          endDateArr.push(new Date(session.sessionEndDate.toString()));
        });
        const minStartDate = new Date(Math.min.apply(null, startDateArr));
        const maxEndDate = new Date(Math.max.apply(null, endDateArr));
        item.classStartDate = !isNaN(minStartDate.valueOf()) ? moment(minStartDate).format("YYYY-DD-MM") : "";
        item.classEndDate = !isNaN(maxEndDate.valueOf()) ? moment(maxEndDate).format("YYYY-DD-MM") : "";
        item.registeredOn = item.registeredOn ? moment(item.registeredOn).format("YYYY-DD-MM") : "";
        item.studentId.name = `${item.studentId?.name} ${item.studentId?.last_name}`;
      });
    }

    getCurrentUserId(): string {
      return JSON.parse(localStorage.getItem("user_data")!).user.id;
    }

    complete(element: Student) {
      const item: StudentApproval = {
        approvedBy: this.getCurrentUserId(),
        approvedOn: moment().format("YYYY-MM-DD"),
        classId: element.classId._id,
        status: "completed",
        studentId: element.studentId.id,
        session: []
      };
      this.classService.saveApprovedClasses(element.id, item).subscribe((response:any) => {
        Swal.fire({
          title: 'Success',
          text: 'Course approved successfully.',
          icon: 'success',
          // confirmButtonColor: '#d33',
        });

        this.getCompletedClasses();
      });
      () => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to approve course. Please try again.',
              icon: 'error',
              // confirmButtonColor: '#d33',
            });
          };

    }

    getSessions(element: { classId: { sessions: any[]; }; }) {
      const sessions = element.classId?.sessions?.map((_: any, index: number) => {
        const session: Session = {} as Session;
        session.sessionNumber = index + 1;
        return session;
      });
      return sessions;
    }
    generatePdf() {
      const doc = new jsPDF();
      const headers = [['Course Name', 'Student Name', 'Start Date','End date']];
      const data = this.dataSource.map((user:any) =>
        [user.courseId?.title,
          user.studentId?.name,
          user.classStartDate,
         user.classEndDate,

      ] );
      //const columnWidths = [60, 80, 40];
      const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

      // Add a page to the document (optional)
      //doc.addPage();

      // Generate the table using jspdf-autotable
      (doc as any).autoTable({
        head: headers,
        body: data,
        startY: 20,



      });

      // Save or open the PDF
      doc.save('completion-list.pdf');
    }

    exportExcel() {
      //k//ey name with space add in brackets
     const exportData: Partial<TableElement>[] =
        this.dataSource.map((user:any) => ({
          CourseName:user.courseId?.title,
          StudentName:  user.studentId?.name,
          StartDate: user.classStartDate,
          EndDate: user.classEndDate,
        }));
      TableExportUtil.exportToExcel(exportData, 'excel');
    }
    generateCertificate(element: Student){
      Swal.fire({
        // title: "Updated",
        // text: "Course Kit updated successfully",
        // icon: "success",
        title: 'Certificate Generating...',
        text: 'Please wait...',
        allowOutsideClick: false,
        timer: 24000,
        timerProgressBar: true,
      });
      console.log("=========",element)
      this.dafaultGenratepdf = true;
      this.pdfData = [];
            let pdfObj = {
        title: element?.courseId?.title ,
        name: element?.studentId
        ?.name,
        //project_week: project_week,
        completdDate:moment().format('DD ddd MMM YYYY'),
        

      }
      this.pdfData.push(pdfObj);
      console.log(this.pdfData)
      var convertIdDynamic = 'contentToConvert'
      console.log(convertIdDynamic)
      const dashboard = document.getElementById('contentToConvert');
      console.log("==dashboard===",dashboard)
        //this.generatePdf1(dashboard, element?.studentId._id, element?.courseId._id,"course");
        this.genratePdf3(convertIdDynamic, element?.studentId._id, element?.courseId._id);
    

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
          //doc.save('Dashboard for hyperpanels.pdf');
  
          const pdfData = new File([doc.output("blob")], "courseCertificate.pdf", {
            type: "application/pdf",
          });
          
          this.classService.uploadFileApi(pdfData).subscribe((data:any) => {
            let objpdf = {
              pdfurl: data.inputUrl,
              memberId: memberId,
              CourseId: memberProgrmId,
            };
            
            this.updateCertificte(objpdf)
           
            
          },(err) => {
  
          }
          )
  
  
          
  
        });
        this.dafaultGenratepdf = false;
      }
      }, 1000);
    
    }
  
    
    updateCertificte(objpdf:any){
      this.classService.updateCertificateUser(objpdf).subscribe(
        (response) => {
          if(response.data.certifiacteUrl){
            this.certifiacteUrl=true

          }
          
          this.getCompletedClasses();
          //let certifiacteUrl =response.data.certifiacteUrl

          console.log()
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
   


}
