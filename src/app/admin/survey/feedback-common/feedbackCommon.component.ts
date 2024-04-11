import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedbackcommon',
  templateUrl: './feedbackCommon.component.html',
  styleUrls: ['./feedbackCommon.component.scss'],
})
export class FeedbackCommonComponent {
  @Input() feedbackInfo: any;
  @Input() isPreview:boolean = false;
  constructor(){

  }


  questions(){
    return this.feedbackInfo?.questions || []
  }
}
