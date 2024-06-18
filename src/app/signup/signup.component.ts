// src/app/signup/signup.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;

  signup() {
    if (this.password !== this.confirmPassword) {
      // Passwords do not match, handle error or display message
      return;
    }
  
    // Call API to create new user with provided details
    const newUser = {
      username: this.username,
      password: this.password,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName
    };
  
    this.errorMessage = null;
    this.authService.signup(newUser).pipe(
      tap(() => {
        console.log("user registred.....")
        this.router.navigate(['']);
      }),
      catchError(error => {
        console.error('Signup failed', error);
        this.errorMessage = JSON.stringify(error.error);
        return of(null); // or handle error appropriately
      })
    ).subscribe();
  }
  
}
