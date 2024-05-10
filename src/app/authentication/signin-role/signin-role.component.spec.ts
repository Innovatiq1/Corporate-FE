import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninRoleComponent } from './signin-role.component';

describe('SigninRoleComponent', () => {
  let component: SigninRoleComponent;
  let fixture: ComponentFixture<SigninRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninRoleComponent]
    });
    fixture = TestBed.createComponent(SigninRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
