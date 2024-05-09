import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReqExpiryComponent } from './training-req-expiry.component';

describe('TrainingReqExpiryComponent', () => {
  let component: TrainingReqExpiryComponent;
  let fixture: ComponentFixture<TrainingReqExpiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingReqExpiryComponent]
    });
    fixture = TestBed.createComponent(TrainingReqExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
