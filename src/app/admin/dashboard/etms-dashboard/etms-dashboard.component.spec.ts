import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtmsDashboardComponent } from './etms-dashboard.component';

describe('EtmsDashboardComponent', () => {
  let component: EtmsDashboardComponent;
  let fixture: ComponentFixture<EtmsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtmsDashboardComponent]
    });
    fixture = TestBed.createComponent(EtmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
