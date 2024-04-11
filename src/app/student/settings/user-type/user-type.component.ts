import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CourseModel, CoursePaginationModel } from '@core/models/course.model';
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

  displayedColumns = [
    
    'User Role',
    'Accessbility Module',
    'Sub Module',
    'Status',
    'actions'
  ];
  breadscrums = [
    {
      title: 'Role',
      items: ['Users'],
      active: 'Role',
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
  selection = new SelectionModel<UserType>(true, []);
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
menu: any;
last: any;
  
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
            text: "Role moved to Inactive.",
            icon: "success",
          });
          this.getUserTypeList({});
        },
        (error) => {
          console.error(error, "result_error");
          Swal.fire({
            title: "Error",
            text: "Role attached to  User. Cannot Make Inactive.",
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
            text: "Role moved to Active.",
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
              text: 'Role deleted successfully.',
              icon: 'success',
            });
            this.getUserTypeList({});
  
          },
          (error) => {
            Swal.fire({
              title: "Error",
              text: "Role attached to  User. Cannot Delete.",
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
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;

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
        this.selection.selected.forEach((item) => {
          const index: number = this.typesList.renderedData.findIndex(
            (d: UserType) => d === item
          );
          // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
          // this.exampleDatabase?.dataChange.value.splice(index, 1);
          this.refreshTable();
          this.selection = new SelectionModel<UserType>(true, []);
        });
        Swal.fire({
          title: 'Success',
          text: 'Record Deleted Successfully...!!!',
          icon: 'success',
          // confirmButtonColor: '#526D82',
        });
      }
    });
   
    // this.showNotification(
    //   'snackbar-danger',
    //   totalSelect + ' Record Delete Successfully...!!!',
    //   'bottom',
    //   'center'
    // );
  }
}
