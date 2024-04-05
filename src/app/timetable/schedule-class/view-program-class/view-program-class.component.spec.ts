import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramClassComponent } from './view-program-class.component';

describe('ViewProgramClassComponent', () => {
  let component: ViewProgramClassComponent;
  let fixture: ComponentFixture<ViewProgramClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProgramClassComponent]
    });
    fixture = TestBed.createComponent(ViewProgramClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
