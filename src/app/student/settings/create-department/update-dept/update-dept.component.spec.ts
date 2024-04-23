import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeptComponent } from './update-dept.component';

describe('UpdateDeptComponent', () => {
  let component: UpdateDeptComponent;
  let fixture: ComponentFixture<UpdateDeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeptComponent]
    });
    fixture = TestBed.createComponent(UpdateDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
