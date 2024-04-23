import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFundingComponent } from './update-funding.component';

describe('UpdateFundingComponent', () => {
  let component: UpdateFundingComponent;
  let fixture: ComponentFixture<UpdateFundingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFundingComponent]
    });
    fixture = TestBed.createComponent(UpdateFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
