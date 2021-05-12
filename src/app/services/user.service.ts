import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APIEndPoints } from '../config/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router
  ) { }

  isLogin = new EventEmitter();

  authHeader() {
    const token = JSON.parse(localStorage.getItem('token_5d'));
    let headers;
    return headers = new HttpHeaders({
      'content-type': 'application/json',
      'token': token ? token : null
    });
  }

  authHeaderFile() {
    const token = JSON.parse(localStorage.getItem('token_5d'));
    let headers;
    return headers = new HttpHeaders({
      'token': token ? token : null
    });
  }



  normalHeader() {
    let headers;
    return headers = new HttpHeaders({
      'content-type': 'application/json'
    });
  }

  loginService(data) {
    return this.http.post(APIEndPoints.LOGIN, data, { headers: this.normalHeader(), withCredentials: true })
  }

  registerService(data) {
    return this.http.post(APIEndPoints.REGISTER, data, { headers: this.normalHeader(), withCredentials: true })
  }

  setToken(data) {
    localStorage.setItem('token_5d', JSON.stringify(data.token));
  }

  logOutService() {
    return this.http.get(APIEndPoints.LOGOFF_USER, { headers: this.authHeader(), withCredentials: true }).subscribe((data: any) => {
      console.log(data);
      if (data || data.message == 401) {
        localStorage.removeItem('token_5d');
        this.router.navigate(['signin']);
      }
    }, error => {
      console.log(error);
    })
  }

  isAuthenticated() {
    const token = localStorage.getItem('token_5d');
    if (!token || this.jwtService.isTokenExpired(token)) {
      this.isLogin.emit(false);
      return false;
    } else if (token && !this.jwtService.isTokenExpired(token)) {
      this.isLogin.emit(true);
      return true;
    }
  }

  getUser() {
    return this.http.get(APIEndPoints.LOGIN_USER, { headers: this.authHeader(), withCredentials: true })
  }

  requestResponse(data) {
    if (data && !(data.message == 401)) {
      return data
    } else if (data.message == 401) {
      this.logOutService();
    } else {
      console.log("toastrService", data);
    }
  }

}
