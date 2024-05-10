import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTestAnswersheetComponent } from './preview-test-answersheet.component';

describe('PreviewTestAnswersheetComponent', () => {
  let component: PreviewTestAnswersheetComponent;
  let fixture: ComponentFixture<PreviewTestAnswersheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewTestAnswersheetComponent]
    });
    fixture = TestBed.createComponent(PreviewTestAnswersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
