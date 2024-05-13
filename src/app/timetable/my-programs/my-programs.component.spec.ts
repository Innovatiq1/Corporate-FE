import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgramsComponent } from './my-programs.component';

describe('MyProgramsComponent', () => {
  let component: MyProgramsComponent;
  let fixture: ComponentFixture<MyProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProgramsComponent]
    });
    fixture = TestBed.createComponent(MyProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
