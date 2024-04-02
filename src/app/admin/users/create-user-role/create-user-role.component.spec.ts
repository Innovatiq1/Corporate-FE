import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRoleComponent } from './create-user-role.component';

describe('CreateUserRoleComponent', () => {
  let component: CreateUserRoleComponent;
  let fixture: ComponentFixture<CreateUserRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserRoleComponent]
    });
    fixture = TestBed.createComponent(CreateUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});