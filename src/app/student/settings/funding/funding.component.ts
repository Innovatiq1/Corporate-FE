import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  dataSource = [
    {department: 'WSSG'},
    {department: 'NSG'},
    {department: 'CFD'},
    {department: 'PV'},
];

  constructor(private fb: UntypedFormBuilder,private router:Router,
    private activatedRoute:ActivatedRoute) {
    

    
 
  }

  ngOnInit() {
  }

  onSubmit(){

  }
}
