import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/products.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  isCollapsed: boolean = true;
  totalPrice: number = 0;
  private apiUrl = environment.apiUrl;
  private ngUnsubscribe = new Subject();
  message = '';
  errorMessage = '';
  

  constructor(public cartService: CartService, private http: HttpClient,) {}

  ngOnInit(): void {
    this.updateCart();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  placeOrder(): void {
    const requestdata = this.cartItems.map(({ id, quantity }) => ({ product: id, quantity }));
     
    console.log(requestdata)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.post<any>(`${this.apiUrl}/orders/`, {"items": requestdata}).pipe(
      takeUntil(this.ngUnsubscribe),
      map(response => {
        console.log(response);
        this.message = "Order created succesfully"
      })
    ).subscribe({
      error: error => {
        this.errorMessage = "Unable to place order, please retry after some time"
        console.error('Error placing order:', error);
      }
    });
  }
}
