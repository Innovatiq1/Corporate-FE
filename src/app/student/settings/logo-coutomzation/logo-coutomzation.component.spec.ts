import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCoutomzationComponent } from './logo-coutomzation.component';

describe('LogoCoutomzationComponent', () => {
  let component: LogoCoutomzationComponent;
  let fixture: ComponentFixture<LogoCoutomzationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoCoutomzationComponent]
    });
    fixture = TestBed.createComponent(LogoCoutomzationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
