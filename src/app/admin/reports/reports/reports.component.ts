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
  displayedColumns: string[] = [
    // 'select',
    'name',
    'Download',
    
  ];
  dataSource = [
    {reportName: 'Program report'},
    {reportName: 'Course report'}]
    
  constructor(
   ) {
     
    
     }

  ngOnInit(): void {
  
  }


}
