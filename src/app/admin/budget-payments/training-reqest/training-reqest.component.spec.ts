import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReqestComponent } from './training-reqest.component';

describe('TrainingReqestComponent', () => {
  let component: TrainingReqestComponent;
  let fixture: ComponentFixture<TrainingReqestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingReqestComponent]
    });
    fixture = TestBed.createComponent(TrainingReqestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
