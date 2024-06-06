import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtoDashboardComponent } from './cto-dashboard.component';

describe('CtoDashboardComponent', () => {
  let component: CtoDashboardComponent;
  let fixture: ComponentFixture<CtoDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CtoDashboardComponent]
    });
    fixture = TestBed.createComponent(CtoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
