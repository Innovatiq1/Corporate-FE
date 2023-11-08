import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { SentComponent } from './sent/sent.component';
import { BinMailComponent } from './bin-mail/bin-mail.component';
import { DraftMailComponent } from './draft-mail/draft-mail.component';
const routes: Routes = [
  {
    path: 'admin/inbox',
    component: InboxComponent
  },
  {
    path: 'admin/compose',
    component: ComposeComponent
  },
  {
    path: 'admin/compose/:id',
    component: ComposeComponent
  },

  {
    path: 'admin/read-email/:id',
    component: ReadMailComponent
  },
  {
    path: 'admin/sent',
    component: SentComponent
  },
  {
    path: 'admin/bin',
    component: BinMailComponent
  },
  {
    path: 'admin/draft',
    component: DraftMailComponent
  },
  {
    path: 'student/inbox',
    component: InboxComponent
  },
  {
    path: 'student/compose',
    component: ComposeComponent
  },
  {
    path: 'student/compose/:id',
    component: ComposeComponent
  },

  {
    path: 'student/read-email/:id',
    component: ReadMailComponent
  },
  {
    path: 'student/sent',
    component: SentComponent
  },
  {
    path: 'student/bin',
    component: BinMailComponent
  },
  {
    path: 'student/draft',
    component: DraftMailComponent
  },




];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
