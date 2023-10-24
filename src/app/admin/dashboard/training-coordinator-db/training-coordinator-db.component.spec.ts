import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCoordinatorDbComponent } from './training-coordinator-db.component';

describe('TrainingCoordinatorDbComponent', () => {
  let component: TrainingCoordinatorDbComponent;
  let fixture: ComponentFixture<TrainingCoordinatorDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingCoordinatorDbComponent]
    });
    fixture = TestBed.createComponent(TrainingCoordinatorDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
