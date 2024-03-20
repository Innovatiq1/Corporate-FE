import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLikertChartComponent } from './create-likert-chart.component';

describe('CreateLikertChartComponent', () => {
  let component: CreateLikertChartComponent;
  let fixture: ComponentFixture<CreateLikertChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLikertChartComponent]
    });
    fixture = TestBed.createComponent(CreateLikertChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
