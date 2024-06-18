import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/products.models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  isCollapsed: boolean = true;
  totalPrice: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
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
}
