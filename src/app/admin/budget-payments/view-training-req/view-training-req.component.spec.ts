import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingReqComponent } from './view-training-req.component';

describe('ViewTrainingReqComponent', () => {
  let component: ViewTrainingReqComponent;
  let fixture: ComponentFixture<ViewTrainingReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTrainingReqComponent]
    });
    fixture = TestBed.createComponent(ViewTrainingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
