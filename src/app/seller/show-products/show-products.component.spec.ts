import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsComponent } from './show-products.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { of, throwError } from 'rxjs';
import { SellerService } from '../seller-service.service';
import { Router } from '@angular/router';

describe('ShowProductsComponent', () => {
  let component: ShowProductsComponent;
  let fixture: ComponentFixture<ShowProductsComponent>;
  let httpClient: HttpClient;
  let http: HttpClientTestingModule;
  let sellerService: SellerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsComponent ],
      imports:[HttpClientTestingModule, DxDataGridModule, DxButtonModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ShowProductsComponent);
    sellerService = TestBed.inject(SellerService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should get all products on initialization', () => {
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
    spyOn(sellerService, 'getAllProducts').and.returnValue(of(mockProducts));
    spyOn(sessionStorage, 'getItem').and.returnValue('aa@abc.com'); // Mock sessionStorage

    component.ngOnInit();

    expect(sellerService.getAllProducts).toHaveBeenCalled();
    expect(component.productList).toEqual(mockProducts);
  });

  it('should handle errors when getting all products', () => {
    const errorMessage = 'Error message';
    spyOn(sellerService, 'getAllProducts').and.returnValue(throwError({ error: errorMessage }));
    spyOn(console, 'log');

    component.getAllProducts();

    expect(console.log).toHaveBeenCalledWith('Error : ', errorMessage);
  });

  it('should navigate to edit-product with selectedProduct set to null', () => {
    spyOn(router, 'navigate');
    component.addEditProduct(null);
    expect(sellerService.selectedProduct).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['seller/edit-product']);
  });

  it('should navigate to edit-product with selectedProduct set to data', () => {
    const mockProduct: Product = {
      productId: 2,
      productName: "Product2",
      productShortDescription:  "Product2",
      productDescription:  "Product2",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    spyOn(router, 'navigate');
    component.addEditProduct(mockProduct);
    expect(sellerService.selectedProduct).toBe(mockProduct);
    expect(router.navigate).toHaveBeenCalledWith(['seller/edit-product']);
  });

  it('should delete a product and refresh the list', () => {
    const mockProduct: Product = {
      productId: 2,
      productName: "Product2",
      productShortDescription:  "Product2",
      productDescription:  "Product2",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };

    spyOn(sellerService, 'deleteProduct').and.returnValue(of({}));
    spyOn(component, 'getAllProducts');

    component.deleteProduct(mockProduct);

    expect(component.getAllProducts).toHaveBeenCalled();
  });

  it('should handle errors when deleting a product', () => {
    const mockProduct: Product = {
      productId: 2,
      productName: "Product2",
      productShortDescription:  "Product2",
      productDescription:  "Product2",
      startingPrice: 100,
      bidEndDate: new Date(),
      userEmail: "aa@abc.com"
    };
    const errorMessage = 'Delete error';
    spyOn(sellerService, 'deleteProduct').and.returnValue(throwError({ error: errorMessage }));
    spyOn(window, 'alert');

    component.deleteProduct(mockProduct);

    expect(window.alert).toHaveBeenCalledWith(errorMessage);
  });

});
