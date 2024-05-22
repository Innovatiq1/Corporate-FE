import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { SettingsService } from '@core/service/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-approval-workflow',
  templateUrl: './view-approval-workflow.component.html',
  styleUrls: ['./view-approval-workflow.component.scss']
})
export class ViewApprovalWorkflowComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Approval Flow'],
      active: 'View Approval Flow',
    },
  ];

  approvalDataById: any;
  dataSource: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  response: any;
  approvalId: any;
  approvers: any;
  
  constructor(
    private settingsService: SettingsService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.coursePaginationModel = {};
    this.activatedRoute.params.subscribe((params: any) => {
      console.log("params.id", params.id)
      this.approvalId = params.id;
    

    });
  }
  ngOnInit(): void {
    
    this.getApprovalFlow();
    if (this.approvalId) {
      this.activatedRoute.params.subscribe((params: any) => {
        
        this.approvalId = params.id;
        this.getApprovalByID(this.approvalId);
      });
    }
  }

  getApprovalFlow(): void {
    this.settingsService.getApprovalFlow({ ...this.coursePaginationModel }).subscribe( (response) => {
          this.dataSource = response.data.docs;
        },
        (error) => {
          console.error('Failed to fetch approval flow:', error);
        }
      );
  }
  getApprovals(id: string): void {
    
    this.getApprovalByID(id);
  }
  getApprovalByID(id: string) {
    this.settingsService.getApprovalFlowById(id).subscribe((response: any) => {
      this.approvalDataById = response?._id;
      this.response = response;
      this.approvers = response.Approver;
    
    });
  }
  edit(id:any){
    this.router.navigate(['/student/settings/edit-approval-flow/'+ id]);
  }

  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this Approval flow?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteApprovalFlow(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Approval flow deleted successfully",
              icon: "success",
            });
            
            // this.fetchSubCategories();
            this.router.navigateByUrl("/student/settings/approval-workflow") 
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete Approval flow",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
  }
}
