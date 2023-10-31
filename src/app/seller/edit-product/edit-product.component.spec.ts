import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DxButtonModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SellerService } from '../seller-service.service';
import { of, throwError } from 'rxjs';
import { BidWithUserDetails } from 'src/app/model/bidWithUserDetails';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let httpClient: HttpClient;
  let sellerService: SellerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductComponent ],
      imports:[HttpClientTestingModule, DxButtonModule, FormsModule, ReactiveFormsModule],
      providers:[SellerService]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    sellerService = TestBed.inject(SellerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve and set BidWithUserDetails on success of getAllBidsOnProduct() call', () =>{
    //Arrange
    const successfulResponse: BidWithUserDetails[] = [
      {
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
      }
  ];
    spyOn(sellerService,'getAllBidsOnProduct').and.returnValue(of(successfulResponse));
    component.productForm.value.productId = 1;

    //Act
    component.getAllBidsOnProduct();

    //Assert
    expect(sellerService.getAllBidsOnProduct).toHaveBeenCalled();
    expect(component.bidDetails).toEqual(successfulResponse);
  });

  it('should handle error and display an alert on getAllBidsOnProduct() call', () => {
    // Arrange    
    const errorMessage = 'Some error occured on server';
    spyOn(sellerService,'getAllBidsOnProduct').and.returnValue(throwError({error: errorMessage}));
    spyOn(window,'alert');
    component.productForm.value.productId = 1;

    //Act
    component.getAllBidsOnProduct();

    //Assert
    expect(sellerService.getAllBidsOnProduct).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(errorMessage);

  });
});
