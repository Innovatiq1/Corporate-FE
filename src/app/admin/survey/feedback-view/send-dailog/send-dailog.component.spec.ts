import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDailogComponent } from './send-dailog.component';

describe('SendDailogComponent', () => {
  let component: SendDailogComponent;
  let fixture: ComponentFixture<SendDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendDailogComponent]
    });
    fixture = TestBed.createComponent(SendDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
