import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { GenereateReportComponent } from './genereate-report/genereate-report.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportsComponent,
  },
  {
    path: 'generate-report',
    component: GenereateReportComponent,
  },


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
