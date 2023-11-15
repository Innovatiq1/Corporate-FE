import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMailComponent } from './draft-mail.component';

describe('DraftMailComponent', () => {
  let component: DraftMailComponent;
  let fixture: ComponentFixture<DraftMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraftMailComponent]
    });
    fixture = TestBed.createComponent(DraftMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
