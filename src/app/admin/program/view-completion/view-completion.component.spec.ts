import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletionComponent } from './view-completion.component';

describe('ViewCompletionComponent', () => {
  let component: ViewCompletionComponent;
  let fixture: ComponentFixture<ViewCompletionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompletionComponent]
    });
    fixture = TestBed.createComponent(ViewCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
