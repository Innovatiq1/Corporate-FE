import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ComponentsModule } from "../../shared/components/components.module";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { DesignComponent } from './design/design.component';
import { CertificateTemplateComponent } from './certificate-template/certificate-template.component';



@NgModule({
    declarations: [
        CertificatesComponent,
        DesignComponent,
        CertificateTemplateComponent 
    ],
    imports: [
        CommonModule, CertificateRoutingModule,
        ComponentsModule,SharedModule,OwlDateTimeModule,OwlNativeDateTimeModule
    ]
})
export class CertificateModule { }
