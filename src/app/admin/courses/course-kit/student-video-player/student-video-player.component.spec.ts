import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVideoPlayerComponent } from './student-video-player.component';

describe('StudentVideoPlayerComponent', () => {
  let component: StudentVideoPlayerComponent;
  let fixture: ComponentFixture<StudentVideoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentVideoPlayerComponent]
    });
    fixture = TestBed.createComponent(StudentVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
