import { TestBed } from '@angular/core/testing';

import { SideCartService } from './side-cart.service';

describe('SideCartService', () => {
  let service: SideCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
