import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItDashboardComponent } from './it-dashboard.component';

describe('ItDashboardComponent', () => {
  let component: ItDashboardComponent;
  let fixture: ComponentFixture<ItDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItDashboardComponent]
    });
    fixture = TestBed.createComponent(ItDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
