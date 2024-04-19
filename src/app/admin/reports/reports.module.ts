import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';




@NgModule({
  declarations: [
    
    

  
    ReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    ComponentsModule,
    SharedModule,
    ModalModule.forRoot(),
   
  ],
})
export class ReportsModule {}
