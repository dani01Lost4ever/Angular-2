import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDialogButtonComponent } from './back-dialog-button.component';

describe('BackDialogButtonComponent', () => {
  let component: BackDialogButtonComponent;
  let fixture: ComponentFixture<BackDialogButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackDialogButtonComponent]
    });
    fixture = TestBed.createComponent(BackDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
