import { Component } from '@angular/core';
import { FormService  } from '@core/service/customization.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form-customization',
  templateUrl: './form-customization.component.html',
  styleUrls: ['./form-customization.component.scss']
})
export class FormCustomizationComponent {
  forms!: any[];
  labelChanges: { formId: string, labelName: string, checked: boolean }[] = [];

  breadscrums = [
    {
      title: 'Form Customization',
      items: ['student'],
      active: 'Form Customization',

    },
  ];

  constructor(private formService: FormService) { }
  
  ngOnInit(): void {
    this.getForms();
  }

  getForms(): void {
    this.formService.getAllForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  onCheckboxChange(formId: string, labelName: string, checked: boolean): void {
    const existingChangeIndex = this.labelChanges.findIndex(change => change.formId === formId && change.labelName === labelName);
    if (existingChangeIndex !== -1) {
      this.labelChanges[existingChangeIndex].checked = checked;
    } else {
      this.labelChanges.push({ formId, labelName, checked });
    }
  }


  updateLabels(): void {
    this.labelChanges.forEach(change => {
      this.formService.updateLabelStatus(change.formId, change.labelName, change.checked).subscribe(updatedForm => {
        Swal.fire({
          title: 'Success',
          text: 'Label updated successfully.',
          icon: 'success'
        });
        this.getForms()
      }, error => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
        });
  
      });
    });
  }

}
