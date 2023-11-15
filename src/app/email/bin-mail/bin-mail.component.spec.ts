import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinMailComponent } from './bin-mail.component';

describe('BinMailComponent', () => {
  let component: BinMailComponent;
  let fixture: ComponentFixture<BinMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BinMailComponent]
    });
    fixture = TestBed.createComponent(BinMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
