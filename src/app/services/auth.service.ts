import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  userrole:string;
  
  

  constructor(private router: Router,
              private http: HttpClient) {}

  createNewUser(email: string, password: string, firstname:string, lastname:string,direction:string, fonction:string, role:string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signup',
        { email: email, password: password, firstname:firstname, lastname:lastname,direction:direction, fonction:fonction, role:role })
        .subscribe(
          () => {
            this.login(email, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData: {  role:string,accessToken: string, userId: string }) => {
            this.token = authData.accessToken;
            this.userId = authData.userId;
            this.userrole=authData.role;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
