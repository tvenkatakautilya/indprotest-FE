import { Component } from '@angular/core';
import { faHouse, faShoppingCart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent {
   
  constructor(public cartService: CartService, public authService: AuthService) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: any[] = this.cartService.getCart();
  faShoppingCart = faShoppingCart;
  faRightFromBracket = faRightFromBracket;
  faHouse = faHouse;
  toggleCartDropdown(): void {
    // Toggle visibility of cart dropdown
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  closeCartDropdown(): void {
    // Close cart dropdown
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  }

  // Add more methods as needed for cart functionality
}
