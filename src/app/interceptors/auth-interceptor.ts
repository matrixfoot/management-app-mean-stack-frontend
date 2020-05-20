import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.token;
    
    const newRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
        'x-access-token': `${authToken}`,
    }
      
      
    });
    return next.handle(newRequest);
  }
}