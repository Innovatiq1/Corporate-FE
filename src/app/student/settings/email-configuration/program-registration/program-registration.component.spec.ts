import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRegistrationComponent } from './program-registration.component';

describe('ProgramRegistrationComponent', () => {
  let component: ProgramRegistrationComponent;
  let fixture: ComponentFixture<ProgramRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramRegistrationComponent]
    });
    fixture = TestBed.createComponent(ProgramRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
