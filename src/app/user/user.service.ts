import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../model/userDetails';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser !: UserDetails;

  authStatusListener = new Subject<boolean>();  

  getAuthStatusListener() {  
    return this.authStatusListener.asObservable();  
  }  

  baseURL = "http://localhost:8080/e-auction/api/v1/user";
  httpOptions = {
    headers: new HttpHeaders(
      {'Accept': 'text/html','Content-Type': 'application/json; charset=utf-8'}),
    responseType: 'text' as 'json'};

  constructor(private http: HttpClient) { }

  registerUser(data: UserDetails): Observable<any>{
    // console.log("Registering user");
    return this.http.post<any>(this.baseURL + "/registerUser", data, this.httpOptions);
  }

  login(data: any): Observable<UserDetails>{
    return this.http.post<UserDetails>(this.baseURL + "/login", data);
  }
}
