import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../seller-service.service';
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';
import { BidWithUserDetails } from 'src/app/model/bidWithUserDetails';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productForm !: FormGroup;
  bidDetails!: BidWithUserDetails[];

  constructor(private sellerService: SellerService, private router: Router){}

  ngOnInit(): void {
    this.setProductForm();

    if(this.productForm.value.productId){
      //find bids placed on existing products
      this.getAllBidsOnProduct();
    }
  }

  setProductForm(){
    this.productForm = new FormGroup({
      productId: new FormControl(this.sellerService.selectedProduct?.productId),
      productName: new FormControl(this.sellerService.selectedProduct?.productName, 
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      productShortDescription: new FormControl(this.sellerService.selectedProduct?.productShortDescription),
      productDescription: new FormControl(this.sellerService.selectedProduct?.productDescription),
      productCategory: new FormControl(this.sellerService.selectedProduct?.productCategory),
      startingPrice: new FormControl(this.sellerService.selectedProduct?.startingPrice),
      bidEndDate: new FormControl(this.sellerService.selectedProduct?.bidEndDate),
      userEmail: new FormControl(this.sellerService.selectedProduct?.userEmail)
    });
  }

  getAllBidsOnProduct(){
    this.sellerService.getAllBidsOnProduct(this.productForm.value.productId).subscribe(
      (result: BidWithUserDetails[]) => {
        this.bidDetails = result;
        console.log("bidDetails: ", this.bidDetails);
      },
      (error:any) => { alert(error.error); }
    );
  }

  saveProduct(){
    // console.log("Form status: ", this.productForm.status);
    // console.log("Form: ", this.productForm);
    if(this.productForm.invalid){
      alert("Please fix the fields marked in red and then press the Save button");
    }
    else{
      if(this.productForm.value.productId){
        // Existing record
        if(!this.productForm.dirty){
          alert("No data has been changed");
          return;
        }
        else{
          this.sellerService.updateProduct(this.productForm.value).subscribe(
            (data: Product) => {
              this.sellerService.selectedProduct = data;
              this.setProductForm;
              alert("Product was updated");
              this.router.navigate(['seller/show-products']);
            },
            (error:any) => { alert(error.error); }
          );
        }
      }
      else{
        // New record
        this.productForm.value.userEmail = sessionStorage.getItem('email') as string;;
        this.sellerService.addProduct(this.productForm.value).subscribe(
          (data: Product) => {
            this.sellerService.selectedProduct = data;
            this.setProductForm;
            alert("Product was added");
            this.router.navigate(['seller/show-products']);
          },
          (error:any) => { alert(error.error); }
        );
      }
    }
  }

  resetProductForm(){
    this.setProductForm();
  }

  back(){
    this.router.navigate(['seller/show-products']);
  }
}
