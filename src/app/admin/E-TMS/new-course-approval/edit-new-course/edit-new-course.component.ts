import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpRequest } from '@core/models/emp-request.model';
import { EtmsService } from '@core/service/etms.service';
import Swal from 'sweetalert2';


export interface DialogData {
  id: number;
  action: string;
  empRequest: EmpRequest;
}


@Component({
  selector: 'app-edit-new-course',
  templateUrl: './edit-new-course.component.html',
  styleUrls: ['./edit-new-course.component.scss']
})
export class EditNewCourseComponent {
  action: string;
  dialogTitle: string;
  empRequestForm!: UntypedFormGroup;
  empRequest: EmpRequest;
  _id:any;
  ro = false;
  payload = {}
  director = false;
  trainingAdmin = false;
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<EditNewCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public etmsService: EtmsService,
    private fb: UntypedFormBuilder,
  ) {
    
    this.action = data.action;
    if (this.action === "edit" || this.action === "approve") {
      
      this.dialogTitle = "Edit Employee Request";
      this.empRequest = data.empRequest;
      this._id=data.empRequest.id
    } else {
      this.dialogTitle = "New Employee Request";
      const blankObject = {} as EmpRequest;
      this.empRequest = new EmpRequest(blankObject);
    }
    this.empRequestForm = this.createContactForm();

    let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (user.user.type == 'RO') {
      this.ro = true;
    } else if (user.user.type == 'Director') {
      this.director = true;
    } else if (user.user.type == 'Training Administrator') {
      this.trainingAdmin = true;
    }

  }
  formControl = new UntypedFormControl("", [
    Validators.required,
   
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
 
  ngOnInit(): void {
    // this.confirmAdd();
    // this.approveRequest();
     if (this.trainingAdmin) {
      this.getAllRequestsByTrainingAdmin();
    }
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.empRequest.id],
      reason: [this.empRequest.reason, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 

  getAllRequestsByTrainingAdmin() {
    let trainingAdminId = localStorage.getItem('id')
    let trainingAdminStatus = 'inactive';
    this.etmsService.getCourseRequestsByTrainingAdmin({trainingAdminId,trainingAdminStatus}).subscribe(response => {
      this.dataSource = response.data.docs;
    }, () => {
    });
  }


  
 

  public confirmAdd(): void {

   if (this.trainingAdmin) {
      this.payload = {
        trainingAdminApproval: "Rejected",
        status: "reject",
        trainingAdminReason: this.empRequestForm.value.reason,
      }
    }
    if (this.empRequestForm.valid) {
    this.etmsService.updateCourseStatus(this.payload, this._id).subscribe((response: any) => {
       if (this.trainingAdmin) {
        Swal.fire({
          title: 'Success',
          text: 'Rejected by Training Admin',
          icon: 'success',
        });
        // this.getAllRequestsByTrainingAdmin();
       
      }
    });
  }
  
  }


  /** To approve  */

  approveRequest(){
   if (this.trainingAdmin) {
      this.payload = {
        trainingAdminApproval: "Approved",
        status: "active",
        trainingAdminReason: this.empRequestForm.value.reason,
      }
    }
    if (this.empRequestForm.valid) {
    this.etmsService
      .updateCourseStatus(this.payload, this._id)
      .subscribe((response: any) => {
        if (this.trainingAdmin) {
          Swal.fire({
            title: 'Successful',
            text: 'Approved Sucessfully',
            icon: 'success',
          });
          // this.getAllRequestsByTrainingAdmin();
        }
      });
    }
    
  }
}
