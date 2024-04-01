import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSource } from '@core/enums/image-upload-source.enum';
import { CoursePaginationModel } from '@core/models/course.model';
import { MenuItemModel, UserType } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import { UtilsService } from '@core/service/utils.service';
import { MENU_LIST } from '@shared/menu-item';
import { LogoService } from 'app/student/settings/logo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user-type',
  templateUrl: './create-user-type.component.html',
  styleUrls: ['./create-user-type.component.scss']
})
export class CreateUserTypeComponent {

  breadscrums = [
    {
      title: 'Create User Role',
      items: ['Users'],
      active: 'Create User Role',
    },
  ];

  submitted: boolean = false
  isLoading = false;
  mode!: String;
  id: any;
  userTypeFormGroup!: FormGroup;
  userType!: UserType;
  documentList = [];
  authorImageList = [];
  imageSource = ImageSource;
  menu_items = []
  isNext: boolean = false;
  isNext1: boolean = false;
  isEdit: boolean = false;
  // createUser :boolean = false;
  dataSource!: MatTableDataSource<MenuItemModel>;
  dataSourceArray: MenuItemModel[] = [];
  chilData: any[] = [];
  options: any[] = [];
  allMenus = {
    checked: false,
    indeterminate: false
  };
  displayedColumns: string[] = ["menu", "subMenu"];
  editUrl!: boolean;
  typesList: any;
  coursePaginationModel: Partial<CoursePaginationModel>;
  paramId: any;
  type: any;
  admin: any;
  userTypeNames: any;


  constructor(public router: ActivatedRoute, private fb: FormBuilder, private adminService: AdminService,
    private cd: ChangeDetectorRef, private route: Router, public utils: UtilsService, private formBuilder: FormBuilder,
    private logoService: LogoService
  ) {
    this.router.queryParams.subscribe(params => {
      if (params['id']) {
        this.paramId = params['id']
        this.isEdit = true;
        this.getUserTypeList();
      }
    });
      this.userTypeFormGroup = this.fb.group({
        typeName: ['', []],
      });
    this.coursePaginationModel = {};

    if (this.isEdit === true) {
      this.breadscrums = [
        {
          title: 'Edit User Type',
          items: ['Users'],
          active: 'Edit User Type',
        },
      ];
    }
  }
  getUserTypeList(filters?: any) {
    this.adminService.getUserTypeList({ ...this.coursePaginationModel }).subscribe(
      (response: any) => {
        console.log(response)
        this.typesList = response.docs;
        let data = this.typesList.find((id: any) => id._id === this.paramId);
        if (data) {
          this.type = data.typeName
          this.userTypeFormGroup = this.fb.group({
            typeName: [{ value: this.type ? this.type : null, disabled: !this.isEdit }, [Validators.required,...this.utils.validators.title,...this.utils.validators.noLeadingSpace]],
          });

          data.menuItems.map((res: { id: any; checked: any }) => {
            this.changeMenuChecked(res.checked, res.id)
          })
        }

        this.cd.detectChanges();
      },
      (error) => {
      }
    );
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<MenuItemModel>(this.dataSourceArray);
    this.getAllUserTypes();
    this.initMenuItemsV2();
  }
  onSubmitForm() {
    this.submitted = true
    this.userTypeFormGroup.markAllAsTouched();
    let formData = this.userTypeFormGroup.getRawValue();
    this.isLoading = true;
    let selectedMenuItems = []
    selectedMenuItems = this.getCheckedItems(this.dataSourceArray).filter((v: any) => v);
    formData.menuItems = selectedMenuItems;
    this.updateUserType(formData).then((response: any) => {
    }).catch((e: any) => {
    })
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


  // addUserType(formObj: any): any {
  //   return new Promise((resolve, reject) => {
  //     this.adminService.createUserType(formObj).subscribe(
  //       (response: unknown) => {
  //         this.isLoading = false;
  //         Swal.fire({
  //           title: 'Successful',
  //           text: 'User Type created succesfully',
  //           icon: 'success',
  //         });
  //         resolve(response)
  //         this.route.navigate(['/admin/users/user-type']);
  //       },
  //       (error: { message: any; error: any; }) => {
  //         this.isLoading = false;
  //         Swal.fire(
  //           'Failed to create user Type',
  //           error.message || error.error,
  //           'error'
  //         );
  //         reject(error)
  //       }
  //     );
  //   })
  // }

  updateUserType(obj: any): any {
    return new Promise((resolve, reject) => {
      if (this.isEdit === false) {
        let formData = this.userTypeFormGroup.getRawValue();
        let typeName = formData.typeName
        this.adminService.getUserTypeList({ ...this.coursePaginationModel }).subscribe(
          (response: any) => {
            let userTypes = response.docs.filter((item: { typeName: any; }) => item.typeName === typeName);
            this.paramId = userTypes[0].id
            this.adminService.updateUserType(obj, this.paramId).subscribe(
              (response: unknown) => {
                Swal.fire({
                  title: 'Successful',
                  text: 'Menu added succesfully',
                  icon: 'success',
                })
                resolve(response);
                this.route.navigate(['/admin/users/user-type']);
              },
              (error: { message: any; error: any; }) => {
                this.isLoading = false;
                Swal.fire(
                  'Failed to update user Type',
                  error.message || error.error,
                  'error'
                );
                reject(error)
              });
          });
      } else if (this.isEdit === true) {
        console.log('obg',obj)
        this.adminService.updateUserType(obj, this.paramId).subscribe(
          (response: unknown) => {
            this.isLoading = false;
            if (this.isEdit === true) {
              Swal.fire({
                title: 'Successful',
                text: 'User Type updated succesfully',
                icon: 'success',
              })
            }
            resolve(response);
            this.route.navigate(['/admin/users/user-type']);
          },
          (error: { message: any; error: any; }) => {
            this.isLoading = false;
            Swal.fire(
              'Failed to update user Type',
              error.message || error.error,
              'error'
            );
            reject(error)
          }
        );
      }
    })

  }
  getAllUserTypes(filters?: any) {
    this.adminService.getUserTypeList({ 'allRows':true }).subscribe(
      (response: any) => {
        this.userTypeNames = response;
      },
      (error) => {
      }
    );
  }



  initMenuItemsV2() {
    this.logoService.getSidemenu().subscribe((response: any) => {
    // let MENU_LIST = response.data.docs[0].MENU_LIST
    const items = this.convertToMenuV2(MENU_LIST, this.userType?.menuItems);
    items?.forEach((item, index) => {
      if (!this.dataSourceArray.some(v => v.id === item.id))
        this.dataSourceArray.push(item);
    });

    this.dataSource = new MatTableDataSource<MenuItemModel>(this.dataSourceArray);
    this.cd.detectChanges();
  })
  }

  updateMenuItem(item: { checked: any; id: any; children: any[]; }) {
    if (typeof item === "object" && item.checked) {
      this.changeMenuChecked(item.checked, item.id)
    }
    if (item?.children?.length) {
      item.children.forEach((element: any) => {
        this.updateMenuItem(element)
      });

    }
  }

  checkChecked(items: any[], id: string) {
    return items?.find(v => v.id === id)
  }

  convertToMenuV2(obj: any[], value: any): MenuItemModel[] {
    return obj.map(v => {
      const menu_item = this.checkChecked(value, v?.id)
      const children = v?.children && v?.children.length ? this.convertToMenuV2(v.children, menu_item?.children) : []
      const defaultCheck = this.checkChecked(value, v.id)
      let res: any = {
        title: v?.title,
        id: v?.id,
        children: [],
        checked: defaultCheck?.checked || false,
        indeterminate: defaultCheck?.indeterminate || false,
        icon: v?.icon

      };
      if (children && children.length) {
        res = {
          ...res,
          children
        }
        res.children = res.children.map((c: any) => ({
          ...c,
          isLeaf: true
        }))
      }
      if (v?.actions && v?.actions?.length) {
        const actionChild = v?.actions.map((action: any) => {
          const actionChecked = this.checkChecked(menu_item?.children, `${v.id}__${action}`)
          return {
            title: action,
            id: `${v.id}__${action}`,
            isAction: true,
            _id: action,
            isLeaf: true,
            checked: actionChecked?.checked || false,
            indeterminate: actionChecked?.indeterminate || false,
            icon: actionChecked?.icon
          }
        })
        res = {
          ...res,
          children: actionChild
        }
      }
      return res;
    })
  }

  changeMenuChecked(checked?: any, id?: any) {
    this.dataSourceArray = this.setChecked(this.dataSourceArray, { menu_id: id, checked });
    const indeterminate = this.dataSourceArray.some(v => !v.checked);
    this.allMenus = {
      checked: indeterminate ? false : checked,
      indeterminate
    }
    this.dataSource = new MatTableDataSource<MenuItemModel>(this.dataSourceArray);
    this.cd.detectChanges();
  }

  setChecked(obj: any[], data: { isAllCheck?: any; checked: any; menu_id?: any; }, parent?: { indeterminate: any; checked: boolean; } | undefined) {
    const { menu_id, checked, isAllCheck } = data
    return obj.map(v => {
      let res: any = {
        ...v
      };
      let menuItemChecked = v.checked || false;
      if (v.id === menu_id || isAllCheck) {
        menuItemChecked = checked;
        res = {
          ...res,
          checked: menuItemChecked,
          indeterminate: false,
        }
      } else if (v?.isLeaf && !parent?.indeterminate) {
        menuItemChecked = parent?.checked || false;
      }
      res = {
        ...res,
        checked: menuItemChecked
      }
      const children = v?.children && v?.children.length ? this.setChecked(v.children, { menu_id, checked, }, res) : []
      if (children && children.length) {
        res = {
          ...res,
          children
        }
        const anyChildUnChecked = children.some((child: { checked: any; }) => !child.checked);
        const anyChildChecked = children.some((child: { checked: any; }) => child.checked);
        const anyChildIndeterminate = children.some((child: { indeterminate: any; }) => child.indeterminate)
        if (v.id != menu_id && !res.checked)
          res.checked = !anyChildUnChecked ? true : false;
        res.indeterminate = (anyChildChecked && anyChildUnChecked) || anyChildIndeterminate;
        if (res.indeterminate)
          res.checked = false;
      }
      return res;
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

  get subcategories(): FormArray {
    return this.userTypeFormGroup.get('subcategories') as FormArray;
  }


}
