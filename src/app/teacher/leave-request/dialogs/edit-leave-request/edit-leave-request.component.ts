import { Component,Inject } from '@angular/core';
import { LeaveRequest } from '../../leave-request.model';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstructorLeaveRequestService } from '../../leave-request.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: number;
  action: string;
  leaveRequest: LeaveRequest;
}
@Component({
  selector: 'app-edit-leave-request',
  templateUrl: './edit-leave-request.component.html',
  styleUrls: ['./edit-leave-request.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class EditLeaveRequestComponent {
  statusOptions: string[] = ['applied', 'approved', 'cancelled'];

  action: string;
  dialogTitle: string;
  leaveRequestForm: UntypedFormGroup;
  leaveRequest: LeaveRequest;
  studentApprovedClasses: any;
  _id:any;
  constructor(
    public dialogRef: MatDialogRef<EditLeaveRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leaveRequestService: InstructorLeaveRequestService,
    private fb: UntypedFormBuilder,
   // private classService: ClassService
  ) {
    //this.getApprovedCourse();
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      
      this.dialogTitle = "Edit Leave Request";
      this.leaveRequest = data.leaveRequest;
      this._id=data.leaveRequest.id
    } else {
      this.dialogTitle = "New Leave Request";
      const blankObject = {} as LeaveRequest;
      this.leaveRequest = new LeaveRequest(blankObject);
    }
    this.leaveRequestForm = this.createContactForm();
  }
  formControl = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  // getApprovedCourse(){
  //   let studentId=localStorage.getItem('id')
  //   const payload = { studentId: studentId, status: 'approved' };
  //   this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
  //    this.studentApprovedClasses = response.data.docs;
  //   })
  // }
  
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.leaveRequest.id],
      className: [this.leaveRequest.className, [Validators.required]],
      applyDate: [this.leaveRequest.applyDate, [Validators.required]],
      fromDate: [this.leaveRequest.fromDate, [Validators.required]],
      toDate: [this.leaveRequest.toDate, [Validators.required]],
      reason: [this.leaveRequest.reason, [Validators.required]],
      status: [this.leaveRequest.status, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log("====fopa====")
    let data=this.leaveRequestForm.value
    //data['classId']=this.classId
    //data['_id']=this.id
    //this.lecturesService.updateLectures(data);
    this.leaveRequestService.updateLeaveRequest(data,this._id)
    //console.log("==data1=",data1)
    //this.lecturesService.addLectures(this.lectuthisresForm.getRawValue());
  }
  // public confirmAdd(): void {
  //   let payload={
  //     className:this.leaveRequestForm.value?.className?.classId?.courseId?.title,
  //     applyDate:this.leaveRequestForm.value?.applyDate,
  //     fromDate:this.leaveRequestForm.value?.fromDate,
  //     toDate:this.leaveRequestForm.value?.toDate,
  //     reason:this.leaveRequestForm.value?.reason,
  //     instructorId:this.leaveRequestForm.value?.className?.classId?.sessions[0]?.instructorId,
  //     classId:this.leaveRequestForm.value?.className?.classId?.id,
  //     studentId:this.leaveRequestForm.value?.className?.studentId?.id,
  //     status:'applied'

  //   }
  //   this.leaveRequestService.addLeaveRequest(payload);
  // }
}
