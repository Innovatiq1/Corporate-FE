import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "../../shared/components/components.module";
import { SharedModule } from '@shared';
import { AuditRoutingModule } from './audit-routing.module';
import { AuditListComponent } from './audit-list/audit-list.component';




@NgModule({
    declarations: [
        AuditListComponent
    ],
    imports: [
        CommonModule, AuditRoutingModule,
        ComponentsModule,SharedModule
    ]
})
export class AuditModule { }
