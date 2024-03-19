import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.scss']
})
export class DashboardTabsComponent {


  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Main'],
      active: 'Dashboard',
    },
  ];
}
