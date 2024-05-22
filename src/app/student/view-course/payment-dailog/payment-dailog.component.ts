import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
 typeName: any;
}


@Component({
  selector: 'app-payment-dailog',
  templateUrl: './payment-dailog.component.html',
  styleUrls: ['./payment-dailog.component.scss']
})
export class PaymentDailogComponent {

  constructor(
    public dialogRef: MatDialogRef<PaymentDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectPayment(payment: string) {
    this.data.payment = payment; 
    this.dialogRef.close(this.data); 
  }
}
