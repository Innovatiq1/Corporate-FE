import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyToolsComponent } from './third-party-tools.component';

describe('ThirdPartyToolsComponent', () => {
  let component: ThirdPartyToolsComponent;
  let fixture: ComponentFixture<ThirdPartyToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdPartyToolsComponent]
    });
    fixture = TestBed.createComponent(ThirdPartyToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
