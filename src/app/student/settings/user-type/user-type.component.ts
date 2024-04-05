import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { UserType } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent {
  breadscrums = [
    {
      title: 'User Role',
      items: ['Users'],
      active: 'User Role',
    },
  ];
  modal:boolean = false;
  admin:boolean = false;
  isNext : boolean = false;
  isNext1 : boolean = false;
  isCreate:boolean = false;
  coursePaginationModel: Partial<CoursePaginationModel>;
  typesList: any;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  isLoading = true;
  
  constructor(public router: Router,private adminService:AdminService,   private userService: UserService, 
    private ref: ChangeDetectorRef,
    public utils: UtilsService
    ){
      this.getUserTypeList();
      this.coursePaginationModel = {};
    }
  
   
    cancelModal() {
      this.modal = false;
    }
    edit(id:any){
      this.router.navigate(['/admin/users/edit-user-type'],{queryParams:{id:id}});
    // this.router.navigate(['/Users/Type/edit'],{queryParams:{id:id}});
    }
  
    changeInActive(dataDetails: UserType): void {
      dataDetails.status = "inactive";
      this.userService.updateUserType(dataDetails).subscribe(
        () => {
          Swal.fire({
            title: "Success",
            text: "UserType moved to Inactive.",
            icon: "success",
          });
          this.getUserTypeList({});
        },
        (error) => {
          console.error(error, "result_error");
          Swal.fire({
            title: "Error",
            text: "UserType attached to  User. Cannot Make Inactive.",
            icon: "error",
          });
          this.getUserTypeList({});

        }
      );
    }
    changeActive(dataDetails: UserType): void {
      dataDetails.status = "active";
      this.userService.updateUserType(dataDetails).subscribe(
        () => {
          Swal.fire({
            title: "Success",
            text: "UserType moved to Active.",
            icon: "success",
          });
          this.getUserTypeList({});
        },
        (error) => {
          console.error(error, "result_error");
        }
      );
    }
    delete(data: any) {
      console.log('data',data)

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
          this.userService.deleteUserType(data.id,data.typeName).subscribe(() => {
            Swal.fire({
              title: 'Success',
              text: 'Usertype deleted successfully.',
              icon: 'success',
            });
            this.getUserTypeList({});
  
          },
          (error) => {
            Swal.fire({
              title: "Error",
              text: "UserType attached to  User. Cannot Delete.",
              icon: "error",
            });
            this.getUserTypeList({});
  
          }
  );
        }
      });
        
    }
    
  


  

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getUserTypeList();
  }

  getUserTypeList(filters?:any) {
    this.adminService.getUserTypeList( {...this.coursePaginationModel}).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.totalItems = response.totalDocs
        this.typesList = response.docs;
        let limit = filters?.limit ? filters?.limit : 10;
        if (response.totalDocs <= limit || response.totalDocs <= 0) {
        }
        this.ref.detectChanges();
      },
      (error) => {
      }
    );
  }
}
