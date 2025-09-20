import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  myHeaders: object = {
    headers: { token: this.cookieService.get('token') },
  };

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',
      { productId: id },
      this.myHeaders
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myHeaders);
  }
  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + 'cart/' + id,
      this.myHeaders
    );
  }
  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'cart/' + id,
      { count: count },
      this.myHeaders
    );
  }

  checkOutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      this.myHeaders
    );
  }

  createCashOrder(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/${id}`,
      data,
      this.myHeaders
    );
  }
}
