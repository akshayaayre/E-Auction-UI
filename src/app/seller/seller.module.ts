import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductsComponent } from './show-products/show-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DxDataGridModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular';
import { SellerRoutingModule } from './seller-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHttpInterceptorService } from '../user/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    ShowProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    SellerRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ShowProductsComponent,
    EditProductComponent
  ]
})
export class SellerModule { }
