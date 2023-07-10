import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCartComponent } from './side-cart.component';

describe('SideCartComponent', () => {
  let component: SideCartComponent;
  let fixture: ComponentFixture<SideCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideCartComponent]
    });
    fixture = TestBed.createComponent(SideCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
