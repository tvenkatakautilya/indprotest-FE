import { Component } from '@angular/core';
import { faHouse, faShoppingCart, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { HomeComponent } from '../home/home.component';
import { Product } from "../models/products.models"

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent {
   
  constructor(public cartService: CartService, public authService: AuthService, public homeComponent: HomeComponent) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: any[] = this.cartService.getCart();
  faShoppingCart = faShoppingCart;
  faRightFromBracket = faRightFromBracket;
  faHouse = faHouse;
  faSearch = faSearch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchResults: any[] = [];
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

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();
    if (searchTerm !== "") {
      console.log('Search term:', searchTerm);
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      
      this.searchResults = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
      );

      console.log(this.homeComponent.products);
      this.homeComponent.products = this.searchResults;
    }
  }
}
