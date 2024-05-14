import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRequestComponent } from './view-all-request.component';

describe('ViewAllRequestComponent', () => {
  let component: ViewAllRequestComponent;
  let fixture: ComponentFixture<ViewAllRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllRequestComponent]
    });
    fixture = TestBed.createComponent(ViewAllRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
