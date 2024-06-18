import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { Product } from '../models/products.models';
import { environment } from '../../environments/environment';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  products: Product[] = [];
  faShoppingCart = faShoppingCart;

  constructor(private http: HttpClient, public cartService: CartService) {}

  ngOnInit() {
    this.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`)
      .pipe(
        map(response => response)
      );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }
}
