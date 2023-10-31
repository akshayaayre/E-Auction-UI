import { TestBed } from '@angular/core/testing';

import { BuyerService } from './buyer.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BidDetails } from '../model/bidDetails';
import { Product } from '../model/product';

describe('BuyerService', () => {
  let service: BuyerService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(BuyerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      {
        productId: 1,
        productName: "Product1",
        productShortDescription:  "Product1",
        productDescription:  "Product1",
        startingPrice: 100,
        bidEndDate: new Date(),
        userEmail: "aa@abc.com"
      },
      {
        productId: 2,
        productName: "Product2",
        productShortDescription:  "Product2",
        productDescription:  "Product2",
        startingPrice: 100,
        bidEndDate: new Date(),
        userEmail: "aa@abc.com"
      }
    ];
    service.getAllProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/e-auction/api/v1/read/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get bid from user on a product', () => {
    const productId = 123;
    const userEmail = 'test@example.com';
    const mockBidDetails: BidDetails = {
      bidDetailsId: 1,
      productId: 1,
      bidAmount: 101,
      userEmail: "bb@abc.com"
  };

    service.getBidFromUserOnProduct(productId, userEmail).subscribe((bidDetails) => {
      expect(bidDetails).toEqual(mockBidDetails);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/e-auction/api/v1/read/getBidFromUserOnProduct?productId=${productId}&userEmail=${userEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBidDetails);
  });

  it('should add a bid on a product', () => {
    const mockBidDetails: BidDetails = {
      bidDetailsId: 1,
      productId: 1,
      bidAmount: 101,
      userEmail: "bb@abc.com"
    };

    service.addBidOnProduct(mockBidDetails).subscribe((response) => {
      expect(response).toBeTruthy(); // Adjust this assertion based on your actual response
    });

    const req = httpTestingController.expectOne('http://localhost:8080/e-auction/api/v1/buyer/addBidOnProduct');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
