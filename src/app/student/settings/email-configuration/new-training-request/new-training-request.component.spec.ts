import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrainingRequestComponent } from './new-training-request.component';

describe('NewTrainingRequestComponent', () => {
  let component: NewTrainingRequestComponent;
  let fixture: ComponentFixture<NewTrainingRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTrainingRequestComponent]
    });
    fixture = TestBed.createComponent(NewTrainingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
