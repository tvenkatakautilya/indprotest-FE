// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.models';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ModelstoreService } from './modelstore.service';
import { CartService } from './cart.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = false;
  private username = '';
  private authToken = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private modelStore: ModelstoreService,
    private cartService: CartService 
  ) {}


  isAuthenticated(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user_model: any = this.modelStore.getModel("user")
    return !!user_model.token;
  }

  login(username: string, password: string): Observable<User> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }).pipe(
      map(response => {
        const user = new User(
          response.user.username,
          response.user.first_name,
          response.user.last_name,
          response.user.email,
          response.access,
          response.refresh
        );
        this.modelStore.saveModel('user', user);

        // Store user data
        this.userService.setUser(user);
        this.loggedIn = true;
        this.username = user.username

        // Navigate to home component
        this.router.navigate(['/home']);

        return user;
      })
    );
  }

  getUsername(): string {
    return this.username;
  }

  isLoggedIn(): true | false {
    return this.loggedIn;
  }

  logout(): void {
    // Navigate to home component
    this.cartService.emptyCart();
    this.router.navigate(['']);
    this.modelStore.deleteModel('user')
    this.loggedIn = false;
  }

  refreshToken() {
    const user = this.modelStore.getModel('user');
    return this.http.post<{ access: string }>(`${this.apiUrl}/refresh/`, { refresh: user.refresh_token })
      .pipe(
        tap(response => {
          this.authToken.next(response.access);
          const updatedUser = { ...user, access: response.access };
          this.modelStore.saveModel('user', updatedUser);
          this.authToken.next(response.access);
        })
      );
  }

  getAccessToken() {
    const user = this.modelStore.getModel('user');
    return user ? user.access : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }  

}
