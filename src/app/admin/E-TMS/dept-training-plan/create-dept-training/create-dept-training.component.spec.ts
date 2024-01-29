import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeptTrainingComponent } from './create-dept-training.component';

describe('CreateDeptTrainingComponent', () => {
  let component: CreateDeptTrainingComponent;
  let fixture: ComponentFixture<CreateDeptTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDeptTrainingComponent]
    });
    fixture = TestBed.createComponent(CreateDeptTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
