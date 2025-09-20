import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Brands {
  private readonly httpClient = inject(HttpClient);

  getBrands(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'brands');
  }

  getSpecificBrand(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}brands/${id}`);
  }
}
