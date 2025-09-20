import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  register(form: any): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      form
    );
  }
  login(form: any): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      form
    );
  }
  LogOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  decodeToken() {
    let token;
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.LogOut();
    }
    return token;
  }
}
