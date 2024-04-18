import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WelcomeMailComponent } from './welcome-mail/welcome-mail.component';
import { InstructorRequestComponent } from './instructor-request/instructor-request.component';
import { InviteUserRejectComponent } from './invite-user-reject/invite-user-reject.component';
import { CourseReferralInviteComponent } from './course-referral-invite/course-referral-invite.component';
import { CompletedCourseComponent } from './completed-course/completed-course.component';
import { InstructorCourseInviteComponent } from './instructor-course-invite/instructor-course-invite.component';
import { InstructorAcceptCourseInviteComponent } from './instructor-accept-course-invite/instructor-accept-course-invite.component';
import { SendCourseInvoiceComponent } from './send-course-invoice/send-course-invoice.component';
import { AdminNewEmailComponent } from './admin-new-email/admin-new-email.component';
import { ProgramRegistrationComponent } from './program-registration/program-registration.component';
import { ProgramApprovalComponent } from './program-approval/program-approval.component';
import { ProgramCompletionComponent } from './program-completion/program-completion.component';
import { DirectorCourseNotificationComponent } from './director-course-notification/director-course-notification.component';


const routes: Routes = [
    {
        path: 'settings/forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'settings/welcome-mail',
        component: WelcomeMailComponent
      },
      {
        path: 'settings/instructor-request',
        component: InstructorRequestComponent
      },
      {
        path: 'settings/invite-user-reject',
        component: InviteUserRejectComponent
      },
      {
        path: 'settings/director-course-notification',
        component: DirectorCourseNotificationComponent
      },
      {
        path: 'settings/course-referral-invite',
        component: CourseReferralInviteComponent
      },
      {
        path: 'settings/completed-course',
        component: CompletedCourseComponent
      },
      {
        path: 'settings/course-registered-email',
        component: InstructorCourseInviteComponent
      },
      {
        path: 'settings/course-approval-email',
        component: InstructorAcceptCourseInviteComponent
      },
      {
        path: 'settings/send-course-invoice',
        component: SendCourseInvoiceComponent
      },
      {
        path: 'settings/admin-new-email',
        component: AdminNewEmailComponent
      },
      {
        path: 'settings/program-registration-email',
        component: ProgramRegistrationComponent
      },
      {
        path: 'settings/program-approval-email',
        component: ProgramApprovalComponent
      },
      {
        path: 'settings/program-completion-email',
        component: ProgramCompletionComponent
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfigurationRoutingModule { }
