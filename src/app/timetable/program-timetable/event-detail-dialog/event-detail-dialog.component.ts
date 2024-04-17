import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.scss']
})
export class EventDetailDialogComponent {
  code: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  "programCode" in data ? this.code = true : this.code = false;
    
  }

 
}
