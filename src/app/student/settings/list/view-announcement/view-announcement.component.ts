import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from '@core/service/announcement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss']
})
export class ViewAnnouncementComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Announcement'],
      active: 'View Announcement',
    },
  ];

  aboutData1!: any;
  subscribeParams: any;
  departmentId: any;
  id?: number;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private announcementService: AnnouncementService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.departmentId = params.id;
    });
  }
  ngOnInit() {
    // this.loadData();
    this.loadData()
  }

  loadData(){
  this.announcementService.getAnnouncementById(this.departmentId).subscribe((response:any)=>{
    this.aboutData1 = response.data.data;
   

  })
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
          this.loadData();
          window.history.back();
        });
        this.cdr.detectChanges();
      });
    }
  });
  

}

}
