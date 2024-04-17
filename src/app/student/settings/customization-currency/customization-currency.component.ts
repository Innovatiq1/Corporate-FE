import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '@core/service/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customization-currency',
  templateUrl: './customization-currency.component.html',
  styleUrls: ['./customization-currency.component.scss']
})
export class CustomizationCurrencyComponent {
  breadscrums = [
    {
      title: 'Customization',
      items: ['Customize'],
      active: 'Currency',
    },
  ];
  currencyCodes: string[] = ['USD', 'SGD', 'NZD', 'YEN', 'GBP', 'KWN', 'IDR', 'TWD', 'MYR', 'AUD'];

  selectedCurrency: string = "";
dialogRef: any;
 
  constructor(
    
    private courseService: CourseService,
    public dialog: MatDialog
  ){}
  updateCurrency() {
    console.log("hi");
    const selectedCurrency = this.selectedCurrency;
    this.courseService.createCurrency({ value: selectedCurrency }).subscribe(
      response => {
        Swal.fire({
          title: 'Successful',
          text: 'Currency Configuration Success',
          icon: 'success'
        });
        // dialogRef.close(selectedCurrency);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomizationCurrencyComponent, {
      width: '500px',
      data: { selectedCurrency: this.selectedCurrency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedCurrency = result;
      }
    });
  }
  
}