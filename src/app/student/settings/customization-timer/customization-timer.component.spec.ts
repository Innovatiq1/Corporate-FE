import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationTimerComponent } from './customization-timer.component';

describe('CustomizationTimerComponent', () => {
  let component: CustomizationTimerComponent;
  let fixture: ComponentFixture<CustomizationTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizationTimerComponent]
    });
    fixture = TestBed.createComponent(CustomizationTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
