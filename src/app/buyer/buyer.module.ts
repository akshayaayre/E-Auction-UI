import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductsComponent } from './show-products/show-products.component';
import { BuyerRoutingModule } from './buyer-routing.module';
import { DxDataGridModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShowProductsComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    ReactiveFormsModule,
    DxPopupModule,
    FormsModule
  ]
})
export class BuyerModule { }
