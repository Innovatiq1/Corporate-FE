import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from '@core/service/announcement.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  breadscrums = [
    {
      title: 'Announcement',
      items: ['Automation'],
      active: 'Announcement',
    },
  ];
  displayedColumns: string[] = [
    'Title',
    'Decription',
    'User Role',
    // 'Actions'
  ];
  dataSource: any;
  create = true;
  status = true;
  pageSizeArr = this.utils.pageSizeArr;
  totalItems: any;
  editUrl: any;
  isLoading = false;
  announcementData: any[] = [];



  onButtonClicked(card: any) {
    console.log('Button clicked for card:', card.title);
  }

  deleteAnnouncement(announcementId: any) {

    

    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed){
        this.announcementService.deleteAnnouncement(announcementId).subscribe((res: any) => {
          Swal.fire({
            title: 'Successful',
            text: "Announcement deleted successfully",
            icon: 'success',
          });
    
          this.activatedRoute.queryParams.subscribe(params => {
            this.getAnnouncementList(params);
          });
          this.cdr.detectChanges();
        });
      }
    });
    

  }



  edit(id: any) {
    this.router.navigate(['/Announcement/edit/' + id]);
  }
  toggleList() {
    this.create = !this.create;
  }

  toggleStatus() {
    this.status = !this.status;
  }

  constructor(private router: Router,
    public utils: UtilsService,
    private announcementService: AnnouncementService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,

  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAnnouncementList(params);
    });
  }

  getAnnouncementList(filter: any) {
    this.announcementService.getAnnouncementList(filter).subscribe((res: { data: { data: any[]; }; totalRecords: number; }) => {
      this.isLoading = false;
      this.dataSource = res.data.data;
      let limit = filter.limit ? filter.limit : 10
      if (res.totalRecords <= limit || res.totalRecords <= 0) {

        this.isLoading = true;
      }
      this.cdr.detectChanges();


      console.log("res====", res.totalRecords);

      this.cdr.detectChanges();
    })
  }
   // export table data in excel file
   exportExcel() {
    // key name with space add in brackets
    console.log("vv", this.dataSource);
    const exportData: Partial<TableElement>[] =
      this.dataSource.map((x: any) => ({
        'Title': x.subject,
        'User Role': x.announcementFor,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [[' Title','User Role']];
    
    const data = this.dataSource.map((x:any) =>
      [x.subject,
        x.announcementFor,
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
    doc.save('Announcement-list.pdf');
  }
}
