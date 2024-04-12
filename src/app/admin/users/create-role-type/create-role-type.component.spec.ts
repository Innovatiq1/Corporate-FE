import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleTypeComponent } from './create-role-type.component';

describe('CreateRoleTypeComponent', () => {
  let component: CreateRoleTypeComponent;
  let fixture: ComponentFixture<CreateRoleTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoleTypeComponent]
    });
    fixture = TestBed.createComponent(CreateRoleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
