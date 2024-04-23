import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-funding',
  templateUrl: './update-funding.component.html',
  styleUrls: ['./update-funding.component.scss']
})
export class UpdateFundingComponent {
  fundingForm!: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Funding/Grant',
      items: ['Configuration'],
      active: 'Funding/Grant',
    },
  ];
  
  fund!: string;
  description!: string;
  id!: string;
  constructor(private fb: FormBuilder,private router:Router,
    private activatedRoute:ActivatedRoute,private courseService:CourseService,public utils:UtilsService, private location: Location) {
      this.fundingForm = this.fb.group({
        grant_type: ['', [Validators.required,...this.utils.validators.name]],
        description: ['', [Validators.required,...this.utils.validators.name]]

      });

    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.fund = params['funding'];
      this.description = params['description'];
      this.id = params['id'];
      this.fundingForm.patchValue({
        grant_type: this.fund,
        description: this.description
      });
    });
  }

  onUpdate(): void {
    if(this.fundingForm.valid) {
    const payload = {
      grant_type: this.fundingForm.value.grant_type,
      description: this.fundingForm.value.description
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.courseService.updateFundingGrant(this.id,payload).subscribe(data => {

          if(data){
            Swal.fire({
              title: 'Success',
              text: 'Funding Grant updated successfully.',
              icon: 'success',
              // confirmButtonColor: '#d33',
            });
            this.fundingForm.reset();
            () => {
              Swal.fire({
                title: 'Error',
                text: 'Failed to update. Please try again.',
                icon: 'error',
                // confirmButtonColor: '#d33',
              });
            };
          }
        })
        this.router.navigate(['student/settings/funding-grant'])
      }
    });
  }else{
    this.fundingForm.markAllAsTouched(); 
  }
    
  }

  deleteFunding(id:string){
    Swal.fire({
  title: "Confirm Deletion",
  text: "Are you sure you want to delete this?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Delete",
  cancelButtonText: "Cancel",
}).then((result) => {
  if (result.isConfirmed){
    this.courseService.deleteFundingGrant(id).subscribe(result => { 
      Swal.fire({
        title: 'Success',
        text: 'Record Deleted Successfully...!!!',
        icon: 'success',
        // confirmButtonColor: '#526D82',
      });
      this.router.navigate(['/student/settings/funding-grant']);
    });
  }
});
}

goBack(): void {
  this.location.back();
}
}
