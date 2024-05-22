import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SupportService } from './support.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  displayedColumns: string[] = ['name', 'ticket', 'status', 'date'];
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
      this.dataSource = res.data.docs;
      this.totalTickets = this.dataSource.length;
    });
  }

  view(id: any) {
    this.router.navigate(['apps/inbox'],{queryParams:{id:id}});
  }

  delete(id:string){

    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    this.ticketService.deleteTicket(id).subscribe(res =>{
      this.listOfTicket();
    })
  }
  });
  }


}
