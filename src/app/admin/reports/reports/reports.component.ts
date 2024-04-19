import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  breadscrums = [
    {
      title: 'Reoprts',
      items: ['Reports'],
      active: 'Report',
    },
  ];
  payRunDate?: string;
  position?: string;
  department?: string;

  constructor() { }

  generateReport(): void {
    const reportData = {
      payRunDate: this.payRunDate,
      position: this.position,
      department: this.department
    };
    const csvContent = this.convertToCSV(reportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv'; 
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private convertToCSV(data: any): string {
    let csv = 'Pay Run Date,Position,Department\n';
    csv += `${data.payRunDate},${data.position},${data.department}\n`;
    return csv;
  }
}
