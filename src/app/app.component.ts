import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'E-Auction';
  authListenerSubs !: Subscription;
  userIsAuthenticated = false; 
  username: string = sessionStorage.getItem('username') as string; 

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated=>{  
        this.userIsAuthenticated = isAuthenticated;

        if(this.userIsAuthenticated){
          this.username = sessionStorage.getItem('username') as string;
        }
      }
    );  
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();  
  }

  logout(){
    console.log("Inside logout");
    sessionStorage.clear();
    this.userIsAuthenticated = false;
    this.username = '';
    this.router.navigate(['user-login']);

  }
}
