import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAdministratorComponent } from './training-administrator.component';

describe('TrainingAdministratorComponent', () => {
  let component: TrainingAdministratorComponent;
  let fixture: ComponentFixture<TrainingAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingAdministratorComponent]
    });
    fixture = TestBed.createComponent(TrainingAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
