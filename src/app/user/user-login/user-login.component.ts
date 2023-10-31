import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDetails } from 'src/app/model/userDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  loginForm !: FormGroup;
  userDetails!: UserDetails;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  login(){
    // let request = {userId: this.loginForm.value.userId, password: this.loginForm.value.password};
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        if(response.email !== null){
          this.userService.loggedInUser = response;
          sessionStorage.setItem("username",this.userService.loggedInUser.firstName + ' ' + this.userService.loggedInUser.lastName );
          sessionStorage.setItem("email",this.userService.loggedInUser.email );
          sessionStorage.setItem('token',"Bearer "+this.userService.loggedInUser.token);
          this.userService.authStatusListener.next(true); 
          this.router.navigate(['user/authenticated']); //navigate based on user_type
        }
        else{
          alert("Invalid Credentials");
          return;
        }
      },
      (error: any) => {
        alert("Invalid Credentials");
        // alert(error.error);
        return;
      }
    );
  }

  registerUser(){
    this.router.navigate(['user/user-registration']);
  }
}
