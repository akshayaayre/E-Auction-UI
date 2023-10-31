import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UrlTree {
    const user = this.userService.loggedInUser;
    return (
      (user?.userType === 'Seller' && this.router.parseUrl('/seller')) ||
      (user?.userType === 'Buyer' && this.router.parseUrl('/buyer')) ||
      this.router.parseUrl('/user')
    );
  }
  
}
