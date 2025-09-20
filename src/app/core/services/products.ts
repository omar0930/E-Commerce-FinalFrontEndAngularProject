import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly httpClinet = inject(HttpClient);

  getProducts(pageNumber: number = 1): Observable<any> {
    return this.httpClinet.get(
      environment.baseUrl + `products?page=${pageNumber}`
    );
  }

  // Get products with brand filter
  getProductsByBrand(brandId: string): Observable<any> {
    return this.httpClinet.get(
      environment.baseUrl + `products?brand=${brandId}`
    );
  }

  // Get products with category filter
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.httpClinet.get(
      environment.baseUrl + `products?category=${categoryId}`
    );
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClinet.get(`${environment.baseUrl}products/${id}`);
  }
}
