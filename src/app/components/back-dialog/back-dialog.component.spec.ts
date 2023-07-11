import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDialogComponent } from './back-dialog.component';

describe('BackDialogComponent', () => {
  let component: BackDialogComponent;
  let fixture: ComponentFixture<BackDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackDialogComponent]
    });
    fixture = TestBed.createComponent(BackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
