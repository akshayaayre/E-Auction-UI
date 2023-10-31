import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { BuyerService } from '../buyer.service';
import { UserService } from 'src/app/user/user.service';
import { BidDetails } from 'src/app/model/bidDetails';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit{

  productList: Product[] | any;

  bidDetails !: BidDetails | null;
  bidAmount: number = 0;
  selectedProduct !: Product | null;

  popupVisible = false;
  // saveButtonOptions: any;
  positionOf: string = "";

  constructor(private buyerService: BuyerService, 
    private userService: UserService){

      // this.saveButtonOptions = {
      //   text: 'Save',
      //   onClick() {
      //     console.log("Save button clicked");
      //     this.saveBid();
      //   },
      // };

    }
  
  ngOnInit(): void {
    this.getAllProducts();
    this.bidDetails = null;
    this.bidAmount = 0;
    this.selectedProduct = null;
  }

  getAllProducts(){
    // const email = sessionStorage.getItem('email') as string;
    this.buyerService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.productList = data;
      },
      (error: any) => {
        console.log("Error : ", error.error);
      }
    );
  }

  bidForProduct(data: any){
    if(data && data.productId){
      this.selectedProduct = data;
      this.buyerService.getBidFromUserOnProduct(data.productId, this.userService.loggedInUser.email).subscribe(
        (response : any) => {
          if(response === null){
            this.bidDetails = null;
            this.bidAmount = data.startingPrice;
          }
          else{
            this.bidDetails = response;
            this.bidAmount = this.bidDetails?this.bidDetails.bidAmount:data.startingPrice;
          }
          //show bid details is modal
          this.popupVisible = true;
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }

  saveBid(){
    console.log("Inside saveBid method");
    if(this.selectedProduct){
      const bidInfo: BidDetails = {
        bidDetailsId: this.bidDetails?this.bidDetails.bidDetailsId:null,
        productId: this.selectedProduct.productId,
        bidAmount: this.bidAmount,
        userEmail: this.userService.loggedInUser.email
      };
      this.buyerService.addBidOnProduct(bidInfo).subscribe(
        (response: any) => {
          alert("Bid Details Saved");
          this.popupVisible = false;
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }
}
