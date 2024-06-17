// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.models';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ModelstoreService } from './modelstore.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private modelStore: ModelstoreService  
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

        // Navigate to home component
        this.router.navigate(['/home']);


        return user;
      })
    );
  }

  logout(): void {
    // Navigate to home component
    this.router.navigate(['/login']);
    this.modelStore.deleteModel('user')
  }
}
