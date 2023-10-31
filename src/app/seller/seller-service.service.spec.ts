import { TestBed } from '@angular/core/testing';

import { SellerService } from './seller-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BidWithUserDetails } from '../model/bidWithUserDetails';

describe('SellerServiceService', () => {
  let service: SellerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [SellerService],
    });
    service = TestBed.inject(SellerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Ensure there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve bid details via GET', () => {
    //Arrange
    const productId = 1;
    const expectedBidWithUserDetails: BidWithUserDetails[] = [{
      "bidDetailsId": 0,
      "productId": 1,
      "bidAmount": 106,
      "userEmail": "testbuyer@abc.com",
      "userDetails": {
          "email": "testbuyer@abc.com",
          "password": null,
          "firstName": "TestBuyer",
          "lastName": "TestBuyer",
          "address": "1",
          "city": "1",
          "state": "1",
          "pincode": 123456,
          "phoneNumber": 1234567890,
          "userType": "Buyer",
          "token": ""
      }
  },
  {
      "bidDetailsId": 1,
      "productId": 1,
      "bidAmount": 102,
      "userEmail": "bb@abc.com",
      "userDetails": {
          "email": "bb@abc.com",
          "password": null,
          "firstName": "Akshaya1",
          "lastName": "Ayre1",
          "address": "1",
          "city": "1",
          "state": "1",
          "pincode": 123456,
          "phoneNumber": 1234567890,
          "userType": "Buyer",
          "token": ""
      }
  }];

  //Act
  service.getAllBidsOnProduct(productId).subscribe(
    (result) => {
      //Assert
      expect(result).toEqual(expectedBidWithUserDetails);
    });

    const req = httpTestingController.expectOne(service.readBaseUrl + '/getAllBidsOnProduct?productId=' + productId);
    expect(req.request.method).toEqual('GET');

    //Respond with the expected bid details
    req.flush(expectedBidWithUserDetails);
  });
});
