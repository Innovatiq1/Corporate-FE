import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationCurrencyComponent } from './customization-currency.component';

describe('CustomizationCurrencyComponent', () => {
  let component: CustomizationCurrencyComponent;
  let fixture: ComponentFixture<CustomizationCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizationCurrencyComponent]
    });
    fixture = TestBed.createComponent(CustomizationCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
