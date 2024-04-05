import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    CKEditorModule,
    AngularEditorModule,
    ModalModule.forRoot(),

  ],
})
export class AnnouncementModule {}
