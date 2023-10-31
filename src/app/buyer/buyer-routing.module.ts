import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './show-products/show-products.component';

const routes: Routes = [
  {path: '', redirectTo: 'show-products', pathMatch: 'full'},
  {path:'show-products', component: ShowProductsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
