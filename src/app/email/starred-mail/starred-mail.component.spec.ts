import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredMailComponent } from './starred-mail.component';

describe('StarredMailComponent', () => {
  let component: StarredMailComponent;
  let fixture: ComponentFixture<StarredMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarredMailComponent]
    });
    fixture = TestBed.createComponent(StarredMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
