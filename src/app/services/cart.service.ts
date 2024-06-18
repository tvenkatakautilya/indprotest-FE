import { Injectable } from '@angular/core';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cart: any = [];
  private product_id: number = 0;
  cartOpen: boolean = true;

  constructor() {
    this.loadCart();
  }

  addToCart(product: Product) {
    const product_id = product.id;
    let flag = false;
    this.cart = this.getCart();
    for (const element of this.cart){
        if (product_id == element.id) {
            element.quantity += 1;
            flag = !flag;
        }
    }
    if (!flag) {
        this.cart.push({"id": product_id, "quantity": 1, "name": product.name, "price": product.price})
    }
    this.saveCart();
  }

  emptyCart() {
    this.cart = [];
  }
  
  removeFromCart(productId: number) {
    const indexToRemove: number = -1
    for (let i=0; i<this.cart.length; i++){
        if (this.cart[i]["id"] == productId){
            break;
        }
    }
    if (indexToRemove !== -1) {
        this.cart.splice(indexToRemove, 1);
    }
  }


  getCart(): Product[] {
    return this.cart;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }

  toggelCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  getCartOpenStatus(): boolean {
    return this.cartOpen;
  }

  getToatlPrice(): number {
    let totalPrice = 0.0;
    for (const item of this.cart) {
        totalPrice += parseFloat(item["price"]) * parseInt(item["quantity"]);
    }
    return totalPrice
  }
}
