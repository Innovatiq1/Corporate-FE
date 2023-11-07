import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRoutingModule } from './email-routing.module';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { EmailSidebarComponent } from './email-sidebar/email-sidebar.component';
import { SentComponent } from './sent/sent.component';
@NgModule({
  declarations: [ComposeComponent, InboxComponent, ReadMailComponent, EmailSidebarComponent, SentComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class EmailModule {}
