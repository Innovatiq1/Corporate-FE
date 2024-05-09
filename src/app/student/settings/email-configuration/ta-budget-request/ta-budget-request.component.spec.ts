import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaBudgetRequestComponent } from './ta-budget-request.component';

describe('TaBudgetRequestComponent', () => {
  let component: TaBudgetRequestComponent;
  let fixture: ComponentFixture<TaBudgetRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaBudgetRequestComponent]
    });
    fixture = TestBed.createComponent(TaBudgetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
