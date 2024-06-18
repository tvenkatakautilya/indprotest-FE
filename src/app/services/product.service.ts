import { Injectable } from '@angular/core';
import { Product } from '../models/products.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: Product | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  setProduct(product: Product): void {
    this.product = product;
  }

  getProduct(): Product | null {
    return this.product;
}

  fetchProducts(): Observable<Product[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(`${this.apiUrl}/products/`);
  }

}