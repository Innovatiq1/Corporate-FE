/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { EtmsService } from '@core/service/etms.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss']
})
export class AllRequestComponent {

  breadscrums = [
    {
      title: 'Approval Work Flow',
      // items: ['Extra'],
      active: 'All Request',
    },
  ];
  SourceData:any;
  constructor(public empService: EtmsService) { 
  }


  ngOnInit() {
    this.empService.getAllRequests().subscribe((res) => {
      
      this.SourceData = res.data.docs.docs;
      console.log('response',this.SourceData);

    })
  }

}
