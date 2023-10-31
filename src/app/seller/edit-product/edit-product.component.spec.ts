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
import { Router } from '@angular/router';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let httpClient: HttpClient;
  let sellerService: SellerService;
  let router: Router;

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
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the productForm', () => {
    expect(component.productForm).toBeDefined();
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

  
  it('should handle form invalid case', () => {
    spyOn(window, 'alert');
    component.productForm.setErrors({ 'invalid': true });
    component.saveProduct();
    expect(window.alert).toHaveBeenCalledWith('Please fix the fields marked in red and then press the Save button');
  });

  it('should handle existing record update with unchanged data', () => {
    spyOn(window, 'alert');
    // spyOn(component.productForm, 'get').and.returnValue({
    //   dirty: false
    // });
    component.productForm.markAsPristine();
    component.productForm.get('productId')?.setValue(1);
    component.productForm.get('productName')?.setValue("Product1");
    component.productForm.get('productShortDescription')?.setValue("Product1");
    component.productForm.get('productDescription')?.setValue("Product1");
    component.productForm.get('startingPrice')?.setValue(100);
    component.productForm.get('bidEndDate')?.setValue(new Date());
    component.productForm.get('userEmail')?.setValue("aa@abc.com")
    component.saveProduct();
    expect(window.alert).toHaveBeenCalledWith('No data has been changed');
  });


  it('should update an existing record', () => {
    const product = {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };
    component.productForm.markAsDirty();
    component.productForm.get('productId')?.setValue(1);
    component.productForm.get('productName')?.setValue("Product1");
    component.productForm.get('productShortDescription')?.setValue("Product1");
    component.productForm.get('productDescription')?.setValue("Product1");
    component.productForm.get('startingPrice')?.setValue(100);
    component.productForm.get('bidEndDate')?.setValue(new Date());
    component.productForm.get('userEmail')?.setValue("aa@abc.com")

    spyOn(router, 'navigate');
    spyOn(sellerService, 'updateProduct').and.returnValue(of(product));
    spyOn(window, 'alert');

    component.saveProduct();
    
    expect(sellerService.updateProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['seller/show-products']);
    expect(window.alert).toHaveBeenCalledWith('Product was updated');
  });

  it('should handle new record addition', () => {
    const product = {
      productId: 1,
      productName: "Product1",
      productShortDescription:  "Product1",
      productDescription:  "Product1",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    component.productForm.markAsDirty();
    component.productForm.get('productId')?.setValue(null);
    component.productForm.get('productName')?.setValue("Product1");
    component.productForm.get('productShortDescription')?.setValue("Product1");
    component.productForm.get('productDescription')?.setValue("Product1");
    component.productForm.get('startingPrice')?.setValue(100);
    component.productForm.get('bidEndDate')?.setValue(new Date());
    component.productForm.get('userEmail')?.setValue("aa@abc.com")

    spyOn(router, 'navigate');
    spyOn(sellerService, 'addProduct').and.returnValue(of(product));
    spyOn(sessionStorage, 'getItem').and.returnValue('aa@abc.com'); // Mock sessionStorage

    component.saveProduct();

    expect(sellerService.addProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['seller/show-products']);
  });

  it('should handle errors during updateProduct', () => {
    component.productForm.markAsDirty();
    component.productForm.get('productId')?.setValue(1);
    component.productForm.get('productName')?.setValue("Product1");
    component.productForm.get('productShortDescription')?.setValue("Product1");
    component.productForm.get('productDescription')?.setValue("Product1");
    component.productForm.get('startingPrice')?.setValue(100);
    component.productForm.get('bidEndDate')?.setValue(new Date());
    component.productForm.get('userEmail')?.setValue("aa@abc.com")
    spyOn(sellerService, 'updateProduct').and.returnValue(throwError({ error: 'Update error' }));
    spyOn(window, 'alert');

    component.saveProduct();

    expect(window.alert).toHaveBeenCalledWith('Update error');
  });

  it('should handle errors during addProduct', () => {
    component.productForm.markAsDirty();
    component.productForm.get('productId')?.setValue(null);
    component.productForm.get('productName')?.setValue("Product1");
    component.productForm.get('productShortDescription')?.setValue("Product1");
    component.productForm.get('productDescription')?.setValue("Product1");
    component.productForm.get('startingPrice')?.setValue(100);
    component.productForm.get('bidEndDate')?.setValue(new Date());
    component.productForm.get('userEmail')?.setValue("aa@abc.com")

    spyOn(sellerService, 'addProduct').and.returnValue(throwError({ error: 'Add error' }));
    spyOn(window, 'alert');

    component.saveProduct();

    expect(window.alert).toHaveBeenCalledWith('Add error');
  });

});
