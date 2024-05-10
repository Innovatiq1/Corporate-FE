import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import { StudentNotificationComponent } from './student-notification/student-notification.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, StudentNotificationComponent, TestPreviewComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
