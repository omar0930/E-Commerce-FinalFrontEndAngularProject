import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDetails {
  private readonly httpClient = inject(HttpClient);

  getProductDetails(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products/${id}`);
  }
}
