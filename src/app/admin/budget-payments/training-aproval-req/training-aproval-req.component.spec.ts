import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAprovalReqComponent } from './training-aproval-req.component';

describe('TrainingAprovalReqComponent', () => {
  let component: TrainingAprovalReqComponent;
  let fixture: ComponentFixture<TrainingAprovalReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingAprovalReqComponent]
    });
    fixture = TestBed.createComponent(TrainingAprovalReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
