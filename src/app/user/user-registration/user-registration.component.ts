import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/model/userDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit{

  registrationForm !: FormGroup;
  userDetails!: UserDetails;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.setRegistrationForm();
  }

  register(){
    if(this.registrationForm.valid){
      this.userService.registerUser(this.registrationForm.value).subscribe(
        (response: any) => {
          // this.userDetails = response;
          alert(response);
          this.router.navigate(['user-login']);
        },
        (error: any) => {
          alert(error.error);
        }
      );
  }
  }
  
  resetForm(){
    this.setRegistrationForm();
  }

  setRegistrationForm(){
    this.registrationForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      lastName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      userType: new FormControl('',[Validators.required]),
      address: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pincode: new FormControl(),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
  }
}

