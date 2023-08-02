import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUserComponent } from './nav-user.component';

describe('NavUserComponent', () => {
  let component: NavUserComponent;
  let fixture: ComponentFixture<NavUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavUserComponent]
    });
    fixture = TestBed.createComponent(NavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
