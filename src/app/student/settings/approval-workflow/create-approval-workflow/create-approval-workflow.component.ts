import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel, SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { SettingsService } from '@core/service/settings.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-approval-workflow',
  templateUrl: './create-approval-workflow.component.html',
  styleUrls: ['./create-approval-workflow.component.scss']
})
export class CreateApprovalWorkflowComponent implements OnInit{
 
  approvalForm!: FormGroup;
  editUrl: any;
  subscribeParams: any;
  categoryId: any;   

  breadscrums = [
    {
      title: 'Create Categories',
      items: ['Approval flow'],
      active: 'Create Approval flow',
    },
  ];

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    public utils:UtilsService,
    private activatedRoute: ActivatedRoute, 
  ){
    let urlPath = this.router.url.split('/')

    this.editUrl = urlPath.includes('edit-categories');



    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit Categories',
          items: ['Settings'],
          active: 'Edit Categories',
        },
      ];
    }


     
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.categoryId = params.id;
  });
}

  ngOnInit(): void {
    this.approvalForm = this.formBuilder.group({
      title: ['', Validators.required],
      approver: this.formBuilder.array([]),
      level: ['', Validators.required], 
    });
    this.addApprover();
  }
  get approver(): FormArray {
    return this.approvalForm.get('approver') as FormArray;
  }
  addApprover() {
    const approvalForm = this.formBuilder.group({      
      approvers: ['', Validators.required] 
      });    
      this.approver.push(approvalForm);
  }

  deleteApprover(index: number): void {
      this.approver.removeAt(index);
    }

  submit(){
    console.log('update', this.approvalForm);
    if (this.approvalForm.valid) {
      const approvalData = this.approvalForm.value;
      console.log('updateddddd', this.approvalForm.valid);
      const payload = {
        title: approvalData?.title,
        level: approvalData?.level, 
        Approver: approvalData.approver.map((menulist: any) => ({
          approvers: menulist?.approvers,
        })),
        id: this.categoryId,
      };

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to create this Approval flow!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.settingsService.saveApprovalFlow(payload).subscribe((response: any) => {
              Swal.fire({
                title: 'Successful',
                text: 'Student dashboard created successfully',
                icon: 'success',
              });
              this.router.navigate(['/student/settings/approval-workflow']);
            });

        }
      });
    }
  }
  update(){
    console.log('update', this.approvalForm);
    if (this.approvalForm.valid) {
      const approvalData = this.approvalForm.value;
      console.log('updateddddd', this.approvalForm.valid);
      const payload = {
        title: approvalData?.title,
        level: approvalData?.level, 
        Approver: approvalData.approver.map((menulist: any) => ({
          approvers: menulist?.approvers,
        })),
        id: this.categoryId,
      };

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to create this Approval flow!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.settingsService.updateApprovalFlow(payload).subscribe((response: any) => {
              Swal.fire({
                title: 'Successful',
                text: 'Student dashboard created successfully',
                icon: 'success',
              });
              this.router.navigate(['/student/settings/approval-workflow']);
            });

        }
      });
    }
  }
  // createSubCategory(): void {
  //   this.isSubmitted=true;
   
  //   this.subCategoryData = this.subcategories.value;
  //   this.subCategoryData.forEach(subcategory => {
  //     subcategory.main_category_id = this.mainCategoryId;
  //   });
  //   console.log("create",this.subCategoryData)
  //   if(this.subCategoryData[0].category_name !==''){
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'Do you want to create sub category!',
  //       icon: 'warning',
  //       confirmButtonText: 'Yes',
  //       showCancelButton: true,
  //       cancelButtonColor: '#d33',
  //     }).then((result) => {
  //       if (result.isConfirmed){
  //         this.courseService.createSubCategory(this.subCategoryData).subscribe(
  //           (response) => {
  //             Swal.fire('Success', 'Subcategories created successfully!', 'success');
  //             this.mainCategoryForm.reset();
  //             this.subCategoryForm.reset();
  //             this.initSubCategoryForm();
  //             this.addSubCategoryField();
  //             this.router.navigate(['/student/settings/categories'])
  //           },
  //           (error) => {
  //             Swal.fire('Error', 'Failed to create subcategories!', 'error');
  //           }
  //         );
  //       }
  //     });
  //   }
  
    
   
  //   this.isSubmitted=false
  // }


  // getData(){
  //   this.courseService.getcategoryById(this.categoryId).subscribe((response: any) => {
  //     if(response){
  //       this.mainCategoryId=response?._id
  //       this.mainCategoryForm.patchValue({
  //         category_name: response?.category_name,
  //             });
        
  //       const itemControls = response?.subCategories.map((item: {
  //         _id: any; main_category_id: any; category_name: any; 
  // } ) => {
    
  //         this.subcategoryId =item._id
  //         return this.formBuilder.group({
  //          sub_id:[item._id],
  //           main_category_id: [item.main_category_id],
  //           category_name: [item.category_name],
  //         });
  //       });
  //       this.subCategoryForm = this.formBuilder.group({
  //         subcategories: this.formBuilder.array(itemControls),
  //       });
  //     }
  //   });
  
  // }
}
