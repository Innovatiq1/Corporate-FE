import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SettingsService } from '@core/service/settings.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent {
  breadscrums = [
    {
      title: 'Integration',
      items: ['Integration'],
      active: 'Payment Gateway',
    },
  ];

  paymentForm: UntypedFormGroup;
  razorPaymentForm: UntypedFormGroup;
  highlightStripe: boolean = true;
  payment: any;
  id!: string;
  razorpayId!: string;
  
  constructor(private fb: UntypedFormBuilder,
    private settingsService: SettingsService,
    public utils: UtilsService
    ) {
   
    this.paymentForm = this.fb.group({
      company: ['', [Validators.required,  ...this.utils.validators.uname]],
      webhook: ['', [Validators.required,  ...this.utils.validators.password]],
      secret: ['', [Validators.required,  ...this.utils.validators.password]],
      mode: ['test', [Validators.required]],
    });
    this.razorPaymentForm = this.fb.group({
      company: ['', [Validators.required,  ...this.utils.validators.uname]],
      public: ['', [Validators.required,  ...this.utils.validators.password]],
      secret: ['', [Validators.required,  ...this.utils.validators.password]],
      mode: ['test', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getData();
    this.getRazorData();
  }

  update() {
    if (this.paymentForm.valid) {
      const paymentGatewayData = this.paymentForm.value;
      let payload = {
        company: paymentGatewayData?.company,
        webhookSecretKey: paymentGatewayData?.webhook,
        secretkey: paymentGatewayData?.secret,
      };

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update this Stripe Payment Gateway!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.settingsService
            .updatePayment(this.id, payload)
            .subscribe((response: any) => {
              Swal.fire({
                title: 'Successful',
                text: 'Stripe Payment Gateway saved successfully',
                icon: 'success',
              });
              this.getData();
              // window.history.back();
            });
        }
      });
    }
  }

  updateRazorpay() {
    if (this.razorPaymentForm.valid) {
      const paymentGatewayData = this.razorPaymentForm.value;
      let payload = {
        company: paymentGatewayData?.company,
        keyId: paymentGatewayData?.public,
        secretkey: paymentGatewayData?.secret,
      };

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update this Razorpay Payment Gateway!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.settingsService
            .updatePayment(this.razorpayId, payload)
            .subscribe((response: any) => {
              Swal.fire({
                title: 'Successful',
                text: 'Razorpay Payment Gateway saved successfully',
                icon: 'success',
              });
              this.getData();
              // window.history.back();
            });
        }
      });
    }
  }
  getData() {
    this.settingsService.getPayment().subscribe((response: any) => {
      this.payment = response.data.docs[1];
      this.id= response.data.docs[1]._id;
      this.paymentForm.patchValue({
        company: this.payment?.company,
        webhook: this.payment?.webhookSecretKey,
        secret: this.payment?.secretkey,
      });
    });
  }
  getRazorData(){
    this.settingsService.getPayment().subscribe((response: any) => {
      this.payment = response.data.docs[0];
      this.razorpayId = response.data.docs[0]._id;
      this.razorPaymentForm.patchValue({
        company: this.payment?.company,
        public: this.payment?.keyId,
        secret: this.payment?.secretkey,
      });
    });
  }
  cancel() {
    window.history.back();
  }
}
