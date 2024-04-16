import { Component } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss']
})
export class FundingComponent {
  fundingForm!: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Funding/Grant',
      items: ['Configuration'],
      active: 'Funding/Grant',
    },
  ];
  dataSource :any;

  constructor(private fb: FormBuilder,private router:Router,
    private activatedRoute:ActivatedRoute,private courseService:CourseService,public utils:UtilsService) {
      this.fundingForm = this.fb.group({
        grant_type: ['', [Validators.required,...this.utils.validators.name]],
        description: ['', [Validators.required,...this.utils.validators.name]]

      })
  }

  ngOnInit() {
    this.getAllFundingGrants();
  }

  onSubmit() {
    if(this.fundingForm.valid){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create funding grant!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.courseService.createFundingGrant(this.fundingForm.value).subscribe((response: any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Funding Grant created successfully',
            icon: 'success',
          });
          this.getAllFundingGrants();
          // this.router.navigate(['/student/settings/create-department'])
        });
      }
    });
  } else {
  }
}
getAllFundingGrants(){
  this.courseService.getFundingGrant().subscribe((response:any) =>{
   this.dataSource = response;
  })
}

}
