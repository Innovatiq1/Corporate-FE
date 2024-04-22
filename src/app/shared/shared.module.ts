import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material.module';
import { FeatherIconsModule } from './components/feather-icons/feather-icons.module';
import { TruncatePipe } from '@core/service/truncate.pipe';
import { BulletPointsPipe } from '@core/service/content.pipe';
import { CapitalizeFirstLetterPipe } from '@core/service/capitalizeFirstletter.pipe';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { FileNamePipe } from '@core/service/filename.pipe';
import { SideMenuFilterPipe } from '@core/service/sideMenuFilter.pipe';
@NgModule({
  declarations: [TruncatePipe,BulletPointsPipe,CapitalizeFirstLetterPipe,FileNamePipe, SideMenuFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeatherIconsModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FeatherIconsModule,
    TranslateModule,
    TruncatePipe,
    BulletPointsPipe,
    FileNamePipe,
    CapitalizeFirstLetterPipe,
    NgbRatingModule,
    SideMenuFilterPipe
  ],
})
export class SharedModule {}
