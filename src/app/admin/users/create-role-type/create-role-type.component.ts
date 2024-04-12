import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoursePaginationModel } from '@core/models/course.model';
import { MenuItemModel, UserType } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import { LogoService } from 'app/student/settings/logo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-role-type',
  templateUrl: './create-role-type.component.html',
  styleUrls: ['./create-role-type.component.scss'],
})
export class CreateRoleTypeComponent {
  userTypeFormGroup!: FormGroup;
  dataSource!: MatTableDataSource<MenuItemModel>;
  dataSourceArray: MenuItemModel[] = [];
  userType!: UserType;
  allMenus = {
    checked: false,
    indeterminate: false,
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateRoleTypeComponent>,
    private adminService: AdminService,
    private logoService: LogoService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemModel[]
  ) {
    this.userTypeFormGroup = this.fb.group({
      typeName: ['', []],
    });
    this.dataSourceArray = this.data;
    this.dataSource = new MatTableDataSource<MenuItemModel>(this.data);
  }

  setChecked(
    obj: any[],
    data: { isAllCheck?: any; checked: any; menu_id?: any },
    parent?: { indeterminate: any; checked: boolean } | undefined
  ) {
    const { menu_id, checked, isAllCheck } = data;
    return obj.map((v) => {
      let res: any = {
        ...v,
      };
      let menuItemChecked = v.checked || false;
      if (v.id === menu_id || isAllCheck) {
        menuItemChecked = checked;
        res = {
          ...res,
          checked: menuItemChecked,
          indeterminate: false,
        };
      } else if (v?.isLeaf && !parent?.indeterminate) {
        menuItemChecked = parent?.checked || false;
      }
      res = {
        ...res,
        checked: menuItemChecked,
      };
      const children =
        v?.children && v?.children.length
          ? this.setChecked(v.children, { menu_id, checked }, res)
          : [];
      if (children && children.length) {
        res = {
          ...res,
          children,
        };
        const anyChildUnChecked = children.some(
          (child: { checked: any }) => !child.checked
        );
        const anyChildChecked = children.some(
          (child: { checked: any }) => child.checked
        );
        const anyChildIndeterminate = children.some(
          (child: { indeterminate: any }) => child.indeterminate
        );
        if (v.id != menu_id && !res.checked)
          res.checked = !anyChildUnChecked ? true : false;
        res.indeterminate =
          (anyChildChecked && anyChildUnChecked) || anyChildIndeterminate;
        if (res.indeterminate) res.checked = false;
      }
      return res;
    });
  }

  changeMenuChecked(checked?: any, id?: any) {
    this.dataSourceArray = this.setChecked(this.dataSourceArray, {
      menu_id: id,
      checked,
    });
    const indeterminate = this.dataSourceArray.some((v) => !v.checked);
    this.allMenus = {
      checked: indeterminate ? false : checked,
      indeterminate,
    };
    this.dataSource = new MatTableDataSource<MenuItemModel>(
      this.dataSourceArray
    );
    this.cd.detectChanges();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  confirmSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create Role Type!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createUserType();
      }
    });
  }

  createUserType() {
    let formData = this.userTypeFormGroup.getRawValue();
    this.adminService.createUserType(formData).subscribe(
      (response) => {
        this.setRolePermission(response)
      },
      (error: { message: any; error: any }) => {
        Swal.fire('Role Exists Already', error.message || error.error, 'error');
      }
    );
  }

  getCheckedItems(obj: any) {
    return obj.map((item: { checked: any; children: string | any[] }) => {
      if (item.checked) return item;
      if (item?.children?.length) {
        const children = this.getCheckedItems(item.children).filter(
          (v: any) => v
        );
        if (children.length)
          return {
            ...item,
            children,
          };
      }
      return null;
    });
  }

  setRolePermission(userType: UserType) {
    let selectedMenuItems = [];
    let formData: any = { typeName: userType?.typeName, menuItems: [] };
    const typeId = userType?._id;
    selectedMenuItems = this.getCheckedItems(this.dataSourceArray).filter(
      (v: any) => v
    );
    formData.menuItems = selectedMenuItems;
    this.adminService.updateUserType(formData, typeId).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'User Type added succesfully',
          icon: 'success',
        });
        this.dialogRef.close(userType);
      },
      (error: { message: any; error: any }) => {
        Swal.fire(
          'Failed to update Role',
          error.message || error.error,
          'error'
        );
      }
    );
  }
}
