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
    path: 'inbox',
    component: InboxComponent
  },
  {
    path: 'compose',
    component: ComposeComponent
  },
  {
    path: 'compose/:id',
    component: ComposeComponent
  },

  {
    path: 'read-email/:id',
    component: ReadMailComponent
  },
  {
    path: 'sent',
    component: SentComponent
  },
  {
    path: 'bin',
    component: BinMailComponent
  },
  {
    path: 'draft',
    component: DraftMailComponent
  },
  {
    path: 'important',
    component: ImportantMailComponent
  },
  {
    path: 'starred',
    component: StarredMailComponent
  },
  {
    path: 'spam',
    component: SpamComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule {}
