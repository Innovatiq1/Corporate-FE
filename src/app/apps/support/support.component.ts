import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SupportService } from './support.service';
import { Router } from '@angular/router';
// export interface PeriodicElement {
//   checked: boolean;
//   name: string;
//   subject: string;
//   status: string;
//   assignTo: string;
//   date: string;
//   action: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     checked: false,
//     name: 'Tim Hank',
//     subject: 'Image not Proper',
//     status: 'closed',
//     assignTo: 'John Deo',
//     date: '27/05/2016',
//     action: '',
//   }

// ];
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ticket', 'status', 'date', 'action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  totalTickets:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // 'status',
  // 'assignTo',
  // 'date',
  breadscrums = [
    {
      title: 'Support',
      items: ['Apps'],
      active: 'Support',
    },
  ];
  constructor(private ticketService: SupportService, public router: Router) {
    //constructor
  }
  ngOnInit() {
    this.listOfTicket();
    // this.dataSource.paginator = this.paginator;
  }

  listOfTicket() {
    this.ticketService.getAllTickets().subscribe((res) => {
      console.log('tickets', res.data.docs);
      this.dataSource = res.data.docs;
      this.totalTickets = this.dataSource.length;
      console.log('tickets12', this.totalTickets);
    });
  }

  view(id: any) {
    console.log('id', id);
    this.router.navigate(['apps/inbox'],{queryParams:{id:id}});
  }

  delete(id:string){
    this.ticketService.deleteTicket(id).subscribe(res =>{
      this.listOfTicket();
    })
  }


}
