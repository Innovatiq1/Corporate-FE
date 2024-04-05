import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersRoutingModule } from './teachers-routing.module';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { VideoResourceComponent } from './video-resource/video-resource.component';
import { ArticleComponent } from './article/article.component';
import { AgreementTCComponent } from './agreement-t-c/agreement-t-c.component';
import { TeachersService } from './teachers.service';
@NgModule({
  declarations: [
    AddTeacherComponent,
    EditTeacherComponent,
    AboutTeacherComponent,
    VideoResourceComponent,
    ArticleComponent,
    AgreementTCComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [TeachersService],
})
export class TeachersModule {}
