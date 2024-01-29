import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent {
  requestForm!: FormGroup;
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Create New Budget',
    },
  ];
  directorName!: string;
  directorId!: string;
  employeName!:string;
  dataSource: object | undefined;
  constructor( private etmsService: EtmsService,
    public utils: UtilsService,
    private router: Router,
    
    private fb: FormBuilder){
    this.requestForm = this.fb.group({
      trainingBudget: ['', [this.utils.noLeadingSpace]],
      year: [
        '',
        [ this.utils.noLeadingSpace],
      ],
      trainingType: [
        '',
        [ this.utils.noLeadingSpace],
      ],

      name: [
        '',
        [...this.utils.validators.name, this.utils.noLeadingSpace],
      ],
      email: [
        '',
        [...this.utils.validators.email, this.utils.noLeadingSpace],
      ],
      
    });
  }

  ngOnInit() {
    this.getUserId()
    
  
}
getUserId() {
  let userId = localStorage.getItem('id');
  this.etmsService.getUserId(userId).subscribe((response: any) => {
    console.log("response",response)
    this.directorId = response.director,
    this.employeName=response?.name +
              ' ' +
              (response.last_name ? response.last_name : ''),
    this.etmsService.getUserId(this.directorId).subscribe((res: any) => {
      
        
      this.directorName = response?.directorName,
      
      this.requestForm.patchValue({
        trainingBudget:"",
        year: "",
        trainingType:"",
        name: this.directorName,
        email: res?.email,
        
       

        
      });
    });
  //sconsole.log("======trrrr")
  
 
    



});
}
onSubmit(){
  console.log("ccccccccc",this.requestForm)
  if (this.requestForm.valid) {
    const requestData = this.requestForm.value;
    requestData['employeName']=this.employeName;
    requestData['status']='Pending'
    
            this.etmsService
              .createBudget(requestData)
              .subscribe((response: any) => {
                Swal.fire({
                  title: 'Successful',
                  text: 'Request created successfully',
                  icon: 'success',
                });
                this.router.navigate(['/admin/e-tms/overall-budget-list']);
              });
          
  }

}
}
