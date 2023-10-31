import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller-service.service';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit{

  productList: Product[] | any;

  constructor(private sellerService: SellerService, private router: Router){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    const email = sessionStorage.getItem('email') as string;
    this.sellerService.getAllProducts(email).subscribe(
      (data: Product[]) => {
        this.productList = data;
      },
      (error: any) => {
        console.log("Error : ", error.error);
      }
    );
  }

  addEditProduct(data: any){
    console.log("Inside addEditProduct. data=",data);
    if(data === null){
      this.sellerService.selectedProduct = null;
    }
    else{
      this.sellerService.selectedProduct = data;
    }
    this.router.navigate(['seller/edit-product']);
  }

  deleteProduct(data: any){
    if(data && data.productId){
      this.sellerService.deleteProduct(data.productId).subscribe(
        (response : any) => {
          this.getAllProducts();
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }
}
