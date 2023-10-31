import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BidWithUserDetails } from '../model/bidWithUserDetails';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  selectedProduct !: Product| any;
  baseURL = "http://localhost:8080/e-auction/api/v1/seller";
  readBaseUrl = "http://localhost:8080/e-auction/api/v1/read";

  constructor(private http: HttpClient) { 
  }

  getAllProducts(email: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.readBaseUrl + "/get-all-products-for-user?email=" + email); //,this.requestOptions
  }

  addProduct(data: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURL + "/addProduct", data);
  }

  updateProduct(data: Product): Observable<Product>{
    return this.http.put<Product>(this.baseURL + "/updateProduct", data);
  }

  deleteProduct(data: Product): Observable<Product>{
    return this.http.delete<Product>(this.baseURL + "/delete/" + data);
  }

  getAllBidsOnProduct(productId: number): Observable<BidWithUserDetails[]>{
    return this.http.get<BidWithUserDetails[]>(this.readBaseUrl + "/getAllBidsOnProduct?productId=" + productId);
  }
}
