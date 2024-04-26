import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereateReportComponent } from './genereate-report.component';

describe('GenereateReportComponent', () => {
  let component: GenereateReportComponent;
  let fixture: ComponentFixture<GenereateReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenereateReportComponent]
    });
    fixture = TestBed.createComponent(GenereateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
