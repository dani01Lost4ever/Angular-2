import { TestBed } from '@angular/core/testing';

import { SideCartUpdateService } from './side-cart-update.service';

describe('SideCartUpdateService', () => {
  let service: SideCartUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideCartUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
