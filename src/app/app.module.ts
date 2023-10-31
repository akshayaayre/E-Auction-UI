import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { UserModule } from './user/user.module';
import { DxDataGridModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BasicAuthHttpInterceptorService } from './user/basic-auth-http-interceptor.service';
import { Router } from '@angular/router';

// import { ToastrModule } from 'ngx-toastr';  

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SellerModule,
    BuyerModule,
    UserModule,
    HttpClientModule,
    // ToastrModule.forRoot()
    // DxDataGridModule
  ],
  exports: [
    // DxDataGridModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
       useClass: BasicAuthHttpInterceptorService,    
       multi: true     
    } // useFactory: function(router: Router) {return new BasicAuthHttpInterceptorService(router);},
//  deps: [Router]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
