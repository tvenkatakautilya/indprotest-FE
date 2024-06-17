// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.models';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModelstoreService } from '../services/modelstore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modelStore: ModelstoreService
  ) {}

  login() {
    this.errorMessage = null;
    this.authService.login(this.username, this.password).pipe(
      tap((user: User) => {
        this.modelStore.saveModel("user", user);
        console.log('User logged in:', user);
        console.log('Stored user:', this.userService.getUser());
      }),
      catchError(error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
        return of(null); // or handle error appropriately
      })
    ).subscribe();
  }
}
