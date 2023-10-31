import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsComponent } from './show-products.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { BuyerService } from '../buyer.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/model/product';
import { BidDetails } from 'src/app/model/bidDetails';
import { UserService } from 'src/app/user/user.service';

describe('ShowProductsComponent', () => {
  let component: ShowProductsComponent;
  let fixture: ComponentFixture<ShowProductsComponent>;
  let httpClient: HttpClient;
  let http: HttpClientTestingModule;
  let buyerService: BuyerService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsComponent ],
      imports:[HttpClientTestingModule, DxDataGridModule, DxButtonModule, 
        FormsModule, ReactiveFormsModule, DxPopupModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ShowProductsComponent);
    component = fixture.componentInstance;
    buyerService = TestBed.inject(BuyerService);
    userService = TestBed.inject(UserService);
    userService.loggedInUser = {
      // userId: string,
      password:  null,
      firstName: "Akshaya",
      lastName: "Ayre",
      address: "Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: 123456,
      phoneNumber: 1234567890,
      email: "bb@abc.com",
      userType: "Buyer",
      token: "r6t7y87guvghuuuihjbjijhji"
  }; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [{
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
    }];
    
    spyOn(buyerService, 'getAllProducts').and.returnValue(of(mockProducts));

    component.getAllProducts();

    expect(component.productList).toEqual(mockProducts);
  });

  it('should handle errors when getting all products', () => {
    const errorMessage = 'Error message';
    spyOn(buyerService, 'getAllProducts').and.returnValue(throwError({ error: errorMessage }));
    spyOn(console, 'log');

    component.getAllProducts();

    expect(console.log).toHaveBeenCalledWith('Error : ', errorMessage);
  });

  it('should save a bid', () => {
    const mockProduct: Product =  {
          productId: 1,
          productName: "Product1",
          productShortDescription:  "Product1",
          productDescription:  "Product1",
          startingPrice: 100,
          bidEndDate: new Date(),
          userEmail: "aa@abc.com"
        };
    const mockBidDetails: BidDetails = {
          bidDetailsId: 1,
          productId: 1,
          bidAmount: 101,
          userEmail: "bb@abc.com"
      };
    spyOn(buyerService, 'addBidOnProduct').and.returnValue(of({}));

    component.selectedProduct = mockProduct;
    component.bidDetails = mockBidDetails;
    component.bidAmount = 100;

    component.saveBid();

    expect(buyerService.addBidOnProduct).toHaveBeenCalled();
    expect(component.popupVisible).toBeFalse();
  });

  it('should handle errors when saving a bid', () => {
    const errorMessage = 'Save bid error';
    spyOn(buyerService, 'addBidOnProduct').and.returnValue(throwError({ error: errorMessage }));
    spyOn(window, 'alert');

    component.selectedProduct = {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };
    component.bidDetails ={
      bidDetailsId: 1,
      productId: 1,
      bidAmount: 101,
      userEmail: "bb@abc.com"
  };
    component.bidAmount = 100;

    component.saveBid();

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

    it('should bid for a product', () => {
      const mockProduct: Product = {
        productId: 1,
        productName: "Product1",
        productShortDescription:  "Product1",
        productDescription:  "Product1",
        startingPrice: 100,
        bidEndDate: new Date(),
        userEmail: "aa@abc.com"
      };
      const mockBidDetails: BidDetails = {
        bidDetailsId: 1,
        productId: 1,
        bidAmount: 101,
        userEmail: "bb@abc.com"
    };
      userService.loggedInUser.email = "bb@abc.com";
      spyOn(buyerService, 'getBidFromUserOnProduct').and.returnValue(of(mockBidDetails));

      component.bidForProduct(mockProduct);

      expect(component.selectedProduct).toEqual(mockProduct);
      expect(component.bidDetails).toEqual(mockBidDetails);
      expect(component.bidAmount).toEqual(mockBidDetails ? mockBidDetails.bidAmount : mockProduct.startingPrice);
      expect(component.popupVisible).toBeTrue();
    });

    it('should handle errors when bidding for a product', () => {
      const mockProduct: Product = {
        productId: 2,
        productName: "Product2",
        productShortDescription:  "Product2",
        productDescription:  "Product2",
        startingPrice: 100,
        bidEndDate: new Date(),
        userEmail: "aa@abc.com"
      };
      const errorMessage = 'Bid error';
      spyOn(buyerService, 'getBidFromUserOnProduct').and.returnValue(throwError({ error: errorMessage }));
      spyOn(window, 'alert');
  
      component.bidForProduct(mockProduct);
  
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
    });

});
