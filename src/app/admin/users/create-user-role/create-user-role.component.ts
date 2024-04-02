import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItemModel } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user-role',
  templateUrl: './create-user-role.component.html',
  styleUrls: ['./create-user-role.component.scss']
})
export class CreateUserRoleComponent {
  userTypeFormGroup!: FormGroup;
  dataSourceArray: MenuItemModel[] = [];
  isLoading = false;
  userTypeNames: any;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminService){

  }

  breadscrums = [
    {
      title: 'Admin',
      items: ['Admin'],
      active: ' ',
    },
  ];


  getAllUserTypes(filters?: any) {
    this.adminService.getUserTypeList({ 'allRows':true }).subscribe(
      (response: any) => {
        this.userTypeNames = response;
      },
      (error) => {
      }
    );
  }

  createUserType(): any {
    let formData = this.userTypeFormGroup.getRawValue();
    let selectedMenuItems = []
    selectedMenuItems = this.getCheckedItems(this.dataSourceArray).filter((v: any) => v);
    formData.menuItems = selectedMenuItems;

    return new Promise((resolve, reject) => {
      this.adminService.createUserType(formData).subscribe(
        (response: unknown) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User Type created succesfully.Add menu by selecting the user type from existing user types',
            icon: 'success',
          });
          this.userTypeFormGroup.reset();
          this.getAllUserTypes()
          resolve(response)
        },
        (error: any) => {
          this.isLoading = false;
          Swal.fire(
            error,
            error.message || error.error,
            'error'
          );
          reject(error)
        }
      );
    })
  }

  getCheckedItems(obj: any) {
    return obj.map((item: { checked: any; children: string | any[]; }) => {
      if (item.checked)
        return item
      if (item?.children?.length) {
        const children = this.getCheckedItems(item.children).filter((v: any) => v);
        if (children.length)
          return {
            ...item,
            children
          }
      }
      return null;
    })
  }

}
