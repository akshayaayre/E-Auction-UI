import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerModule } from './seller/seller.module';
import { SellerRoutingModule } from './seller/seller-routing.module';

const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path:'user', loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:'seller', loadChildren:()=>import('./seller/seller.module').then(m=>m.SellerModule)},
  {path:'buyer', loadChildren:()=>import('./buyer/buyer.module').then(m=>m.BuyerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
