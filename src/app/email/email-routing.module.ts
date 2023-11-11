import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { SentComponent } from './sent/sent.component';
import { BinMailComponent } from './bin-mail/bin-mail.component';
import { DraftMailComponent } from './draft-mail/draft-mail.component';
import { ImportantMailComponent } from './important-mail/important-mail.component';
import { StarredMailComponent } from './starred-mail/starred-mail.component';
import { SpamComponent } from './spam/spam.component';
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
    path: 'admin/important',
    component: ImportantMailComponent
  },
  {
    path: 'admin/starred',
    component: StarredMailComponent
  },
  {
    path: 'admin/spam',
    component: SpamComponent
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
  {
    path: 'student/important',
    component: ImportantMailComponent
  },
  {
    path: 'student/starred',
    component: StarredMailComponent
  },
  {
    path: 'student/spam',
    component: SpamComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
