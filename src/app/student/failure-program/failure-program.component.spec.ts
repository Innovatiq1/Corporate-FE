import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureProgramComponent } from './failure-program.component';

describe('FailureProgramComponent', () => {
  let component: FailureProgramComponent;
  let fixture: ComponentFixture<FailureProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailureProgramComponent]
    });
    fixture = TestBed.createComponent(FailureProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
