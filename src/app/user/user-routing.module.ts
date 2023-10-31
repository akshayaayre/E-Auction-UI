import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthorizationGuard } from './authorization.guard';

const routes: Routes = [
  {path: '', redirectTo: 'user-login', pathMatch: 'full'},
  {path:'user-login', component: UserLoginComponent },
  {path:'user/user-registration', component: UserRegistrationComponent},
  {path: 'user/authenticated', canActivate: [AuthorizationGuard], children: [],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
