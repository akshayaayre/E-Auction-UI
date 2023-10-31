import { TestBed } from '@angular/core/testing';

import { BuyerService } from './buyer.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BuyerService', () => {
  let service: BuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(BuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
