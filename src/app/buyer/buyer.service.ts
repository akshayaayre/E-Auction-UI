import { Injectable } from '@angular/core';
import { BidDetails } from '../model/bidDetails';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  readBaseUrl = "http://localhost:8080/e-auction/api/v1/read";
  baseURL = "http://localhost:8080/e-auction/api/v1/buyer";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.readBaseUrl + "/products");
  }

  getBidFromUserOnProduct(productId: number, email: string): Observable<BidDetails>{
    return this.http.get<BidDetails>(this.readBaseUrl + "/getBidFromUserOnProduct?productId=" + productId + 
    "&userEmail=" + email);
  }

  addBidOnProduct(bidDetails: BidDetails){
    return this.http.post(this.baseURL + "/addBidOnProduct", bidDetails);
  }
}