import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpComponent } from './smtp.component';

describe('SmtpComponent', () => {
  let component: SmtpComponent;
  let fixture: ComponentFixture<SmtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmtpComponent]
    });
    fixture = TestBed.createComponent(SmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
