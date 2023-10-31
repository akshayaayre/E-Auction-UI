import { TestBed } from '@angular/core/testing';

import { SellerService } from './seller-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BidWithUserDetails } from '../model/bidWithUserDetails';
import { Product } from '../model/product';

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

  it('should get all products for a user', () => {
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
    const email = 'aa@abc.com';

    service.getAllProducts(email).subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(service.readBaseUrl + "/get-all-products-for-user?email=" + email);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a product', () => {
    const mockProduct: Product = {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    service.addProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(service.baseURL + "/addProduct");
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const mockProduct: Product =  {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    service.updateProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(service.baseURL + "/updateProduct");
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    const mockProduct: Product = {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    service.deleteProduct(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(service.baseURL + "/delete/" + mockProduct);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProduct);
  });

});
